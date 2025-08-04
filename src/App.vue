<script setup lang="ts">
import { ref } from "vue";
import Button from "./components/Button.vue";
import Modal from "./components/Modal.vue";
import CreatePromocodeForm from "./forms/CreatePromocodeForm.vue";

const modalRef = ref();
</script>

<template>
  <Button label="Создать промокод" primary @click="modalRef.open()" />
  <Modal ref="modalRef">
    <Suspense>
      <CreatePromocodeForm />
    </Suspense>
  </Modal>
</template>

<style>
body {
  display: grid;
  place-items: center;
  margin: 0;
  min-width: 100vw;
  min-height: 100vh;
}
#app {
  display: contents;
}
</style>
