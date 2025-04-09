<script setup lang="ts">
import { dia, shapes, util } from '@joint/core';
import { onMounted, ref, defineProps, nextTick, watch } from "vue";
import { BFormInput, BFormTextarea } from "bootstrap-vue-3";

const namespace = shapes;
const graph = new dia.Graph({}, { cellNamespace: namespace });
const paperContainer = ref<HTMLElement | null>(null);
const paletteContainer = ref<HTMLElement | null>(null);
const props = defineProps<{ questionId: string }>();
const selectedElement = ref<dia.Element | null>(null);
const labelText = ref('');
const stuff = ref('');
const stuff2 = ref('');
const deleteButtonPos = ref<{ x: number; y: number } | null>(null);
let currentLinkType = ref<'dependency' | 'association' | 'aggregation' | 'composition' | 'generalization' | null>(null);
type LinkType = "dependency" | "association" | "aggregation" | "composition" | "generalization";

function isLinkType(type: string): type is LinkType {
  return ["dependency", "association", "aggregation", "composition", "generalization"].includes(type);
}


let linkSourceElement: dia.Element | null = null;
let link: dia.Link | null = null;
let isDependencyMode = ref(false);

class custRect extends shapes.standard.Rectangle {
  defaults() {
    return {
      ...super.defaults,
      type: 'Rect',
      size: {
        width: 100,
        height: 80
      },
      attrs: {
        body: {
          width: 'calc(w)',
          height: 'calc(h)',
          fill: 'white',
          strokeWidth: 2,
          stroke: 'black'
        },
        label: {
          text: '1st',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          fontSize: 12,
          x: 'calc(w/3)',
          y: 'calc(h/3)'
        },
        secondaryLabel: {
          text: '2nd',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          fontSize: 12,
          x: 'calc(w/3)',  // no clue how to choose these values, but trial and error worked it out
          y: 'calc(h/2)'
        },
        thirdLabel: {
          text: '3rd',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          fontSize: 12,
          x: 'calc(w/3)',
          y: 'calc(h/1.5)'
        }
      }
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
             <rect @selector='body' />
             <text @selector='label' />
             <text @selector='secondaryLabel' />
             <text @selector='thirdLabel' />
         `;
  }
}

function updateLabel() {
  if (selectedElement.value) {
    selectedElement.value.attr('label/text', labelText.value);
  }
}

function deleteSelectedElement() {
  if (selectedElement.value) {
    selectedElement.value.remove();
    selectedElement.value = null;
    deleteButtonPos.value = null;
  }
}

function doStuff() {
  if (selectedElement.value) {
    selectedElement.value.attr('secondaryLabel/text', stuff.value);
  }
}

function doStuff2() {
  if (selectedElement.value) {
    selectedElement.value.attr('thirdLabel/text', stuff2.value);
  }
}

function handleElementClick(elementView: dia.ElementView) {
  const clickedElement = elementView.model;

  if (isDependencyMode.value && currentLinkType.value) {
    if (!linkSourceElement) {
      linkSourceElement = clickedElement;
      console.log("Start-Objekt ausgewählt:", clickedElement);
    } else {
      link = new shapes.standard.Link();
      link.source(linkSourceElement);
      link.target(clickedElement);

      link.attr({
        line: {
          strokeWidth: 2,
          stroke: 'black',
        }
      });

      switch (currentLinkType.value) {
        case 'dependency':
          link.attr('line/strokeDasharray', '5,5');
          link.attr('line/targetMarker', {
            type: 'path',
            d: 'M 10 -5 0 0 10 5 z',
            fill: 'white',
            stroke: 'black'
          });
          break;

        case 'association':
          link.attr('line/targetMarker', null);
          break;

        case 'aggregation':
          link.attr('line/targetMarker', {
            type: 'path',
            d: 'M 20 0 L 10 5 L 0 0 L 10 -5 Z',
            fill: 'white',
            stroke: 'black'
          });
          break;

        case 'composition':
          link.attr('line/targetMarker', {
            type: 'path',
            d: 'M 20 0 L 10 5 L 0 0 L 10 -5 Z',
            fill: 'black',
            stroke: 'black'
          });
          break;

        case 'generalization':
          link.attr('line/strokeDasharray', null);
          link.attr('line/targetMarker', {
            type: 'path',
            d: 'M 10 -5 0 0 10 5 z',
            fill: 'white',
            stroke: 'black'
          });
          break;
      }

      graph.addCell(link);

      isDependencyMode.value = false;
      currentLinkType.value = null;
      linkSourceElement = null;
      link = null;
    }
  } else {
    selectedElement.value = clickedElement;
    labelText.value = clickedElement.attr('label/text');
    stuff.value = clickedElement.attr('secondaryLabel/text');
    stuff2.value = clickedElement.attr('thirdLabel/text');
  }
}

function deleteAllRelations() {
  if (!selectedElement.value) return;

  const links = graph.getConnectedLinks(selectedElement.value as unknown as dia.Cell);

  links.forEach(link => {
    link.remove();
  });
}


onMounted(() => {
  nextTick(() => {
    if (paperContainer.value) {
      const paper = new dia.Paper({
        el: paperContainer.value,
        model: graph,
        width: 400,
        height: 400,
        background: { color: '#F5F5F5' },
        cellViewNamespace: namespace
      });

      paper.on('element:pointerclick', (elementView) => {
        handleElementClick(elementView);
      });

      if (paletteContainer.value) {
        paletteContainer.value.querySelectorAll('.palette-item').forEach((item) => {
          item.addEventListener('dragstart', (event) => {
            (event as DragEvent).dataTransfer?.setData('type', item.getAttribute('data-type') || '');
          });
        });
      }

      paperContainer.value.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      paperContainer.value.addEventListener('drop', (event) => {
        event.preventDefault();
        const rawType = (event as DragEvent).dataTransfer?.getData('type') ?? '';
        const position = paper.pageToLocalPoint({ x: event.clientX, y: event.clientY });

        const elementViews = paper.findViewsFromPoint(position);
        const targetElement = elementViews.find(view => view.model.isElement());

        if (isLinkType(rawType)) {
          if (targetElement) {
            linkSourceElement = targetElement.model;
            isDependencyMode.value = true;
            currentLinkType.value = rawType;
            console.log(`Relation '${rawType}' gestartet mit`, linkSourceElement);
          } else {
            console.log(`Relation '${rawType}' gezogen, aber kein Startobjekt getroffen.`);
          }
        } else {
          let element;
          if (rawType === 'rectangle') {
            element = new custRect({ position });
          } else if (rawType === 'circle') {
            element = new shapes.standard.Circle({
              position,
              size: { width: 50, height: 50 },
              attrs: { label: { text: 'Circle' } }
            });
          }

          if (element) {
            graph.addCell(element);
          }
        }
      });
    }
  });
});

</script>

<template>
  <div class="uml-wrapper" style="position: relative">
    <div class="uml-container">
      <div ref="paletteContainer" class="palette">

        <div class="palette-group">
          <div class="palette-title">Objects</div>
          <div class="palette-item" data-type="rectangle" draggable="true">Rectangle</div>
          <div class="palette-item" data-type="circle" draggable="true">Circle</div>
        </div>

        <div class="palette-group">
          <div class="palette-title">Relations</div>
          <div class="palette-item" data-type="dependency" draggable="true">⇢ </div>
          <div class="palette-item" data-type="association" draggable="true">→</div>
          <div class="palette-item" data-type="aggregation" draggable="true">◇</div>
          <div class="palette-item" data-type="composition" draggable="true">◆</div>
          <div class="palette-item" data-type="generalization" draggable="true">△</div>
        </div>
      </div>
      <div ref="paperContainer" class="paper-container"></div>
      <div class="right" v-if="selectedElement">
        <b-button size="sm" variant="warning" @click="deleteAllRelations">
          Delete All Relations
        </b-button>

        <b-button size="sm" variant="danger" @click="deleteSelectedElement">
          Delete Object
        </b-button>
        <b-label class="label">
          Classname:
          <b-form-input v-model="labelText" @input="updateLabel" />
        </b-label>
        <label class="label">
          Attributes:
          <b-form-textarea v-model="stuff" @input="doStuff" />
        </label>
        <label class="label">
          Methods:
          <b-form-textarea v-model="stuff2" @input="doStuff2" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.uml-container {
  display: flex;
  gap: 20px;
}

.uml-wrapper {
  position: relative;
}

.palette {
  width: 150px;
  background: #ddd;
  padding: 10px;
  border-radius: 5px;
}

.palette-item {
  padding: 10px;
  margin-bottom: 5px;
  background: #fff;
  text-align: center;
  cursor: grab;
  border: 1px solid #aaa;
  color: black;
}

.palette-group {
  margin-bottom: 20px;
}

.palette-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
  text-transform: uppercase;
}


.paper-container {
  width: 400px;
  height: 400px;
  border: 2px solid #000;
  background: #f5f5f5;
}

.delete-button {
  background-color: rgb(208, 50, 50);
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 10px;
  margin-bottom: 10px;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.label {
  color: black;
}

.selected {
  stroke: #ff6600 !important;
  stroke-width: 3;
  filter: drop-shadow(0px 0px 5px rgba(255, 102, 0, 0.7));
}

.highlight {
  fill: rgba(255, 102, 0, 0.2) !important;
  stroke: #ff6600 !important;
  stroke-width: 3;
}

.highlight-hover {
  stroke: #ff6600;
  stroke-width: 2;
  fill: rgba(255, 102, 0, 0.1);
}
</style>
