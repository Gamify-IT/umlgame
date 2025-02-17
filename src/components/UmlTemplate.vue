<script setup lang="ts">
import { dia, shapes } from '@joint/core';
import { onMounted, ref, defineProps } from "vue"

const namespace = shapes;

const graph = new dia.Graph({}, { cellNamespace: namespace });

const paper = new dia.Paper({
    el: document.getElementById('paper'),
    model: graph,
    width: 300,
    height: 300,
    background: { color: '#F5F5F5' },
    cellViewNamespace: namespace
});

const props = defineProps<{ questionId: string }>();
</script>

<template>
    <div id="paper" style="width: 500px; height: 500px; border: 1px solid black;"></div>
  </template>