export type quiz = {
    quizName: string;
    questions: question[];
  };
  export type question = {
    question: string;
    points: number;
    options: option[];
  };
  export type option = {
    text: string;
    isRight: boolean;
  };