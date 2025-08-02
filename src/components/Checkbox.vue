<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label: string;
  name: string;
}

const { label, name } = defineProps<Props>();
</script>

<template>
  <label>
    <input type="checkbox" :name="name" v-bind="$attrs" />
    {{ label }}
  </label>
</template>
