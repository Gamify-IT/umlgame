<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { storyData } from "../ts/story";
import { dummyQuestions } from "../ts/Questions/dummyQuestions";
import { PlayerStats } from "../ts/player";
import UmlTemplate from "../components/UmlTemplate.vue";
import heroImage from "../assets/Characters/Hero.jpg";
import App from './App.vue';


const emit = defineEmits<{
  (event: 'go-back-to-menu'): void;
}>();
const scene = ref("forest");
const currentNodeId = ref("start");
const showPopup = ref(false);
const showMenu = ref(false);

const currentNode = computed(() => storyData.find((node) => node.id === currentNodeId.value));
const lifeArray = computed(() => {
  return Array.from({ length: PlayerStats.maxLp }, (_, i) => i < PlayerStats.lp);
});

const makeChoice = (nextId: string) => {
  const nextNode = storyData.find((node) => node.id === nextId);
  if (nextNode?.scene) {
    scene.value = nextNode.scene; 
  }
  currentNodeId.value = nextId;
};

const currentQuestion = computed(() => 
  dummyQuestions.find((q) => q.id === currentNode.value?.questionId)
);

const sceneBackground = computed(() => `scene-${scene.value}`);
const displayedText = ref("");
const textFinished = ref(false);

let typingTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
  () => currentNode.value?.text,
  (newText) => {
    if (typingTimeout) clearTimeout(typingTimeout);
    displayedText.value = "";
    textFinished.value = false;
    if (newText) typeWriter(newText, 0);
  },
  { immediate: true }
);

function typeWriter(text: string, i: number) {
  if (i < text.length) {
    displayedText.value += text[i];
    typingTimeout = setTimeout(() => typeWriter(text, i + 1), 40); 
  } else {
    textFinished.value = true; 
  }
}

function answerQuestion  (isCorrect: boolean)  {
if (isCorrect && currentNode.value?.nextIdAfterQuestion){
  makeChoice(currentNode.value.nextIdAfterQuestion);
} else {
  PlayerStats.lp -= 1;
  if (PlayerStats.lp < 0) PlayerStats.lp = 0;
    console.log(`Lebenspunkte: ${PlayerStats.lp}`);
    
}
}

function skipText() {
  if (!textFinished.value && currentNode.value?.text) {
    if (typingTimeout) clearTimeout(typingTimeout);
    displayedText.value = currentNode.value.text;
    textFinished.value = true;
  }
}


const exit = () => {
  showPopup.value = true;
};


const continueStory = () => {
  showPopup.value = false; 
};

const goBackToMenu = () => {
 
  showPopup.value = false; 

  emit("go-back-to-menu");
};


</script>

<template>
  <div :class="sceneBackground" class="background">
    <img :src="heroImage" alt="Hero" class="character-left" />
    <button class="pixel-font exit-button" @click="exit">X</button>

    <div id="life-display">
      <img
    v-for="(full, index) in lifeArray"
    :key="index"
    :src="full ? 'src/assets/Icons/heart_full.jpg' : 'src/assets/Icons/heart_empty.jpg'"
    class="heart-icon"
  />
</div>
    <div class="story-container">
      

      <div v-if="currentNode?.questionId" class="question-box">
    <!-- Falls es eine Uml Frage ist -->
      <UmlTemplate
          v-if="currentNode?.questionId === '2' && textFinished" 
          :questionId="currentNode.questionId" 
          @answer="answerQuestion"
           
        />

      <!-- Falls eine Frage vorhanden ist -->
      <div v-else-if="currentQuestion && textFinished">
        <h3>{{ currentQuestion.text }}</h3>
        <button
          v-for="choice in currentQuestion.choices"
          :key="choice.text"
          @click="answerQuestion(choice.correct)"
           class="pixel-font"
        >
          {{ choice.text }}
        </button>
      </div>

    </div>
    <div class="text-box">
        <h2 class="pixel-font">{{ displayedText }}</h2>
        <button v-if="!textFinished" @click="skipText" class="pixel-font story-button">
         Skip
        </button>

        <!-- Falls es normale Story-Entscheidungen gibt -->
        <div v-if="textFinished && currentNode?.choices">
        
          <button v-for="choice in currentNode.choices" :key="choice.nextId" @click="makeChoice(choice.nextId)"  class="pixel-font story-button">
            {{ choice.text }}
          </button>
        </div>
      </div>
      </div>
    </div>

      <!-- Exit Button-->
      <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <p>Do you want to continue or leave the game?</p>
        <button @click="continueStory">Continue</button>
        <button @click="goBackToMenu">Exit</button>
      </div>
    </div>
    <App v-if="showMenu" />
 
</template>


<style scoped>

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.popup-content button {
  margin-top: 10px;
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #666;
}

.exit-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #000; 
  border: 2px solid #fff; 
  color: #fff; 
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

}
.exit-button:hover {
  background-color: #444; 
}

.background {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


.story-container {
  position: relative;
  width: 80%;
  max-width: 800px;
  
}

.text-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 10px;
  color: white;
  z-index: 10;
  
}
.question-box {
  position: absolute;
  top: -320px; 
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 10;
}

#life-display {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 40px; 
  z-index: 1000; 
  user-select: none; 
}

.heart-icon {

  width: 50px;
  height: 40px;
  margin-right: 4px;
  image-rendering: pixelated;
}

.story-button {
  background-color: #222;
  border: 4px solid #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
  color: #fff;
  margin: 10px 0;
  padding-right: 10px;
}

.story-button:hover {
  background-color: #444;
}

.character-left {
  position: absolute;
  bottom: 0px; 
  left: 0; 
  height: 700px; 
  z-index: 1; 
  image-rendering: auto; 
}

.skip-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #333;
  border: 2px solid white;
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  z-index: 11;
}

</style>
