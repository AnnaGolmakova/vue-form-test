<script setup lang="ts">
import { ref, useTemplateRef, defineExpose } from "vue";

const modalRef = useTemplateRef("modal");
const isOpen = ref(false);

function open() {
  isOpen.value = true;
  modalRef.value?.showModal();
}

function close() {
  modalRef.value?.close();
}

function handleClose() {
  isOpen.value = false;
}

defineExpose({ open, close });
</script>

<template>
  <dialog ref="modal" @close="handleClose">
    <template v-if="isOpen">
      <button class="close" @click="close">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <slot></slot>
    </template>
  </dialog>
</template>

<style scoped>
dialog {
  box-sizing: border-box;
  border: none;
  border-radius: 16px;
  background-color: var(--default-background);
  padding: 24px;
  width: 100%;
  max-width: 516px;
}
@media (width < 540px) {
  dialog {
    margin: auto 16px;
    width: calc(100% - 16px * 2);
  }
}
@media (width < 375px) {
  dialog {
    margin: 0;
    border-radius: 0px;
    padding: 16px;
    width: 100%;
    min-height: 100vh;
  }
}
dialog::backdrop {
  background-color: var(--overlay);
}
dialog:focus {
  outline: none;
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
