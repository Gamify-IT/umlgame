<script setup lang="ts">
import { ref } from 'vue'
import Story from './components/Story.vue'

const showMenu = ref(true);
const isFading = ref(false);
const showStory = ref(false);

function startGame() {
  isFading.value = true;

  setTimeout(() => {
    showMenu.value = false;
    showStory.value = true;
  }, 1000); 
  setTimeout(() => {
    isFading.value = false;
  }, 1800); 
}

function showHelp() {
  alert("Erklärung für uml Interface einbauen");
}

function leaveGame() {
  window.close() 
}
</script>

<template>
  <div class="fade-overlay" v-if="isFading"></div>
 
  <div class="menu-container" v-if="showMenu">
    <h1 class="game-title pixel-font">Retro Adventure</h1>
    <button class="menu-button pixel-font" @click="startGame">Play</button>
    <button class="menu-button pixel-font" @click="showHelp">Help</button>
    <button class="menu-button pixel-font" @click="leaveGame">Leave</button>
  </div>

  <Story v-if="showStory" />
</template>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  gap: 30px;
  padding: 20px;
}

.fade-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 9999;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-overlay.fade-out {
  animation: fadeOut 1s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeToBlack {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.game-title {
  font-size: 48px;
  margin-bottom: 60px;
  color: black;
  text-align: center;
}

.menu-button {
  width: 300px; 
  height: 70px; 
  background-color: white;
  color: black;
  border: 4px solid black;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;
}

.menu-button:hover {
  background-color: black;
  color: white;
}
</style>
