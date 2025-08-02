<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { useId } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  invalid?: boolean;
  invalidText?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

const {
  invalid = false,
  invalidText,
  label,
  name,
  placeholder,
  required = false,
} = defineProps<Props>();

const uniqueId = useId();
</script>

<template>
  <div class="input-container">
    <label :for="uniqueId">
      {{ label }}<span class="required" v-if="required">*</span>
    </label>
    <input
      :class="{ error: invalid }"
      :id="uniqueId"
      :name="name"
      :placeholder="placeholder"
      v-bind="$attrs"
    />
    <div class="error-text" v-if="invalidText">{{ invalidText }}</div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
}
label {
  padding-bottom: 8px;
  color: var(--text-primary);
}
input {
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  background-color: var(--input-background);
  padding: 12px 12px;
  height: 44px;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
}
input::placeholder {
  color: var(--text-secondary);
}
.required {
  color: var(--danger);
}
.error-text {
  padding-top: 4px;
  color: var(--danger);
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.error {
  border: 1px solid var(--danger);
}
</style>
