export interface Question {
    id: string;
    text: string;
    choices: { text: string; correct: boolean }[];
  }
  
  export const dummyQuestions: Question[] = [
    {
      id: "math1",
      text: "Was ist 2 + 2?",
      choices: [
        { text: "3", correct: false },
        { text: "4", correct: true },
        { text: "5", correct: false },
      ],
    },
    {
      id: "color1",
      text: "Welche Farbe hat der Himmel?",
      choices: [
        { text: "Blau", correct: true },
        { text: "Grün", correct: false },
        { text: "Rot", correct: false },
      ],
    },
  ];
  