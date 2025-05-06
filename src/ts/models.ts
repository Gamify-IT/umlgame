/**
 * This file defines all the needed type-correct models
 */

export class UmlTask {
  id: string;
  graph: string;
  text: string;
  taskType: string;

  public constructor(
    id: string,
    graph: string,
    text: string,
    taskType: string,
  ) {
    this.id = id;
    this.graph = graph;
    this.text = text;
    this.taskType = taskType;
  }
}

export interface IConfig {
  id: string;
  umlTasks: UmlTask[];
}

export class Config implements IConfig {
  id: string;
  umlTasks: UmlTask[];
  volumeLevel: number; 


  public constructor(id: string, umlTasks: UmlTask[], volumeLevel: number) {
    this.id = id;
    this.umlTasks = umlTasks;
    this.volumeLevel = volumeLevel;

  }
}

const dummyUmlTasks: UmlTask[] = [
  new UmlTask(
    "task1",
    `{"cells":[{"type":"Rect","attrs":{},"position":{"x":365,"y":294.79998779296875},"size":{"width":100,"height":80},"angle":0,"id":"1c815b7a-4944-45f3-8103-29c0d1724ee4","z":1}]}`
    ,
    "Beschreibung für Task 1 Beschreibung für Task 1 Beschreibung für Task 1Beschreibung für Task 1Beschreibung für Task 1Beschreibung für Task 1 Beschreibung für Task 1 Beschreibung für Task 1 Beschreibung für Task 1Beschreibung für Task 1Beschreibung für Task 1Beschreibung für Task 1 ",
    "typeA"
  ),
  new UmlTask(
    "task2",
    `{"cells":[{"type":"Rect","attrs":{},"position":{"x":365,"y":294.79998779296875},"size":{"width":100,"height":80},"angle":0,"id":"1c815b7a-4944-45f3-8103-29c0d1724ee4","z":1}]}`
    ,
    "Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2,Beschreibung für Task 2",
    "typeB"
  ),
  new UmlTask(
    "task3",
    `{"cells":[{"type":"Rect","attrs":{},"position":{"x":365,"y":294.79998779296875},"size":{"width":100,"height":80},"angle":0,"id":"1c815b7a-4944-45f3-8103-29c0d1724ee4","z":1}]}`
    ,
    "Beschreibung für Task 3,Beschreibung für Task 3,Beschreibung für Task 3,Beschreibung für Task 3,Beschreibung für Task 3,Beschreibung für Task 3,Beschreibung für Task 3, Beschreibung für Task 3, Beschreibung für Task 3, Beschreibung für Task 3 ,Beschreibung für Task 3 ,Beschreibung für Task 3",
    "typeC"
  )
];

export const dummyConfig = new Config("config123", dummyUmlTasks, 50);

console.log(JSON.stringify(dummyConfig, null, 2));
