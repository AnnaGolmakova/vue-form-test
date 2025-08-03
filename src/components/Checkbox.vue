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
    <input
      class="visually-hidden"
      type="checkbox"
      :name="name"
      v-bind="$attrs"
    />
    {{ label }}
  </label>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}
label::before {
  display: block;
  box-sizing: border-box;
  border: 1px solid rgba(223, 222, 227, 1);
  border-radius: 4px;
  width: 20px;
  height: 20px;
  content: " ";
}
label:has(:checked)::before {
  border: 1px solid var(--accent);
  background:
    center/80% no-repeat url("../assets/check-icon.svg"),
    var(--accent);
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
