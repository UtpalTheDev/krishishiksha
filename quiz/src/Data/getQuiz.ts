import { quiz, Quizdata } from "./quiz.types";

export const quizdata: Quizdata = {
  "Marvel": {
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
  "Dc": {
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
  },
  "Agricultural And Rural Land Use" : {
    quizName: "Agricultural And Rural Land Use",
    questions: [
      {
        question: " How have globalization and improved transportation links changed the geography of production areas for products such as apples, grapes, and fresh cut flowers? ",
        points: 5,
        options: [
          {
            text: " North American farmers no longer have a competitive advantage all year",
            isRight: false
          },
          {
            text: " Farmers will seek out areas with the lowest production costs ",
            isRight: false
          },
          {
            text: "Production areas have become more competitive in Least Developed Countries (LDCs) ",
            isRight: false
          },
          {
            text: "Southern hemisphere producers have increased production of these items ",
            isRight: false
          },
          {
            text: "All of the above",
            isRight: true
          }
        ]
      },
      {
        question: " All of the following are aspects of commercial agriculture except?",
        points: 5,
        options: [
          {
            text: " There is little relationship to other businesses. ",
            isRight: false
          },
          {
            text: " The average size of farms is hundreds of acres. ",
            isRight: true
          },
          {
            text: " A small percentage of the workforce is engaged directly in agriculture. ",
            isRight: false
          },
          {
            text: " The product is consumed off the farm. ",
            isRight: false
          }
        ]
      },
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
