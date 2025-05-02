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
        { text: "Approach the knight", nextId: "talk_guard" },
        { text: "Look for another crossing", nextId: "sneak_guard" },
      ],
      scene: "river",
    },
    {
      id: "talk_guard",
      text: "The knight raises his hand. 'If you wish to cross, you must answer my riddle. Only the wise may pass.'",
      questionId: "2",
      nextIdAfterQuestion: "fog",
      scene: "river",
    },
    {
      id: "sneak_guard",
      text: "Choosing stealth over confrontation, you slip away into the reeds and wade into the cold, dark water, hoping to reach the other side unnoticed.",
      questionId: "1",
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
      scene: "hallway",
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
        text: "The city of Arvendale looms like a forgotten monument — its alleys thick with smoke, and its towers veiled in a permanent dusk. Whispers slither through the streets like rats in the dark. A beggar grabs your sleeve, his voice ragged. 'Don’t trust a smiling face. Loyalty here is bought in blood.'",
        choices: [
          { text: "Search the underground for rebels", nextId: "rebel_hideout_entrance" },
          { text: "Visit the mayor’s manor", nextId: "mayor_offer" }
        ],
        scene: "city"
      },
      {
        id: "rebel_hideout_entrance",
        text: "Whispers speak of a rebel contact point near the old aqueduct ruins beyond the city walls. Ivy-choked stones hide more than age. A shady merchant leans against a crumbled archway, eyeing you.",
        choices: [
          { text: "Talk to the merchant for information", nextId: "merchant_hint" },
          { text: "Search the ruins yourself", nextId: "rebel_hideout_sneak" }
        ],
        scene: "city"
      },
      {
        id: "merchant_hint",
        text: "He grins. 'You want into the basement? That’ll cost you a secret. Tell me something worth knowing… or walk away.'",
        questionId: "1",
        nextIdAfterQuestion: "rebel_hideout",
        scene: "city"
      },
      {
        id: "rebel_hideout_sneak",
        text: "You move quietly through the underbrush near the aqueduct ruins. Behind a fallen statue, you uncover a concealed stone slab. With careful effort, you lift it, revealing stairs descending into the earth — the rebels' true refuge.",
        questionId: "1",
        nextIdAfterQuestion: "rebel_hideout",
        scene: "city"
      },
      {
        id: "rebel_hideout",
        text: "Under the cracked arches of the old aqueduct, the rebels gather around makeshift tables lit by oil lanterns. Vines hang from the stonework, and the scent of damp earth clings to the air. A scarred woman — clearly the leader — steps forward from the shadows. 'We don’t have time for doubts,' she says. 'You came here for a reason. So what is it?'",
        choices: [
          { text: "I want to help", nextId: "side_healer_intro" },
          { text: "I’m still weighing my options", nextId: "mayor_offer" }
        ],
        scene: "rebels"
      },
      {
        id: "side_healer_intro",
        text: "'Good,' she says. 'If you want to prove yourself, talk to the healer in the slums. She sees things others don’t.'",
        choices: [{ text: "Go to the healer", nextId: "healer_hut" }],
        scene: "rebels"
      },
      {
        id: "healer_hut",
        text: "The healer’s hut smells of herbs and old ink. Her eyes are cloudy, but her voice is sharp. 'The Queen’s reach poisons the land. The river speaks if you listen.'",
        questionId: "1",
        nextIdAfterQuestion: "healer_reward",
        scene: "slums"
      },
      {
        id: "healer_reward",
        text: "She places a shimmering Light Seal into your hands. 'You’ve done well. This will reveal what lies hidden when others try to deceive you.'\n\nBack at the rebel hideout, the leader claps your shoulder. 'You’ve earned our trust. Ready for something bigger?'",
        choices: [{ text: "What’s next?", nextId: "rebel_mission1" }],
        scene: "rebels"
      },
      {
        id: "rebel_mission1",
        text: "The leader unfurls a map. 'A convoy heads for the Queen’s citadel. But we believe it’s carrying something worse than weapons — people.'\n\n'We’ll strike — but we need someone clever. There’ll be guards.'",
        choices: [
          { text: "Intercept the convoy openly", nextId: "convoy_attack" },
          { text: "Try to infiltrate disguised", nextId: "convoy_sneak" }
        ],
        scene: "rebels"
      },
      {
        id: "convoy_attack",
        text: "You charge from the hills with the rebels. Arrows fly. Steel rings out. Amid the chaos, a locked chest glows faintly — and hums with unnatural energy.",
        questionId: "1",
        nextIdAfterQuestion: "rebel_mission2",
        scene: "forest"
      },
      {
        id: "convoy_sneak",
        text: "Clad in stolen armor, you walk among the Queen’s soldiers. Inside a guarded cart, you find a sealed crate — pulsing with power. A sigil locks it shut.",
        questionId: "1",
        nextIdAfterQuestion: "rebel_mission2",
        scene: "forest"
      },
      {
        id: "rebel_mission2",
        text: "'The mayor’s not just a pawn,' the rebel leader says. 'He’s covering for something deeper. We think the truth is buried in the city archives.'",
        choices: [
          { text: "Sneak into the archive", nextId: "archive_entry" },
          { text: "Ignore it and spark the uprising now", nextId: "city_uprising" }
        ],
        scene: "rebels"
      },
      {
        id: "archive_entry",
        text: "The archive sits beneath the governor’s plaza. You slip through the shadows, past magical wards. Inside, you find dusty scrolls and locked files.",
        questionId: "2",
        nextIdAfterQuestion: "archive_success",
        scene: "dungeon"
      },
      {
        id: "archive_success",
        text: "Letters. Orders. A secret pact with the Queen’s advisor. You return to the rebels.\n\n'You’ve lit the fuse,' the leader says. 'Now let's burn the lies down.'",
        choices: [{ text: "Lead the uprising", nextId: "city_uprising" }],
        scene: "rebels"
      },
      {
        id: "city_uprising",
        text: "The square erupts in fire and fury. People rise. Guards fall. Amid it all, the Queen’s banners burn. You feel the tide of history shifting beneath your feet.",
        scene: "city"
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
        nextIdAfterQuestion: "mayor_shadow_whispers",
        scene: "city",
      },
      {
        id: "mayor_shadow_whispers",
        text: "A cloaked informant intercepts you in the alleyway. 'The mayor plays a deeper game,' she says. 'Ask him about the Queen’s deal.'",
        choices: [
          { text: "Ignore her and proceed", nextId: "mayor_final_mission" },
          { text: "Confront the mayor one last time", nextId: "mayor_truth_confront" }
        ],
        scene: "city"
      },
      {
        id: "mayor_truth_confront",
        text: "He doesn’t flinch. 'Yes, I made a pact with the Queen — but only to protect us. You don’t understand the weight I carry.'",
        choices: [
          { text: "Still… I trust you", nextId: "mayor_final_mission" },
          { text: "That’s the last straw", nextId: "rebel_hideout" }
        ],
        scene: "city"
      },
      {
        id: "mayor_final_mission",
        text: "With all cards on the table, the mayor gives you one last task: eliminate the rebel leadership. 'This ends now — one way or another.'",
        choices: [
          { text: "Lead the assault", nextId: "bad_ending_city" },
          { text: "Warn the rebels and turn on the mayor", nextId: "good_ending_city" }
        ],
        scene: "city"
      },
      {
        id: "good_ending_city",
        text: "With truth exposed and the people at your side, the mayor is overthrown. The city cheers. A new dawn begins — harder, but honest.",
        choices: [],
        scene: "city"
      },
      {
        id: "bad_ending_city",
        text: "The rebels are crushed. The mayor crowns himself Protector. The streets fall silent. Surveillance towers rise. And somewhere, the Queen smiles.",
        choices: [],
        scene: "city"
      }
      
      
];
