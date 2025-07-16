interface Star {
  id: number;
  path: string;
  title: string;
  writerUsername: string;
  topics: Topic[];
  createdAt: string;
  target: StarTarget;
  targetLabel: string;
}

type StarTarget = 'ARTICLE' | 'SERIES' | 'QUESTION';
