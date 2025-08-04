<script setup lang="ts">
import { useId } from "vue";
import { useField } from "vee-validate";

interface Props {
  label: string;
  name: string;
  defaultValue?: string | number | boolean;
  values: RadioItemType[];
}

type RadioItemType = {
  label: string;
  value: string | number | boolean;
};

const { label, name, defaultValue = "", values } = defineProps<Props>();
const uniqueId = useId();
const { value } = useField(() => name);
</script>

<template>
  <div
    class="container"
    role="radiogroup"
    :aria-labelledby="uniqueId + '-caption'"
  >
    <div class="caption" :id="uniqueId + '-caption'">{{ label }}</div>
    <div class="items">
      <div class="item" v-for="item in values" :key="item.value.toString()">
        <input
          :name="name"
          :id="uniqueId + '-' + item.value"
          :value="item.value"
          :checked="item.value === defaultValue"
          type="radio"
          class="visually-hidden"
          v-model="value"
        />
        <label :for="uniqueId + '-' + item.value">
          {{ item.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.caption {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}
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
  border-radius: 50%;
  width: 20px;
  height: 20px;
  content: " ";
}
.item:has(:checked) label::before {
  border: 5px solid var(--accent);
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
