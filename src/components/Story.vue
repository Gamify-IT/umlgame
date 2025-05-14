<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { storyData } from "../ts/story";
import { PlayerStats } from "../ts/player";
import UmlTemplate from "../components/UmlTemplate.vue";
import heroImage from "../assets/Characters/Hero.jpg";
import App from './App.vue';
import heartEmpty from '../assets/Icons/heart_empty.jpg';
import gameOverSound from '../assets/gameOver.mp3';
import errorSoundFile from '../assets/errorSound.mp3';
import successSoundFile from '../assets/winSound.mp3';
import store from '../store';



const gameOverAudio = new Audio(gameOverSound);
gameOverAudio.volume = 0.4;
const currentQuestionIndex = ref(0);
const livesUsed = ref(0);

const emit = defineEmits<{
  (event: 'go-back-to-menu'): void;
}>();
const scene = ref("forest");
const currentNodeId = ref("start");
const showPopup = ref(false);
const showMenu = ref(false);
const feedbackMessage = ref("");
const currentNode = computed(() => storyData.find((node) => node.id === currentNodeId.value));
const lifeArray = computed(() => {
  return Array.from({ length: PlayerStats.maxLp }, (_, i) => i < PlayerStats.lp);
});

PlayerStats.lp = PlayerStats.maxLp;

const makeChoice = (nextId: string) => {
  const nextNode = storyData.find((node) => node.id === nextId);
  if (nextNode?.scene) {
    scene.value = nextNode.scene;
  }
  currentNodeId.value = nextId;
};


const errorAudio = new Audio(errorSoundFile);
errorAudio.volume = 0.3;
const successAudio = new Audio(successSoundFile);
successAudio.volume = 0.3;

const sceneBackground = computed(() => `scene-${scene.value}`);
const displayedText = ref("");
const textFinished = ref(false);
const isQuestionLoaded = ref(false);
const isGameOver = computed(() => PlayerStats.lp <= 0);

const emptyLifeArray = computed(() =>
  Array.from({ length: PlayerStats.maxLp }, () => false)
);

let typingTimeout: ReturnType<typeof setTimeout> | null = null;

watch(isGameOver, (newVal) => {
  if (newVal) {
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
  }
});

watch(
  () => currentNode.value?.text,
  (newText) => {
    if (typingTimeout) clearTimeout(typingTimeout);
    displayedText.value = "";
    textFinished.value = false;
    isQuestionLoaded.value = false
    if (newText) typeWriter(newText, 0);
  },
  { immediate: true }
);

const showEndscreen = computed(() =>
  currentNode.value?.id === 'goodEnding' || currentNode.value?.id === 'badEnding'
);

function typeWriter(text: string, i: number) {
  if (i < text.length) {
    displayedText.value += text[i];
    typingTimeout = setTimeout(() => typeWriter(text, i + 1), 40);
  } else {
    textFinished.value = true;
    if (currentNode.value?.questionId) {
      setTimeout(() => {
        isQuestionLoaded.value = true;
      }, 2000);
    } else {
      isQuestionLoaded.value = false;
    }
  }
}

function handleCorrectAnswer() {
  currentQuestionIndex.value++;
}

function answerQuestion(isCorrect: boolean) {
  feedbackMessage.value = isCorrect ? "Right!" : "Wrong!";

  if (isCorrect && currentNode.value?.nextIdAfterQuestion) {
    successAudio.currentTime = 0;
    successAudio.play();
    makeChoice(currentNode.value.nextIdAfterQuestion);
  } else {
    PlayerStats.lp -= 1;
    if (PlayerStats.lp < 0) PlayerStats.lp = 0;
    livesUsed.value += 1;
    if (PlayerStats.lp < 0) PlayerStats.lp = 0;
    console.log(`Lebenspunkte: ${PlayerStats.lp}`);
    errorAudio.currentTime = 0;
    errorAudio.play();
  }
  setTimeout(() => {
    feedbackMessage.value = "";
  }, 2000);
}


function skipText() {
  if (!textFinished.value && currentNode.value?.text) {
    if (typingTimeout) clearTimeout(typingTimeout);
    displayedText.value = currentNode.value.text;
    textFinished.value = true;
    if (currentNode.value?.questionId) {
      setTimeout(() => {
        isQuestionLoaded.value = true;
      }, 2000);
    } else {
      isQuestionLoaded.value = false;
    }
  }
}

