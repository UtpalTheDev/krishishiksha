import { quiz, Quizdata } from "./quiz.types";

export const quizdata: Quizdata = {
  Marvel: {
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
  },
  Dc: {
    quizName: "Marvel Cinematic Universe",
    questions: [
      {
        question: "Who is Gotham’s Clown Prince of Crime?",
        points: 5,
        options: [
          {
            text: "Joker ",
            isRight: true
          },
          {
            text: "Harley Quinn ",
            isRight: false
          },
          {
            text: "Crazy Quilt ",
            isRight: false
          },
          {
            text: "Mad Hatter",
            isRight: false
          }
        ]
      }
    ]
  }
};

// const quizOne: quiz = {
//   quizName: "Marvel Cinematic Universe",
//   questions: [
//     {
//       question:
//         "How many avengers were there in first Avengers movie released in 2012?",
//       points: 5,
//       options: [
//         {
//           text: "22",
//           isRight: false
//         },
//         {
//           text: "6",
//           isRight: true
//         }
//       ]
//     },
//     {
//       question:
//         "What was Dr. Strange doing during the fight of New York in 2012?",
//       points: 15,
//       options: [
//         {
//           text: "getting trained as master of the mystic arts",
//           isRight: false
//         },
//         {
//           text: "performing surgery as a real doctor",
//           isRight: true
//         }
//       ]
//     }
//   ]
// };

// export { quizOne };
