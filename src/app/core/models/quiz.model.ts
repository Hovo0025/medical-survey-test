export interface QuizModel {
  id: number;
  question: Question[];
}

export interface Question {
  title: string;
  subtitle: string;
  options: any;
  answer: any;
}
