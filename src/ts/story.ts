export interface StoryNode {
    id: string;
    text: string;
    choices?: { text: string; nextId: string }[];
    questionId?: string;
  }
  
  export const storyData: StoryNode[] = [
    {
      id: "start",
      text: "Du wachst in einem dunklen Wald auf. Wohin gehst du?",
      choices: [
        { text: "Nach Norden zum Schloss", nextId: "castle" },
        { text: "Nach Süden ins Dorf", nextId: "village" },
      ],
    },
    {
      id: "castle",
      text: "Du erreichst das Schloss. Ein Torwächter stoppt dich. Was tust du?",
      choices: [
        { text: "Mit ihm sprechen", nextId: "talk_guard" },
        { text: "Ihn umgehen", nextId: "sneak_guard" },
      ],
    },
    {
        id: "talk_guard",
        text: "Am Tor des Schlosses stellt dir der Wächter eine Frage.",
    questionId: "math1",
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
  