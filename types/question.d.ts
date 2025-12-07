interface Question extends Timestamps {
  id: number;
  slug: string;
  title: string;
  status: QuestionStatus;
  stats: QuestionStats;
  writer: User;
  topics: Topic[];
}

interface QuestionDetail extends Timestamps {
  id: number;
  slug: string;
  title: string;
  content: Content;
  anchors: Anchor[];
  status: QuestionStatus;
  stats: QuestionStats;
  writer: User;
  topics: Topic[];
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

interface QuestionAnswer extends Timestamps {
  id: number;
  title: string;
  content: Content;
  accepted: boolean;
  writer: User;
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
