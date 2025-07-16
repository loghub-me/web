interface Question extends Timestamps {
  id: number;
  slug: string;
  title: string;
  status: QuestionStatus;
  stats: QuestionStats;
  writer: UserSimple;
  topics: Topic[];
}

interface QuestionDetail extends Timestamps {
  id: number;
  slug: string;
  title: string;
  content: Content;
  status: QuestionStatus;
  stats: QuestionStats;
  writer: User;
  topics: Topic[];
  answers: QuestionAnswer[];
}

interface QuestionStats {
  starCount: number;
  answerCount: number;
}

type QuestionStatus = 'OPEN' | 'CLOSED' | 'SOLVED';
type QuestionSort = 'latest' | 'oldest' | 'relevant' | 'trending';
type QuestionFilter = 'all' | 'open' | 'closed' | 'solved';

interface QuestionAnswer extends Timestamps {
  id: number;
  content: Content;
  accepted: boolean;
  writer: User;
}

interface AnswerPermission {
  isWriter: boolean;
  isAcceptable: boolean;
  isEditable: boolean;
  isDeletable: boolean;
}
