import React from 'react';
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card';

export default function MindfulBreathing() {
    const items = [
        {
            title: "🌿 Breathe in... feel the cool air.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-10 left-[20%] rotate-[-5deg]",
        },
        {
            title: "💧 Hold... soften your jaw.",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-40 left-[25%] rotate-[-7deg]",
        },
        {
            title: "🌬 Exhale slowly... release the tension.",
            image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-5 left-[40%] rotate-[8deg]",
        },
        {
            title: "🌅 Inhale... open your chest gently.",
            image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-32 left-[55%] rotate-[10deg]",
        },
        {
            title: "🌸 Hold... unclench your hands.",
            image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-20 right-[35%] rotate-[2deg]",
        },
        {
            title: "🍃 Exhale fully... let go of the day.",
            image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-24 left-[45%] rotate-[-7deg]",
        },
        {
            title: "🫧 Breathe naturally... you are here now.",
            image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=2600&q=80",
            className: "absolute top-8 left-[30%] rotate-[4deg]",
        },
    ];

    return (
        <DraggableCardContainer className="flex relative justify-center items-center w-full h-[calc(100vh-4rem)] overflow-clip">
            <p className="absolute top-1/2 mx-auto max-w-sm text-2xl font-black text-center -translate-y-3/4 text-neutral-400 md:text-4xl dark:text-neutral-800">
                You did it. One breath at a time. You're calmer now.
            </p>
            {items.map((item) => (
                <DraggableCardBody className={item.className}>
                    <img src={item.image} alt={item.title} className="object-cover relative z-10 w-80 h-80 pointer-events-none" />
                    <h3 className="mt-4 text-2xl font-bold text-center text-neutral-700 dark:text-neutral-300">{item.title}</h3>
                </DraggableCardBody>
            ))}
        </DraggableCardContainer>
    );
}
