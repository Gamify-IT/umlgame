<script setup lang="ts">
import { ref, computed, } from "vue";
import { storyData } from "../ts/story";
import { dummyQuestions } from "../ts/Questions/dummyQuestions";
import { PlayerStats } from "../ts/player";

const scene = ref("forest");
const currentNodeId = ref("start");

// Funktion zum Finden eines Story-Knotens
const currentNode = computed(() => storyData.find((node) => node.id === currentNodeId.value));

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

function answerQuestion  (isCorrect: boolean)  {
if (isCorrect && currentNode.value?.nextIdAfterQuestion){
  makeChoice(currentNode.value.nextIdAfterQuestion);
} else {
  PlayerStats.lp -= 1;
  console.log(`Lebenspunkte: ${PlayerStats.lp}`);
}
}
</script>

<template>
  <div :class="sceneBackground" class="background">
    <div class="story-container">
      <div class="text-box">
      <h2>{{ currentNode?.text }}</h2>

    

      <!-- Falls eine Frage vorhanden ist -->
      <div v-if="currentQuestion">
        <h3>{{ currentQuestion.text }}</h3>
        <button
          v-for="choice in currentQuestion.choices"
          :key="choice.text"
          @click="answerQuestion(choice.correct)"
        >
          {{ choice.text }}
        </button>
      </div>

      <!-- Falls es normale Story-Entscheidungen gibt -->
      <div v-else-if="currentNode?.choices" >
        <div >
        <button v-for="choice in currentNode.choices" :key="choice.nextId" @click="makeChoice(choice.nextId)">
          {{ choice.text }}
        </button>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; 
  height: 100%;
}

.story-container {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
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
  
}



</style>
