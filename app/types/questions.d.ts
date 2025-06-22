interface Question {
  id: number;
  slug: string;
  title: string;
  status: QuestionStatus;
  stats: QuestionStats;
  writerUsername: string;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
}

interface QuestionSimple {
  id: number;
  slug: string;
  title: string;
  writerUsername: string;
}

interface QuestionDetail {
  id: number;
  slug: string;
  title: string;
  content: Content;
  status: QuestionStatus;
  stats: QuestionStats;
  writer: User;
  topics: Topic[];
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

interface QuestionStats {
  starCount: number;
  answerCount: number;
}

type QuestionStatus = 'OPEN' | 'CLOSED' | 'SOLVED';

interface Answer {
  id: number;
  content: Content;
  accepted: boolean;
  writer: User;
  createdAt: string;
  updatedAt: string;
}
