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
      // city scenes
    {
      id: "city",
      text: "The city lies in shadow. Poverty, fear, and oppression haunt its streets. A weathered sign reads: 'Welcome to Arvendale.' An old beggar mumbles, 'Watch where your loyalty lies… not everything is as it seems.'",
      choices: [
        { text: "Look for allies in the underground", nextId: "rebel_hideout" },
        { text: "Visit the mayor", nextId: "mayor_offer" },
      ],
      scene: "city",
    },
    {
      id: "rebel_hideout",
      text: "In a dim basement tavern, a silent exchange of glances leads you to a hidden chamber. A group of defiant faces greets you — the rebel leaders.",
      choices: [
        { text: "I want to help you", nextId: "side_healer_intro" },
        { text: "I need to think about this", nextId: "mayor_offer" },
      ],
      scene: "rebels",
    },
    {
      id: "side_healer_intro",
      text: "In the slums, whispers speak of an old healer — once said to be a court mage, now living in exile.",
      choices: [
        { text: "Seek out the healer", nextId: "healer_hut" },
        { text: "Ignore the rumor", nextId: "rebel_mission1" },
      ],
      scene: "slums",
    },
    {
      id: "healer_hut",
      text: "The healer greets you with weary eyes. 'Something unnatural stirs in the river,' she says. 'It came when the Queen's reach grew long.'",
      questionId: "1",
      nextIdAfterQuestion: "healer_reward",
      scene: "slums",
    },
    {
      id: "healer_reward",
      text: "You uncover a dark artifact. The healer purifies it and hands you a Light Seal. 'You’ll need this when the truth clouds your vision,' she says.",
      choices: [{ text: "Return to the rebels", nextId: "rebel_mission1" }],
      scene: "slums",
    },
    {
      id: "rebel_mission1",
      text: "The rebels are planning to intercept a heavily guarded supply convoy. They believe it holds more than just food.",
      questionId: "1",
      nextIdAfterQuestion: "rebel_mission2",
      scene: "rebels",
    },
    {
      id: "rebel_mission2",
      text: "Rumors say the mayor is hiding sensitive documents in the old city archive — something the public mustn’t see.",
      choices: [
        { text: "Sneak into the archive", nextId: "archive_entry" },
        { text: "Skip it and focus on the rebellion", nextId: "city_uprising" },
      ],
      scene: "city",
    },
    {
      id: "archive_entry",
      text: "In the dust-covered archive, you discover sealed letters and decrees — names, dates, and dark orders bearing the mayor’s seal.",
      questionId: "1",
      nextIdAfterQuestion: "archive_success",
      scene: "city",
    },
    {
      id: "archive_success",
      text: "The documents reveal a careful manipulation of public fear. You return with the evidence — and more questions than answers.",
      choices: [{ text: "Start the uprising", nextId: "city_uprising" }],
      scene: "city",
    },
    {
      id: "city_uprising",
      text: "The rebels rise. As you lead the charge to city hall, you remember the mayor’s kindness — but the truth can’t be ignored.",
      questionId: "1",
      nextIdAfterQuestion: "good_ending_city",
      scene: "city",
    },
    {
      id: "mayor_offer",
      text: "Mayor Virell welcomes you into his study. 'I know things look grim,' he says, offering tea. 'But keeping the peace isn’t always graceful.'",
      choices: [
        { text: "I want to help restore order", nextId: "mayor_main_mission1" },
        { text: "I need to see more before I decide", nextId: "rebel_hideout" },
      ],
      scene: "city",
    },
    {
      id: "mayor_main_mission1",
      text: "The mayor asks you to investigate a rebel cell. 'We can’t afford more chaos,' he says, calm and earnest.",
      questionId: "1",
      nextIdAfterQuestion: "mayor_patrol_intro",
      scene: "city",
    },
    {
      id: "mayor_patrol_intro",
      text: "'A patrol vanished outside the city walls,' he says. 'See if you can find out what happened. I trust your judgment.'",
      choices: [
        { text: "Search for the patrol", nextId: "forest_search" },
        { text: "Let it go for now", nextId: "mayor_main_mission2" },
      ],
      scene: "city",
    },
    {
      id: "forest_search",
      text: "In the woods, you find the fallen patrol — and a scroll detailing orders for a village attack. The orders are signed by the mayor himself.",
      questionId: "1",
      nextIdAfterQuestion: "forest_discovery",
      scene: "forest",
    },
    {
      id: "forest_discovery",
      text: "You feel the weight of betrayal — the mayor may have orchestrated this. But why?",
      choices: [
        { text: "Say nothing for now", nextId: "mayor_main_mission2" },
        { text: "Confront him about the orders", nextId: "mayor_confront" },
      ],
      scene: "forest",
    },
    {
      id: "mayor_confront",
      text: "He leans back, eyes calm. 'This city is fragile. Sacrifices… are necessary.' He lets the silence linger. 'You can still stand with me.'",
      choices: [
        { text: "I’ll stay by your side", nextId: "mayor_main_mission2" },
        { text: "I can’t be part of this", nextId: "rebel_hideout" },
      ],
      scene: "city",
    },
    {
      id: "mayor_main_mission2",
      text: "You’re given command of the elite guard for a decisive operation. The target: the rebel leadership.",
      questionId: "1",
      nextIdAfterQuestion: "bad_ending_city",
      scene: "city",
    },
    {
      id: "good_ending_city",
      text: "With truth exposed and the people at your side, the mayor is overthrown. The city breathes freely once more.",
      choices: [],
    },
    {
      id: "bad_ending_city",
      text: "The uprising fails. The mayor tightens his grip, the city drowns in silence. In the shadows, the Queen smiles.",
      choices: [],
    }       
];
