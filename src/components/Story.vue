<script setup lang="ts">
import { ref, computed } from "vue";
import { storyData } from "../ts/story";
import type { StoryNode } from "../ts/story";
import { dummyQuestions } from "../ts/Questions/dummyQuestions";


const currentNodeId = ref("start");

// Funktion zum Finden eines Story-Knotens
const currentNode = computed(() => storyData.find((node) => node.id === currentNodeId.value));

const makeChoice = (nextId: string) => {
  currentNodeId.value = nextId;
};

const currentQuestion = computed(() => 
  dummyQuestions.find((q) => q.id === currentNode.value?.questionId)
);

function answerQuestion(){}
</script>

<template>
  <div class="story-container">
    <h2>{{ currentNode?.text }}</h2>

    <!-- Falls eine Frage vorhanden ist -->
    <div v-if="currentQuestion">
      <h3>{{ currentQuestion.text }}</h3>
      <button
        v-for="choice in currentQuestion.choices"
        :key="choice.text"
        @click="answerQuestion()"
      >
        {{ choice.text }}
      </button>
    </div>

    <!-- Falls es normale Story-Entscheidungen gibt -->
    <div v-else-if="currentNode?.choices">
      <button v-for="choice in currentNode.choices" :key="choice.nextId" @click="makeChoice(choice.nextId)">
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>


<style scoped>

</style>
