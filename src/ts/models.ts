
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
  umlTasks: UmlTask[];
}

export class Config implements IConfig {
  umlTasks: UmlTask[];

  public constructor(umlTasks: UmlTask[]) {
    this.umlTasks = umlTasks;
  }
}