const resetGame = () => {
  PlayerStats.lp = PlayerStats.maxLp;
  livesUsed.value = 0;
  currentNodeId.value = "start";
  scene.value = "forest";
  displayedText.value = "";
  textFinished.value = false;
  isQuestionLoaded.value = false;
  feedbackMessage.value = "";
  currentQuestionIndex.value = 0;
};


const leaveGame = () => {
  console.log("Leave Game clicked");
};


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
      <img v-for="(full, index) in lifeArray" :key="index"
        :src="full ? 'src/assets/Icons/heart_full.jpg' : 'src/assets/Icons/heart_empty.jpg'" class="heart-icon" />
    </div>

    <div class="story-container">
      <div v-if="isGameOver" class="game-over-screen">
        <div class="game-over-hearts">
          <img v-for="(index) in emptyLifeArray" :key="'empty-' + index" :src="heartEmpty" class="heart-icon" />
        </div>
        <h1 class="pixel-font game-over-text">GAME OVER</h1>
        <button @click="resetGame" class="pixel-font game-over-button" style="margin: 10px;">
          Try Again
        </button>
        <button @click="leaveGame" class="pixel-font game-over-button" style="margin: 10px;">
          Leave Game
        </button>
      </div>


      <!-- Normal Story Content -->
      <div v-if="!isGameOver">
        <div v-if="feedbackMessage" class="feedback-message">
          {{ feedbackMessage }}
        </div>

        <div v-if="currentNode?.questionId" class="question-box">
          <!-- Falls es eine Uml Frage ist -->
          <div class="question-text pixel-font" v-if="currentNode?.questionId && textFinished"></div>
          <UmlTemplate v-if="textFinished" :currentIndex="currentQuestionIndex" @correct-answer="handleCorrectAnswer"
            @update-lives="answerQuestion" />



        </div>

        <div v-if="!isQuestionLoaded" class="text-box">
          <h2 class="pixel-font">{{ displayedText }}</h2>
          <button v-if="!textFinished" @click="skipText" class="pixel-font story-button">
            Skip
          </button>

          <!-- Falls es normale Story-Entscheidungen gibt -->
          <div v-if="textFinished && currentNode?.choices">
            <button v-for="choice in currentNode.choices" :key="choice.nextId" @click="makeChoice(choice.nextId)"
              class="pixel-font story-button">
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
        <button @click="continueStory" style="margin-right: 1rem;">Continue</button>
        <button @click="goBackToMenu">Exit</button>
      </div>
    </div>
    <App v-if="showMenu" />
  </div>
  <div v-if="showEndscreen" class="game-over-screen">
    <h1 class="pixel-font game-over-text">
      <h1 v-if="currentNode?.id === 'goodEnding'" class="pixel-font game-over-text">
        GOOD ENDING
      </h1>
      <h1 v-else-if="currentNode?.id === 'badEnding'" class="pixel-font game-over-text">
        BAD ENDING
      </h1>

    </h1>

    <p class="pixel-font" style="font-size: 24px; color: white;">
      Lives used: {{ livesUsed }}
    </p>

    <p class="pixel-font" style="font-size: 24px; color: white;">
      Score: {{ store.state.score }}
    </p>

    <p class="pixel-font" style="font-size: 24px; color: white;">
      Rewards: {{ store.state.rewards }}
    </p>

    <button @click="resetGame" class="pixel-font game-over-button" style="margin: 10px;">
      Play Again
    </button>

    <button @click="leaveGame" class="pixel-font game-over-button" style="margin: 10px;">
      Leave Game
    </button>
  </div>


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
  top: -420px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;

  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 10;
  overflow: auto;
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

.feedback-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 1000;
  color: white;
  background-color: rgba(255, 99, 71, 0.9);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.feedback-message.right {
  background-color: rgba(144, 238, 144, 0.9);
}

.game-over-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  flex-direction: column;
  text-align: center;
}

.game-over-screen::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  filter: blur(8px);
  z-index: -1;
}

.game-over-text {
  font-size: 100px;
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
}

.game-over-button {
  font-size: 30px;
  padding: 15px 30px;
  background-color: #ff5733;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.game-over-button:hover {
  background-color: #c74d26;
  transform: scale(1.1);
}

.game-over-hearts {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
