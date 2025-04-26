/**
 * This file contains all needed REST-Methods
 */
import axios from "axios";
import type { AxiosResponse } from "axios";

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

