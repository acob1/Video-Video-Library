export interface VideosClass {
  id: number;
  title: string;
  description: string;
  type: string;
  url: string;
  thumbnail: string;
  meta?: string;
  distributed?: string;
  distribution?: string; 
  qrcode?: string;
}

export const VIDEO_CONTENT: VideosClass[] = [
  {
    id: 1,
    title: 'Nature Escape',
    description: 'Immerse yourself in the breathtaking beauty of nature as you journey through lush green forests, cascading waterfalls, and tranquil rivers. Nature Escape is a soothing visual experience designed to calm your mind, ease your stress, and reconnect you with the Earth’s serenity. ',
    type: 'Relaxation',
    url: 'https://cdn.pixabay.com/video/2020/11/07/55248-499593984_tiny.mp4',
    thumbnail: 'assets/images/nature.jpg',
    meta: '2023 | 2h 10m | Nature | Relaxation',
    distributed: 'Nature Films Inc.'
  },
  {
    id: 2,
    title: 'Cooking Masterclass',
    description: 'Learn to cook healthy meals.',
    type: 'Education',
    url: 'https://cdn.pixabay.com/video/2024/03/13/204007-923158633_tiny.mp4',
    thumbnail: 'assets/images/cooking.jpg',
    meta: '2022 | 1h 30m | Cooking | Education',
    distributed: 'Food Network'
  },
  {
    id: 3,
    title: 'Travel Diaries',
    description: 'Explore beautiful destinations around the world.',
    type: 'Travel',
    url: 'https://cdn.pixabay.com/video/2016/07/27/4050-176748994_tiny.mp4',
    thumbnail: 'assets/images/travel.jpg',
    meta: '2021 | 1h 50m | Travel | Adventure',
    distributed: 'Global Travels'
  },
  {
    id: 4,
    title: 'Tech Innovations',
    description: 'Latest trends in technology.',
    type: 'Technology',
    url: 'https://cdn.pixabay.com/video/2020/01/19/31402-386853491_tiny.mp4',
    thumbnail: 'assets/images/tech.jpg',
    meta: '2024 | 1h 20m | Technology | Documentary',
    distributed: 'Tech Media'
  }
];
