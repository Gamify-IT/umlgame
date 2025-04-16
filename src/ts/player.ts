import { reactive } from "vue";

export interface Player {
    lp: number;
  }

  export const PlayerStats = reactive({
    lp: 6,
    maxLp: 6,
});
    