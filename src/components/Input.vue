<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { useId } from "vue";
import { useField } from "vee-validate";

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
const { value, errorMessage } = useField(() => name);
</script>

<template>
  <div class="input-container">
    <label :for="uniqueId">
      {{ label }}<span class="required" v-if="required">*</span>
    </label>
    <div class="wrapper" :class="{ error: invalid || errorMessage }">
      <slot></slot>
      <input
        :id="uniqueId"
        :name="name"
        :placeholder="placeholder"
        v-bind="$attrs"
        v-model="value"
      />
    </div>
    <div class="error-text" v-if="invalidText || errorMessage">
      {{ invalidText || errorMessage }}
    </div>
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
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}
input {
  flex-grow: 1;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  padding: 12px 0px;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
}
input::placeholder {
  color: var(--text-secondary);
}
input:focus {
  outline: none;
}
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background-color: var(--input-background);
  padding: 0px 12px;
  height: 44px;
}
.wrapper:has(input:focus) {
  outline: 2px solid var(--accent);
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
