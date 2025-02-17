<script setup lang="ts">
import { ref, computed, } from "vue";
import { storyData } from "../ts/story";
import { dummyQuestions } from "../ts/Questions/dummyQuestions";
import { PlayerStats } from "../ts/player";
import UmlTemplate from "../components/UmlTemplate.vue";

const scene = ref("forest");
const currentNodeId = ref("start");


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
      

      <div v-if="currentNode?.questionId" class="question-box">
    <!-- Falls es eine Uml Frage ist -->
      <UmlTemplate
          v-if="currentNode?.questionId === '2'" 
          :questionId="currentNode.questionId" 
          @answer="answerQuestion"
        />

      <!-- Falls eine Frage vorhanden ist -->
      <div v-else-if="currentQuestion">
        <h3>{{ currentQuestion.text }}</h3>
        <button
          v-for="choice in currentQuestion.choices"
          :key="choice.text"
          @click="answerQuestion(choice.correct)"
        >
          {{ choice.text }}
        </button>
      </div>

    </div>
    <div class="text-box">
        <h2>{{ currentNode?.text }}</h2>

        <!-- Falls es normale Story-Entscheidungen gibt -->
        <div v-if="currentNode?.choices">
          <button v-for="choice in currentNode.choices" :key="choice.nextId" @click="makeChoice(choice.nextId)">
            {{ choice.text }}
          </button>
        </div>
      </div>
      </div>
    </div>
 
</template>


<style scoped>

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



</style>
