<script setup lang="ts">
import {dia, shapes, util} from '@joint/core';
import { onMounted, ref, defineProps, nextTick, watch } from "vue";

const namespace = shapes;
const graph = new dia.Graph({}, { cellNamespace: namespace });
const paperContainer = ref<HTMLElement | null>(null);
const paletteContainer = ref<HTMLElement | null>(null);
const props = defineProps<{ questionId: string }>();
const selectedElement = ref<dia.Element | null>(null);
const labelText = ref('');
const stuff = ref('');
const deleteButtonPos = ref<{ x: number; y: number } | null>(null);

class custRect extends shapes.standard.Rectangle {
  defaults() {
    return {
      ...super.defaults,
      type: 'Rect',
      size: {
        width: 80,
        height: 40
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
          fontSize: 14,
          x: 'calc(w/2)',
          y: 'calc(h/2)'
        },
        secondaryLabel: {
          text: '2nd',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          fontSize: 14,
          x: 'calc(w/2)',
          y: 'calc(h/1.25)'
        }
      }
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
             <rect @selector='body' />
             <text @selector='label' />
             <text @selector='secondaryLabel' />
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

      // Property editor to change the text
      paper.on('element:pointerclick', (elementView) => {
        selectedElement.value = elementView.model;
        labelText.value = elementView.model.attr('label/text') || '';
        const bbox = elementView.getBBox();
        deleteButtonPos.value = {
          x: bbox.x + bbox.width,
          y: bbox.y - 10
        };
      });

      watch(selectedElement, (el) => {
        if (el) {
          labelText.value = el.attr('label/text') || '';
        }
      });

      // Enable dragging elements from palette to the graph
      if (paletteContainer.value) {
        paletteContainer.value.querySelectorAll('.palette-item').forEach((item) => {
          item.addEventListener('dragstart', (event) => {
            (event as DragEvent).dataTransfer?.setData('type', item.getAttribute('data-type') || '');
          });
        });
      }

      // Handle dropping elements onto the paper
      paperContainer.value.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      paperContainer.value.addEventListener('drop', (event) => {
        event.preventDefault();
        const type = (event as DragEvent).dataTransfer?.getData('type');

        if (type) {
          const position = paper.pageToLocalPoint({ x: event.clientX, y: event.clientY });

          let element;
          if (type === 'rectangle') {
            element = new custRect();
          } else if (type === 'circle') {
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
        <div class="palette-item" data-type="rectangle" draggable="true">Rectangle</div>
        <div class="palette-item" data-type="circle" draggable="true">Circle</div>
      </div>
      <div ref="paperContainer" class="paper-container"></div>
      <div class="right" v-if="selectedElement">
        <button class="delete-button" @click="deleteSelectedElement">
          Delete Object
        </button>
        <label class="label">
          Text:
          <input type="text" v-model="labelText" @input="updateLabel" />
        </label>
        <label class="label">
          Text 2:
          <input type="text" v-model="stuff" @input="doStuff" />
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

</style>
