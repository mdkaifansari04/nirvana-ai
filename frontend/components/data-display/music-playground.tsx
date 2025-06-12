import InfiniteMenu from '../ui/infinite-music';
const music = [
   {
      title: 'Contemplate the Stars',
      description: 'A calm, instrumental piece perfect for starry reflections.',
      src: "/music/09-Meydan-Contemplate-the-stars(chosic.com).mp3",
      image: 'https://picsum.photos/800/600?grayscale&random=1'
   },
   {
      title: 'Deep Meditation',
      description: 'Ideal for deep meditation sessions and inner peace.',
      src: "/music/2019-04-06_-_Deep_Meditation_-_David_Fesliyan.mp3",
      image: 'https://picsum.photos/400/400?grayscale&random=2'
   },
   {
      title: 'Painful Memories',
      description: 'Emotive background music for somber or reflective moods.',
      src: "/music/2020-08-17_-_Painful_Memories_-_www.FesliyanStudios.com_Steve_Oxenham.mp3",
      image: 'https://picsum.photos/400/500?grayscale&random=3'
   },
   {
      title: 'Beauty of Russia',
      description: 'An instrumental tribute evoking the cultural soul of Russia.',
      src: "/music/2021-05-26_-_Beauty_Of_Russia_-_www.FesliyanStudios.com.mp3",
      image: 'https://picsum.photos/200/200?grayscale&random=4'
   },
   {
      title: 'Forest Nature',
      description: 'Nature sounds from a peaceful forest, perfect for relaxation.',
      src: "/music/forest-nature-322637.mp3",
      image: 'https://picsum.photos/800/600?grayscale&random=5'
   },
   {
      title: 'Ocean Waves and Birdsong',
      description: 'Gentle ocean waves blended with calming bird calls.',
      src: "/music/jackmichaelking__gentle-ocean-waves-birdsong-and-gull(chosic.com).mp3",
      image: 'https://picsum.photos/300/300?grayscale&random=6'
   },
   {
      title: 'Stream in the Forest',
      description: 'Flowing stream through a dense forest, peaceful ambience.',
      src: "/music/kvgarlic__largestreamoverloginforestmarch(chosic.com).mp3",
      image: 'https://picsum.photos/200/200?grayscale&random=7'
   },
   {
      title: 'Nature Sounds',
      description: 'Organic ambience perfect for mindfulness and calm.',
      src: "/music/nature-216798.mp3",
      image: 'https://picsum.photos/800/200?grayscale&random=8'
   },
   {
      title: 'Nature Ambience',
      description: 'Ambient nature sounds ideal for focus and background play.',
      src: "/music/nature-ambience-323729.mp3",
      image: 'https://picsum.photos/600/200?grayscale&random=9'
   }

]


const items = [
   {
      image: 'https://picsum.photos/300/300?grayscale',
      link: 'https://google.com/',
      title: 'Item 1',
      description: 'This is pretty cool, right?',
   },
   {
      image: 'https://picsum.photos/400/400?grayscale',
      link: 'https://google.com/',
      title: 'Item 2',
      description: 'This is pretty cool, right?',
   },
   {
      image: 'https://picsum.photos/500/500?grayscale',
      link: 'https://google.com/',
      title: 'Item 3',
      description: 'This is pretty cool, right?',
   },
   {
      image: 'https://picsum.photos/600/600?grayscale',
      link: 'https://google.com/',
      title: 'Item 4',
      description: 'This is pretty cool, right?',
   },
];

export default function MusicPlayground() {
   return (
      <div className="w-full h-screen bg-slate-50">
         <InfiniteMenu items={music} />
      </div>
   );
}
