'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PROJECT_PPT_SLIDES, type ProjectPptSlide, type SlideStatus } from '@/lib/project-ppt-slides';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid2x2, Keyboard, Printer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

const SWIPE_THRESHOLD = 60;

const statusBadgeStyles: Record<SlideStatus, string> = {
   implemented: 'bg-emerald-100 text-emerald-800 border-emerald-200',
   planned: 'bg-amber-100 text-amber-800 border-amber-200',
};

const graphicToneStyles: Record<'calm' | 'focus' | 'growth', string> = {
   calm: 'border-sky-200 bg-sky-50/80',
   focus: 'border-amber-200 bg-amber-50/80',
   growth: 'border-emerald-200 bg-emerald-50/80',
};

const slideVariants = {
   enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 70 : -70,
   }),
   center: {
      opacity: 1,
      x: 0,
   },
   exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -70 : 70,
   }),
};

function SlidePanel({
   slide,
   pageLabel,
}: {
   slide: ProjectPptSlide;
   pageLabel: string;
}) {
   const hasGraphic = Boolean(slide.graphic);
   const imageFitClass = slide.graphic?.imageSrc.endsWith('.svg') ? 'object-contain p-6' : 'object-cover';
   const graphicToneClass = slide.graphic?.tone ? graphicToneStyles[slide.graphic.tone] : graphicToneStyles.calm;

   return (
      <Card className="project-slide border border-border/60 shadow-md bg-card">
         <CardHeader className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
               <div>
                  <Badge variant="outline">{slide.kicker}</Badge>
                  <CardTitle className="mt-3 text-2xl md:text-3xl">{slide.title}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed text-muted-foreground">{slide.summary}</CardDescription>
               </div>
               <Badge variant="secondary" className="w-fit">
                  {pageLabel}
               </Badge>
            </div>

            {slide.tags?.length ? (
               <div className="flex flex-wrap gap-2">
                  {slide.tags.map((tag) => (
                     <Badge key={`${slide.id}-${tag.label}`} variant="outline" className={tag.status ? statusBadgeStyles[tag.status] : ''}>
                        {tag.label}
                     </Badge>
                  ))}
               </div>
            ) : null}
         </CardHeader>

         <CardContent>
            <div className={cn('space-y-5', hasGraphic && 'lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-5 lg:space-y-0')}>
               <div className="space-y-5">
                  {slide.sections?.map((section) => (
                     <section
                        key={`${slide.id}-${section.title}`}
                        className={cn(
                           'rounded-xl border p-4',
                           section.tone === 'problem' && 'border-rose-200 bg-rose-50/80',
                           section.tone === 'solution' && 'border-emerald-200 bg-emerald-50/80',
                           (!section.tone || section.tone === 'default') && 'border-border bg-muted/20'
                        )}
                     >
                        <h3 className="font-semibold text-foreground">{section.title}</h3>
                        <ul className="mt-3 space-y-2">
                           {section.points.map((point) => (
                              <li key={`${section.title}-${point}`} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                                 <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                 <span>{point}</span>
                              </li>
                           ))}
                        </ul>
                     </section>
                  ))}

                  {slide.cards?.length ? (
                     <div className="grid gap-4 sm:grid-cols-2">
                        {slide.cards.map((card) => (
                           <div key={`${slide.id}-${card.title}`} className="rounded-xl border border-border/70 bg-background p-4">
                              <div className="mb-2 flex items-center justify-between gap-3">
                                 <h3 className="font-semibold text-sm sm:text-base">{card.title}</h3>
                                 <Badge variant="outline" className={statusBadgeStyles[card.status]}>
                                    {card.status === 'implemented' ? 'Implemented' : 'Planned'}
                                 </Badge>
                              </div>
                              <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                           </div>
                        ))}
                     </div>
                  ) : null}

                  {slide.footer ? <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/90">{slide.footer}</div> : null}
               </div>

               {slide.graphic ? (
                  <aside className={cn('overflow-hidden rounded-2xl border shadow-sm', graphicToneClass)}>
                     <div className="relative h-52 sm:h-64">
                        <Image src={slide.graphic.imageSrc} alt={slide.graphic.imageAlt} fill className={cn('z-10', imageFitClass)} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                     </div>
                     <div className="space-y-3 p-4">
                        {slide.graphic.eyebrow ? (
                           <Badge variant="outline" className="bg-white/70 border-white/80">
                              {slide.graphic.eyebrow}
                           </Badge>
                        ) : null}
                        <h3 className="text-base font-semibold">{slide.graphic.title}</h3>
                        <p className="text-sm leading-relaxed text-foreground/85">{slide.graphic.description}</p>
                        {slide.graphic.badges?.length ? (
                           <div className="flex flex-wrap gap-2">
                              {slide.graphic.badges.map((badge) => (
                                 <Badge key={`${slide.id}-${badge}`} variant="secondary" className="bg-white/70">
                                    {badge}
                                 </Badge>
                              ))}
                           </div>
                        ) : null}
                     </div>
                  </aside>
               ) : null}
            </div>
         </CardContent>
      </Card>
   );
}

export default function ProjectPresentation() {
   const totalSlides = PROJECT_PPT_SLIDES.length;
   const [currentIndex, setCurrentIndex] = useState(0);
   const [direction, setDirection] = useState(1);
   const [showAllSlides, setShowAllSlides] = useState(false);
   const [isPrintMode, setIsPrintMode] = useState(false);
   const [touchStartX, setTouchStartX] = useState<number | null>(null);

   const currentSlide = PROJECT_PPT_SLIDES[currentIndex];

   const goNext = useCallback(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
   }, [totalSlides]);

   const goPrevious = useCallback(() => {
      setDirection(-1);
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
   }, []);

   const jumpToSlide = useCallback(
      (index: number) => {
         if (index === currentIndex) return;
         setDirection(index > currentIndex ? 1 : -1);
         setCurrentIndex(index);
      },
      [currentIndex]
   );

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (showAllSlides) return;
         if (event.key === 'ArrowRight') {
            event.preventDefault();
            goNext();
         }
         if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goPrevious();
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [goNext, goPrevious, showAllSlides]);

   useEffect(() => {
      const onBeforePrint = () => setIsPrintMode(true);
      const onAfterPrint = () => setIsPrintMode(false);

      window.addEventListener('beforeprint', onBeforePrint);
      window.addEventListener('afterprint', onAfterPrint);
      return () => {
         window.removeEventListener('beforeprint', onBeforePrint);
         window.removeEventListener('afterprint', onAfterPrint);
      };
   }, []);

   const pageLabel = useMemo(() => `Slide ${currentIndex + 1} / ${totalSlides}`, [currentIndex, totalSlides]);
   const shouldRenderAllSlides = showAllSlides || isPrintMode;

   return (
      <>
         <style jsx global>{`
            @media print {
               .project-ppt-shell {
                  background: #ffffff !important;
               }
               .project-ppt-toolbar,
               .project-ppt-nav,
               .project-ppt-dots {
                  display: none !important;
               }
               .project-ppt-slide-grid {
                  display: block !important;
               }
               .project-slide {
                  break-after: page;
                  box-shadow: none !important;
                  border-radius: 0 !important;
                  border: 1px solid #e5e7eb !important;
                  margin: 0 !important;
                  min-height: 100vh;
               }
            }
         `}</style>

         <div className="project-ppt-shell min-h-screen bg-[#F7F4F2]">
            <div className="container py-6 px-4 2xl:mx-auto">
               <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                     <h1 className="text-2xl font-bold md:text-3xl">Nirvana AI Project Presentation</h1>
                     <p className="mt-1 text-sm text-muted-foreground">Single-page slide mode for college presentation with keyboard, swipe, and print support.</p>
                  </div>

                  <div className="project-ppt-toolbar flex flex-wrap items-center gap-2">
                     <Button variant="outline" asChild>
                        <Link href="/">Back to Home</Link>
                     </Button>
                     <Button variant="outline" onClick={() => setShowAllSlides((prev) => !prev)}>
                        <Grid2x2 className="h-4 w-4" />
                        {showAllSlides ? 'Single Slide View' : 'All Slides View'}
                     </Button>
                     <Button onClick={() => window.print()}>
                        <Printer className="h-4 w-4" />
                        Print / Save PDF
                     </Button>
                  </div>
               </header>

               {!shouldRenderAllSlides && (
                  <>
                     <div className="project-ppt-nav mb-4 flex items-center justify-between rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
                        <Button variant="outline" size="icon" onClick={goPrevious} disabled={currentIndex === 0}>
                           <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                           <Keyboard className="h-4 w-4 text-muted-foreground" />
                           <span>{pageLabel}</span>
                        </div>
                        <Button variant="outline" size="icon" onClick={goNext} disabled={currentIndex === totalSlides - 1}>
                           <ChevronRight className="h-4 w-4" />
                        </Button>
                     </div>

                     <div className="project-ppt-dots mb-4 flex flex-wrap justify-center gap-2">
                        {PROJECT_PPT_SLIDES.map((slide, index) => (
                           <button
                              key={slide.id}
                              type="button"
                              onClick={() => jumpToSlide(index)}
                              className={cn(
                                 'h-2.5 w-2.5 rounded-full border transition-all',
                                 index === currentIndex ? 'w-7 border-primary bg-primary' : 'border-border bg-muted hover:bg-muted-foreground/40'
                              )}
                              aria-label={`Go to slide ${index + 1}`}
                           />
                        ))}
                     </div>

                     <div
                        className="touch-pan-y"
                        onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
                        onTouchEnd={(event) => {
                           const endX = event.changedTouches[0]?.clientX;
                           if (touchStartX === null || typeof endX !== 'number') return;
                           const delta = endX - touchStartX;
                           if (delta > SWIPE_THRESHOLD) goPrevious();
                           if (delta < -SWIPE_THRESHOLD) goNext();
                           setTouchStartX(null);
                        }}
                     >
                        <AnimatePresence mode="wait" custom={direction}>
                           <motion.div key={currentSlide.id} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: 'easeOut' }}>
                              <SlidePanel slide={currentSlide} pageLabel={pageLabel} />
                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </>
               )}

               {shouldRenderAllSlides && (
                  <div className="project-ppt-slide-grid grid gap-6">
                     {PROJECT_PPT_SLIDES.map((slide, index) => (
                        <SlidePanel key={slide.id} slide={slide} pageLabel={`Slide ${index + 1} / ${totalSlides}`} />
                     ))}
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
