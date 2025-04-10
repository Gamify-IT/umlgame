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
        { text: "Venture south to the quiet village", nextId: "village" },
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
      questionId: "7", // maybe a question testing morality or allegiance
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
      id: "village",
      text: "Im Dorf treffen dich die Dorfbewohner mit neugierigen Blicken. Was machst du?",
      choices: [
        { text: "Mit dem Bürgermeister reden", nextId: "mayor" },
        { text: "Die Taverne besuchen", nextId: "tavern" },
      ],
    },
  ];
  