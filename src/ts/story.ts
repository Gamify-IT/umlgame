export interface StoryNode {
    id: string;
    text: string;
    choices?: { text: string; nextId: string }[];
    questionId?: string;
    nextIdAfterQuestion?: string; 
    scene?: string;
  }
  
  export const storyData: StoryNode[] = [
    {
      id: "start",
      text: "You wake up in a dark forest. Where do you want to go?",
      choices: [
        { text: "North to the castle", nextId: "river" },
        { text: "South to the village", nextId: "village" },
      ],
    },
    {
      id: "river",
      text: "After a long journey you finally make it out of the woods. There is a big river dividing your path. It seems that there is a bridge guarded by a knight. What will you do?",
      choices: [
        { text: "Talk to the knight", nextId: "talk_knight" },
        { text: "Search for another way", nextId: "sneak_guard" },
      ],
      scene: "river",
    },
    {
      id: "talk_knight",
      text: "'If you want to pass this bridge you first need to solve my riddle.'",
  questionId: "2",
  nextIdAfterQuestion: "fog",
  scene: "river",
  
    },
    {
      id: "fog",
      text: "You crossed the river. A thick fog spreads. In the distant you can see the castle but when you try to head towards the castle... you hear a faint sound in the distance. It sounds like a weeping girl asking for help. What will you do?",
      choices: [
        { text: "Follow the voice", nextId: "voice_fog" },
        { text: "Go straight to the castle", nextId: "castle" },
      ],
  scene: "river",
  
    },
    {
      id: "voice_fog",
      text: "You make your way through the fog. It seems like you have been going for hours without reaching anywhere. Suddenly the fog seems to be moving and form a shape... ",
      choices: [
        { text: "Continue", nextId: "voice_fog2" },
       
      ],
      scene: "river",
    },
    {
      id: "voice_fog2",
      text: "'Hero... you finally appeared... solve the riddle... to free my soul...",
      questionId: "1",
      nextIdAfterQuestion: "way_castle",
  scene: "river",
    },
    {
        id: "way_castle",
        text: "The fog suddenly cleared itself and the girl is nowhere to be seen. You decide to continue your way to the castle",
    choices: [
      { text: "Continue", nextId: "castle_entrance" },
     
    ],
    scene: "way",
      },
      {
        id: "castle_entrance",
        text: "The entrance is protected by a guard. What will you do?",
   
    choices: [
      { text: "Talk to the guard", nextId: "talk_guard" },
      { text: "Sneak the guard", nextId: "sneak_guard" },
     
    ],
    scene: "castle-outside",
      },
      {
        id: "talk_guard",
        text: "'If you want to pass inside you must first tell me the password.'",
   
    choices: [
      { text: "Talk to the guard", nextId: "talk_guard" },
      { text: "Sneak the guard", nextId: "sneak_guard" },
     
    ],
    scene: "castle-outside",
      },
    {
      id: "village",
      text: "Im Dorf treffen dich die Dorfbewohner mit neugierigen Blicken. Was machst du?",
      choices: [
        { text: "Mit dem Bürgermeister reden", nextId: "mayor" },
        { text: "Die Taverne besuchen", nextId: "tavern" },
      ],
    },
  ];
  