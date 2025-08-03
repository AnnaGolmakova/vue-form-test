<script setup lang="ts">
import { useTemplateRef, defineExpose } from "vue";

const modalRef = useTemplateRef("modal");

function open() {
  modalRef.value?.showModal();
}

function close() {
  modalRef.value?.close();
}

defineExpose({ open });
</script>

<template>
  <dialog ref="modal">
    <button class="close" @click="close">
      <span class="visually-hidden">Закрыть</span>
    </button>
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog {
  border: none;
  border-radius: 16px;
  background-color: var(--default-background);
  padding: 24px;
  max-width: 516px;
}
dialog::backdrop {
  background-color: var(--overlay);
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  appearance: none;
  border: none;
  background: center no-repeat url("../assets/close-icon.svg");
  width: 24px;
  height: 24px;
}
.visually-hidden {
  position: absolute;
  clip-path: inset(100%);
  margin: -1px;
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
