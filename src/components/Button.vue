<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  label: string;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
}

const { label, primary = false, type = "button" } = defineProps<Props>();
</script>

<template>
  <button :class="{ primary: primary }" :type="type" v-bind="$attrs">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  transition: border-color 0.25s;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: var(--button-default-bg);
  padding: 0.6em 1.2em;
  height: 40px;
  color: var(--button-default-text);
  font-weight: 500;
  font-size: 1em;
  font-family: inherit;
}
button:hover {
  background-color: oklch(from var(--button-default-bg) calc(l - 0.05) c h);
  color: oklch(from var(--button-default-text) calc(l - 0.05) c h);
}
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
.primary {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
}
.primary:hover {
  background-color: oklch(from var(--button-primary-bg) calc(l + 0.05) c h);
  color: oklch(from var(--button-primary-text) calc(l - 0.05) c h);
}
</style>
