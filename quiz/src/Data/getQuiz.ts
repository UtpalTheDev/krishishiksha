
import { quiz } from "./quiz.types";

const quizOne: quiz = {
  quizName: "Marvel Cinematic Universe",
  questions: [
    {
      question:
        "How many avengers were there in first Avengers movie released in 2012?",
      points: 5,
      options: [
        {
          text: "22",
          isRight: false
        },
        {
          text: "6",
          isRight: true
        }
      ]
    },
    {
      question:
        "What was Dr. Strange doing during the fight of New York in 2012?",
      points: 15,
      options: [
        {
          text: "getting trained as master of the mystic arts",
          isRight: false
        },
        {
          text: "performing surgery as a real doctor",
          isRight: true
        }
      ]
    }
  ]
};

export { quizOne };
