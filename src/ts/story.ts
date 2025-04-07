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
      id: "sneak_guard",
      text: "You decide it's the best to stay hidden on your path, you try to swim across the river.",
  questionId: "2",
  nextIdAfterQuestion: "fog",
  scene: "river",
  
    },
    {
      id: "fog",
      text: "You crossed the river. Suddenly a thick fog spreads. In the distant you can see the castle but when you try to head towards the castle... you hear a faint sound in the distance. It sounds like a weeping girl asking for help. What will you do?",
      choices: [
        { text: "Follow the voice", nextId: "voice_fog" },
        { text: "Go straight to the castle", nextId: "castle_entrance" },
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
        text: "The fog suddenly cleared itself and the girl is nowhere to be seen. ",
    choices: [
      { text: "Continue", nextId: "castle_entrance" },
     
    ],
    scene: "way",
      },
      {
        id: "castle_entrance",
        text: "You decide to continue your way to the castle. After walking for a bit you finally reach the castle. The entrance is protected by a knight. What will you do?",
   
    choices: [
      { text: "Talk to the knight", nextId: "talk_knight" },
      { text: "Sneak the knight", nextId: "sneak_knight" },
     
    ],
    scene: "castle-outside",
      },
      {
        id: "talk_knight",
        text: "'If you want to pass inside you must first tell me the password.'",
   
        questionId: "1",
        nextIdAfterQuestion: "castle_hall",
    scene: "castle-outside",
      },
      {
        id: "sneak_knight",
        text: "You decide to sneak your way in. You try to pick the big lock that is hanging on the door.",
   
        questionId: "1",
        nextIdAfterQuestion: "castle_hall",
    scene: "castle-outside",
      },
      { id: "castle_hall",
      text: "You enter the grand hall of the castle. Two paths lie ahead: a dark hallway and a lit corridor.",
      choices: [
        { text: "Go through the dark hallway", nextId: "library" },
        { text: "Take the lit corridor", nextId: "dungeon" },
      ],
      scene: "hallway",
    },
    {
      id: "library",
      text: "You reach a big library. Do you want to take a look inside? ",
      choices: [
        { text: "Go inside the library", nextId: "library_inside" },
        { text: "Continue your way", nextId: "throne_room" },
      ],
      
      scene: "hallway",
    },
    {
      id: "library",
      text: "The room is filled with a lot of old books. You find an old book describing the Queen’s dark past. A puzzle must be solved to learn her weakness.",
      questionId: "4",
      nextIdAfterQuestion: "throne_room",
      scene: "castle",
    },
    {
      id: "dungeon",
      text: "You enter a big cave like room. You see someone chained to a big stone. Do you want to talk to him?",
      choices: [
        { text: "Talk to the prisoner", nextId: "prisoner" },
        { text: "Ignore the prisoner", nextId: "throne_room" },
      ],
      scene: "dungeon",
    },
    {
      id: "prisoner",
      text: "'Please free me hero! The queen keeps me locked up in here. If you do I will tell you a secret about the Queen...'",
      questionId: "5",
      nextIdAfterQuestion: "throne_room",
      scene: "dungeon",
    },
      // village scenes
    {
      id: "village",
      text: "Im Dorf treffen dich die Dorfbewohner mit neugierigen Blicken. Was machst du?",
      choices: [
        { text: "Mit dem Bürgermeister reden", nextId: "mayor" },
        { text: "Die Taverne besuchen", nextId: "tavern" },
      ],
    },
  ];
  