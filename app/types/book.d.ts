interface Book extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: BookStats;
  writerUsername: string;
  topics: Topic[];
}

interface BookDetail extends Timestamps {
  id: number;
  slug: string;
  title: string;
  content: string;
  thumbnail: string;
  stats: BookStats;
  writer: User;
  topics: Topic[];
  chapters: BookChapter[];
}

interface BookStats {
  starCount: number;
  reviewCount: number;
}

interface BookReview extends Timestamps {
  id: number;
  content: string;
  rating: number;
  writer: User;
}

interface BookChapter extends Timestamps {
  id: number;
  title: string;
  sequence: number;
}

interface BookChapterDetail extends BookChapter {
  content: Content;
}

type BookSort = 'latest' | 'oldest' | 'relevant' | 'trending';
