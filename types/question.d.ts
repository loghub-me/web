interface Question {
  id: number;
  slug: string;
  title: string;
  status: QuestionStatus;
  stats: QuestionStats;
  writer: User;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
}

interface QuestionDetail {
  id: number;
  slug: string;
  title: string;
  content: Content;
  anchors: Anchor[];
  status: QuestionStatus;
  stats: QuestionStats;
  writer: User;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
}

interface QuestionForEdit {
  id: number;
  title: string;
  content: string;
  draft?: string;
  topicSlugs: string[];
}

interface QuestionStats {
  starCount: number;
  answerCount: number;
}

interface QuestionAnswer {
  id: number;
  title: string;
  content: Content;
  accepted: boolean;
  writer: User;
  createdAt: string;
  updatedAt: string;
}

interface QuestionAnswerForEdit {
  id: number;
  title: string;
  content: string;
  draft?: string;
}

type QuestionStatus = 'OPEN' | 'CLOSED' | 'SOLVED';
type QuestionSort = 'latest' | 'oldest' | 'relevant' | 'trending';
type QuestionFilter = 'all' | 'open' | 'closed' | 'solved';
