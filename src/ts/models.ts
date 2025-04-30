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
    `{"cells":[{"type":"Rect","attrs":{"line2":{"y1":40,"y2":40},"label":{"text":"1","y":12},"secondaryLabel":{"text":"1","y":32.5},"thirdLabel":{"text":"1","y":47.5}},"position":{"x":299,"y":101},"size":{"width":100,"height":60},"angle":0,"id":"791a1b07-3acc-487e-b7fc-db0cfa034310","z":1},{"type":"InterfaceRect","attrs":{"line2":{"y1":40,"y2":40},"label":{"text":"3","y":12},"secondaryLabel":{"text":"3","y":32.5},"thirdLabel":{"text":"3","y":47.5}},"position":{"x":473,"y":266},"size":{"width":100,"height":60},"angle":0,"id":"6fc8b957-ed64-46ba-b1d7-659a611c43ec","z":2},{"type":"AbstractRect","attrs":{"line2":{"y1":40,"y2":40},"label":{"text":"5","y":12},"secondaryLabel":{"text":"5","y":32.5},"thirdLabel":{"text":"5","y":47.5}},"position":{"x":267,"y":424},"size":{"width":100,"height":60},"angle":0,"id":"9ab8069d-cbf2-4733-9a66-2447d7a0328e","z":3},{"type":"standard.Link","attrs":{"line":{"stroke":"black","targetMarker":{"fill":"white","stroke":"black"},"strokeDasharray":"5,5"}},"source":{"id":"791a1b07-3acc-487e-b7fc-db0cfa034310"},"target":{"id":"6fc8b957-ed64-46ba-b1d7-659a611c43ec"},"id":"5a896509-a0e7-4971-9da6-3cbcda15c6c6","z":4,"labels":[{"attrs":{"text":{"fill":"black","fontSize":12,"text":"2"}},"position":{"distance":0.2,"offset":{"x":0,"y":-15},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":12,"text":"2"}},"position":{"distance":0.2,"offset":{"x":0,"y":10},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":12,"text":"2"}},"position":{"distance":0.8,"offset":{"x":0,"y":-15},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":12,"text":"2"}},"position":{"distance":0.8,"offset":{"x":0,"y":10},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":14,"text":"2"}},"position":{"distance":0.5,"offset":{"x":0,"y":10},"args":{"keepDirection":true,"keepAngle":true}}}]},{"type":"standard.Link","attrs":{"line":{"stroke":"black"}},"source":{"id":"6fc8b957-ed64-46ba-b1d7-659a611c43ec"},"target":{"id":"9ab8069d-cbf2-4733-9a66-2447d7a0328e"},"id":"66422734-6add-4895-890a-3fbda92da9b0","z":5,"labels":[{"attrs":{"text":{"fill":"black","fontSize":12,"text":"4"}},"position":{"distance":0.2,"offset":{"x":0,"y":-15},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":12,"text":"4"}},"position":{"distance":0.2,"offset":{"x":0,"y":10},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":12,"text":"4"}},"position":{"distance":0.8,"offset":{"x":0,"y":-15},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":12,"text":"4"}},"position":{"distance":0.8,"offset":{"x":0,"y":10},"args":{"keepDirection":true,"keepAngle":true}}},{"attrs":{"text":{"fill":"black","fontSize":14,"text":"4"}},"position":{"distance":0.5,"offset":{"x":0,"y":10},"args":{"keepDirection":true,"keepAngle":true}}}]}]}`
    ,
    "Beschreibung für Task 1",
    "typeA"
  ),
  new UmlTask(
    "task2",
    `{"cells":[{"type":"Rect","attrs":{"line2":{"y1":40,"y2":40},"label":{"text":"eins","y":12},"secondaryLabel":{"text":"zwei","y":32.5},"thirdLabel":{"text":"drei","y":47.5}},"position":{"x":357,"y":164},"size":{"width":100,"height":60},"angle":0,"id":"70ea1a39-e702-4ba2-937e-828c34f95e0c","z":1},{"type":"InterfaceRect","attrs":{"line2":{"y1":40,"y2":40},"label":{"text":"vier","y":12},"secondaryLabel":{"text":"fünf","y":32.5},"thirdLabel":{"text":"sechs","y":47.5}},"position":{"x":133,"y":240},"size":{"width":100,"height":60},"angle":0,"id":"fa2684e4-ed23-4757-b730-9950b72f97a6","z":2}]}`
    ,
    "Beschreibung für Task 2",
    "typeB"
  ),
  new UmlTask(
    "task3",
    `{"cells":[{"type":"Rect","attrs":{"line2":{"y1":40,"y2":40},"label":{"text":"Cat","y":12},"secondaryLabel":{"text":"+ age:int","y":32.5},"thirdLabel":{"text":"- bark()","y":47.5}},"position":{"x":235.99998474121094,"y":276.4666748046875},"size":{"width":100,"height":60},"angle":0,"id":"task3","z":1}]}`
    ,
    "Beschreibung für Task 3",
    "typeC"
  )
];

export const dummyConfig = new Config("config123", dummyUmlTasks, 50);

console.log(JSON.stringify(dummyConfig, null, 2));
