<script setup lang="ts">
import { useId } from "vue";

interface Props {
  selected: string;
  values: TabItemType[];
}

type TabItemType = {
  label: string;
  value: string;
};

const { selected, values } = defineProps<Props>();
const uniqueId = useId();
</script>

<template>
  <div role="tablist" class="container">
    <button
      role="tab"
      v-for="item in values"
      :key="item.value"
      :aria-selected="item.value === selected"
      :disabled="item.value === selected"
      :class="{ active: item.value === selected }"
      :id="uniqueId + '-' + item.value"
      @click="$emit('select', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  box-shadow: inset 0 -1px rgba(229, 229, 234, 1);
}
button {
  border: none;
  background: transparent;
  min-height: 34px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}
button:not(:disabled) {
  cursor: pointer;
}
.active {
  border-bottom: 2px solid var(--accent);
  color: var(--accent);
  font-weight: 600;
}
</style>
