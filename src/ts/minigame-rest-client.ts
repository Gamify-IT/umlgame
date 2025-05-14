/**
 * This file contains all needed REST-Methods
 */
import axios from "axios";
import type { AxiosResponse } from "axios";
import { GameResultDTO } from '../ts/models';
import store from '../store';
import config from "../config";

/**
 * Fetches the umlTasks for a specific configuration ID.
 *
 * @param configId The unique configuration ID for the game setup.
 * @returns A promise that resolves to an AxiosResponse containing the questions.
 */
export function getUmlTasks(configId: string): Promise<AxiosResponse> {
  return axios.get(
    `${config.apiBaseUrl}/configurations` + configId
  );
}


/**
 * Fetches the volume level for a specific configuration ID.
 *
 * @param configId The unique configuration ID for the game setup.
 * @returns A promise that resolves to an AxiosResponse containing the volume level data.
 */
export function getVolumeLevel(configId: string): Promise<AxiosResponse> {
  return axios.get(
    `${config.apiBaseUrl}/configurations/{id}` + configId + "/volume"
  );
}

/**
 * Converts the raw data from the server response into a GameResultDTO object.
 *
 * @param dto The raw data object returned from the backend.
 * @returns A GameResultDTO object populated with the server response data.
 */
export function fromDTO(dto: any): GameResultDTO {
  return new GameResultDTO(
    dto.configurationAsUUID,
    dto.score,
    dto.rewards
  );
}

/**
 * Sends the game result to the backend server.
 *
 * @param gameResultDTO The data transfer object (DTO) containing the game result.
 * @returns A promise that resolves once the result has been successfully posted.
 */
export async function postGameResult(
  gameResultDTO: GameResultDTO
): Promise<void> {
  console.log("Sending GameResultDTO to backend:", gameResultDTO); // Log the data being sent
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}/results`,
      gameResultDTO
    );
    console.log("Received response from backend:", response.data); // Log the response from backend
    const returnedResult = fromDTO(response.data);
    store.commit("setScore", returnedResult.score);
    store.commit("setRewards", returnedResult.rewards);
  } catch (error) {
    console.error("Error sending GameResultDTO:", error); // Log any error
    throw error; // Rethrow the error to be handled by the caller
  }
}
