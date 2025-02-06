import { reactive } from "vue";

export interface Player {
    lp: number;
  }

  export const PlayerStats = reactive({
    lp: 3,
});
    