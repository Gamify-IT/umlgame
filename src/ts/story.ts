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
      text: "You awaken on the damp forest floor, shrouded in darkness. The air is thick with mist, and distant howls echo through the trees. Where will you go?",
      choices: [
        { text: "Head north toward the looming castle", nextId: "river" },
        { text: "Venture south to the quiet city", nextId: "city" },
      ],
    },
    {
      id: "river",
      text: "After hours of trudging through tangled underbrush, you emerge from the forest to find a wide river glistening under a pale sky. A solitary knight guards a weathered stone bridge. His gaze pierces through his visor. What will you do?",
      choices: [
        { text: "Approach the knight", nextId: "talk_knight" },
        { text: "Look for another crossing", nextId: "sneak_guard" },
      ],
      scene: "river",
    },
    {
      id: "talk_knight",
      text: "The knight raises his hand. 'If you wish to cross, you must answer my riddle. Only the wise may pass.'",
      questionId: "2",
      nextIdAfterQuestion: "fog",
      scene: "river",
    },
    {
      id: "sneak_guard",
      text: "Choosing stealth over confrontation, you slip away into the reeds and wade into the cold, dark water, hoping to reach the other side unnoticed.",
      questionId: "2",
      nextIdAfterQuestion: "fog",
      scene: "river",
    },
    {
      id: "fog",
      text: "You make it across the river, but as your feet touch land, a heavy fog unfurls like a living veil. In the distance, the silhouette of the castle flickers. Just as you set your path, a sorrowful voice calls out—soft, weeping, and unmistakably human.",
      choices: [
        { text: "Follow the haunting voice", nextId: "voice_fog" },
        { text: "Ignore it and head straight for the castle", nextId: "castle_entrance" },
      ],
      scene: "river",
    },
    {
      id: "voice_fog",
      text: "You press into the fog, each step more uncertain than the last. Hours seem to pass. The mist thickens until it begins to twist unnaturally... taking shape.",
      choices: [{ text: "Continue", nextId: "voice_fog2" }],
      scene: "river",
    },
    {
      id: "voice_fog2",
      text: "A ghostly figure emerges a girl, her voice a whisper on the wind. 'Hero... at last... free me with the answer... to the riddle of my soul...'",
      questionId: "1",
      nextIdAfterQuestion: "way_castle",
      scene: "river",
    },
    {
      id: "way_castle",
      text: "With your answer, the fog vanishes like a breath in winter. The girl is gone. Silence returns. The path to the castle lies ahead.",
      choices: [{ text: "Continue", nextId: "castle_entrance" }],
      scene: "way",
    },
    {
      id: "castle_entrance",
      text: "The looming gates of the castle rise before you, dark and formidable. A vigilant knight blocks your way, his eyes fixed on you beneath a gleaming helm.",
      choices: [
        { text: "Speak with the knight", nextId: "talk_knight" },
        { text: "Attempt to sneak past", nextId: "sneak_knight" },
      ],
      scene: "castle-outside",
    },
    {
      id: "talk_knight",
      text: "The knight steps forward. 'No one enters without the password. Speak it, or turn back.'",
      questionId: "1",
      nextIdAfterQuestion: "castle_hall",
      scene: "castle-outside",
    },
    {
      id: "sneak_knight",
      text: "You wait for the knight to turn his back, then creep to the massive doors. A rusted lock holds them shut—but with luck and skill, you might just crack it.",
      questionId: "1",
      nextIdAfterQuestion: "castle_hall",
      scene: "castle-outside",
    },
    {
      id: "castle_hall",
      text: "You step into a vast hall echoing with silence. Two paths lie ahead: a shadow-drenched hallway, and a corridor bathed in flickering torchlight.",
      choices: [
        { text: "Enter the dark hallway", nextId: "library" },
        { text: "Take the lit corridor", nextId: "dungeon" },
      ],
      scene: "hallway",
    },
    {
      id: "library",
      text: "You tread down the dark hall until you reach a massive wooden door. Inside, a dusty library waits in silence. Do you enter?",
      choices: [
        { text: "Step into the library", nextId: "library_inside" },
        { text: "Ignore it and move on", nextId: "throne_room" },
      ],
      scene: "hallway",
    },
    {
      id: "library_inside",
      text: "Dust swirls through shafts of moonlight as you wander between crumbling shelves. Among the tomes, you discover a forbidden book—a chronicle of the Queen’s shadowed past. A puzzle lies within, holding the key to her undoing.",
      questionId: "4",
      nextIdAfterQuestion: "throne_room1",
      scene: "castle",
    },
    {
      id: "dungeon",
      text: "The corridor leads downward into a cavernous dungeon. Chains clink in the distance. A prisoner is bound to a massive stone slab. His eyes plead with you. Will you stop?",
      choices: [
        { text: "Speak with the prisoner", nextId: "prisoner" },
        { text: "Leave him and move on", nextId: "throne_room" },
      ],
      scene: "dungeon",
    },
    {
      id: "prisoner",
      text: "'Please... free me, brave one,' the man begs. 'The Queen locked me here for what I know. Help me, and I’ll share her greatest secret...'",
      questionId: "5",
      nextIdAfterQuestion: "throne_room1",
      scene: "dungeon",
    },
    {
      id: "throne_room1",
      text: "Armed with the truth, you press forward. The moment has come to confront the Queen face to face.",
      choices: [{ text: "Continue", nextId: "throne_room" }],
      scene: "throneRoom",
    },
  
    {
      id: "throne_room",
      text: "As you ascend to the top floor of the castle, towering doors swing open to reveal a vast, opulent chamber bathed in golden light. At its heart, elevated on a dais of polished obsidian, rests a grand throne—ornate and imposing—where the queen sits in regal stillness, her gaze as sharp as the blade at her side.",
      questionId: "5",
      nextIdAfterQuestion: "throne_room_inside",
      scene: "throneRoom",
    },
    {
      id: "throne_room_inside",
      text: "You step into the throne room. The queen rises slowly, her eyes locking onto yours.\n\n'You truly believe you can defeat me?' she says with a cold smile. 'Why not embrace your destiny... and rule by my side instead?'",
      choices: [
        { text: "Stand your ground and fight", nextId: "resolve_fight" },
        { text: "Join forces with the Queen", nextId: "resolve_join" },
      ],
      scene: "throneRoom",
    },
    {
      id: "resolve_fight",
      text: "The Queen laughs as you charge forward. 'Then prove your worth, hero. Solve this, if you truly seek to end me.'",
      questionId: "6", 
      nextIdAfterQuestion: "good_ending_success",
      scene: "throneRoom",
    },
    {
      id: "resolve_join",
      text: "You kneel, but the Queen hesitates. 'Before you claim power, answer this... to prove your loyalty.'",
      questionId: "7", 
      nextIdAfterQuestion: "bad_ending_corrupt",
      scene: "throneRoom",
    },
    {
      id: "good_ending_success",
      text: "With a cry, you leap forward—your mind sharp from the trials, your resolve unshaken. Steel meets sorcery as you strike true. The Queen falters, defeated by your strength and wit.\n\nThe castle begins to quake as her power dissolves.\n\n**THE END – You brought light to a dark land.**",
      choices: [],
      scene: "ending",
    },
    {
      id: "bad_ending_corrupt",
      text: "Your answer pleases her. A dark energy coils around you, binding your soul to hers.\n\n'Yes... I see the darkness in you,' she whispers. 'Let us rule together.'\n\nAnd so you do ushering in an age of fear.\n\n**THE END – You chose power over justice.**",
      choices: [],
      scene: "ending",
    },
      // village scenes
      {
         id: "city",
        text: "Die Stadt liegt im Schatten. Armut, Angst und Unterdrückung prägen das Straßenbild. Ein verfallenes Schild begrüßt dich: 'Willkommen in Arvendale'. Ein alter Bettler murmelt: 'Der Bürgermeister spricht für die Königin… pass auf, wem du vertraust.'",
        choices: [
          { text: "Suche nach Verbündeten im Untergrund", nextId: "rebel_hideout" },
          { text: "Gehe direkt zum Bürgermeister", nextId: "mayor_offer" },
        ],
        scene: "city",
      },
      {
        id: "rebel_hideout",
        text: "In einer Kellerkneipe führt dich ein geheimnisvoller Blickkontakt in eine verborgene Kammer. Die Rebellenführer erwarten dich.",
        choices: [
          { text: "Ich will euch helfen", nextId: "side_healer_intro" },
          { text: "Ich bin mir nicht sicher…", nextId: "mayor_offer" },
        ],
        scene: "rebels",
      },
      {
        id: "side_healer_intro",
        text: "Im Armenviertel hörst du von einer alten Heilerin. Manche sagen, sie war einst Hofmagierin der Königin.",
        choices: [
          { text: "Suche die Heilerin auf", nextId: "healer_hut" },
          { text: "Ignoriere das Gerücht", nextId: "rebel_mission1" },
        ],
        scene: "slums",
      },
      {
        id: "healer_hut",
        text: "Die Heilerin bittet dich um Hilfe. Etwas Dunkles liegt im Fluss, das die Königin hierher gebracht hat.",
        questionId: "8",
        nextIdAfterQuestion: "healer_reward",
        scene: "slums",
      },
      {
        id: "healer_reward",
        text: "Du findest ein finsteres Artefakt. Die Heilerin verbannt es und überreicht dir ein Licht-Siegel.",
        choices: [{ text: "Zurück zu den Rebellen", nextId: "rebel_mission1" }],
        scene: "slums",
      },
      {
        id: "rebel_mission1",
        text: "Die Rebellen planen, einen Versorgungskonvoi der Wachen abzufangen. Sie brauchen deine Hilfe.",
        questionId: "3",
        nextIdAfterQuestion: "rebel_mission2",
        scene: "rebels",
      },
      {
        id: "rebel_mission2",
        text: "Die Rebellen vermuten, dass der Bürgermeister geheime Dokumente im alten Stadtarchiv versteckt hat.",
        choices: [
          { text: "Schleiche ins Archiv", nextId: "archive_entry" },
          { text: "Ignoriere das und bereite den Aufstand vor", nextId: "city_uprising" },
        ],
        scene: "city",
      },
      {
        id: "archive_entry",
        text: "Im Archiv findest du Beweise für den Verrat des Bürgermeisters.",
        questionId: "9",
        nextIdAfterQuestion: "archive_success",
        scene: "city",
      },
      {
        id: "archive_success",
        text: "Mit diesen Beweisen steigen dein Ansehen und deine Macht bei den Rebellen.",
        choices: [{ text: "Beginne den Aufstand", nextId: "city_uprising" }],
        scene: "city",
      },
      {
        id: "city_uprising",
        text: "Die Rebellen marschieren. Du führst sie zum Rathaus. Der Bürgermeister erwartet euch – bewaffnet.",
        questionId: "5",
        nextIdAfterQuestion: "good_ending_city",
        scene: "city",
      },
      {
        id: "mayor_offer",
        text: "Der Bürgermeister empfängt dich mit offenen Armen. 'Hilf mir, Ordnung zu bewahren. Ich belohne Loyalität.'",
        choices: [
          { text: "Ich helfe dir", nextId: "mayor_main_mission1" },
          { text: "Ich vertraue dir nicht", nextId: "rebel_hideout" },
        ],
        scene: "city",
      },
      {
        id: "mayor_main_mission1",
        text: "Der Bürgermeister schickt dich, um eine Rebellenzelle zu infiltrieren.",
        questionId: "4",
        nextIdAfterQuestion: "mayor_patrol_intro",
        scene: "city",
      },
      {
        id: "mayor_patrol_intro",
        text: "'Eine Patrouille ist verschwunden', sagt der Bürgermeister. 'Finde heraus, was passiert ist.'",
        choices: [
          { text: "Suche die Patrouille", nextId: "forest_search" },
          { text: "Ignoriere es", nextId: "mayor_main_mission2" },
        ],
        scene: "city",
      },
      {
        id: "forest_search",
        text: "Du findest die toten Wachen und ein Pergament – ein Befehl zum Angriff auf ein friedliches Dorf.",
        questionId: "10",
        nextIdAfterQuestion: "forest_discovery",
        scene: "forest",
      },
      {
        id: "forest_discovery",
        text: "Du erkennst: Der Bürgermeister hat sie für ihren Ungehorsam ermorden lassen.",
        choices: [
          { text: "Schweigen und loyal bleiben", nextId: "mayor_main_mission2" },
          { text: "Konfrontiere den Bürgermeister", nextId: "mayor_confront" },
        ],
        scene: "forest",
      },
      {
        id: "mayor_confront",
        text: "'Manchmal ist Härte nötig', sagt er. 'Entscheide dich.'",
        choices: [
          { text: "Ich bleibe an deiner Seite", nextId: "mayor_main_mission2" },
          { text: "Ich verlasse dich und suche die Rebellen", nextId: "rebel_hideout" },
        ],
        scene: "city",
      },
    
      {
        id: "mayor_main_mission2",
        text: "Der Bürgermeister will einen finalen Schlag gegen die Rebellen. Du führst die Elitewache.",
        questionId: "6",
        nextIdAfterQuestion: "bad_ending_city",
        scene: "city",
      },
    
      {
        id: "good_ending_city",
        text: "Mit Mut, Wahrheit und Verbündeten stürzt du den Bürgermeister. Die Stadt feiert ihre Freiheit.",
        choices: [],
        
      },
      {
        id: "bad_ending_city",
        text: "Die Rebellion wird zerschlagen. Die Stadt fällt tiefer in Dunkelheit. Der Bürgermeister lacht im Schatten der Königin.",
        choices: [],
        
      },
   


   
];
