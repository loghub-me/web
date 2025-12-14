interface Series {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: SeriesStats;
  writer: User;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
}

interface SeriesDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  stats: SeriesStats;
  writer: User;
  topics: Topic[];
  chapters: SeriesChapter[];
  createdAt: string;
  updatedAt: string;
}

interface SeriesForEdit {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  topicSlugs: string[];
  chapters: SeriesChapter[];
  published: boolean;
}

interface SeriesStats {
  starCount: number;
  reviewCount: number;
}

interface SeriesChapter {
  id: number;
  title: string;
  sequence: number;
  published: boolean;
}

interface SeriesChapterDetail {
  id: number;
  title: string;
  content: Content;
  anchors: Anchor[];
  sequence: number;
  publishedAt: string;
  updatedAt: string;
}

interface SeriesChapterForEdit {
  id: number;
  title: string;
  content: string;
  draft?: string;
  sequence: number;
}

interface SeriesReview {
  id: number;
  content: string;
  rating: number;
  writer: User;
  createdAt: string;
  updatedAt: string;
}

type SeriesSort = 'latest' | 'oldest' | 'relevant' | 'trending';
