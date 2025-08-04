<script setup lang="ts">
import type { TextareaHTMLAttributes } from "vue";
import { computed, useId } from "vue";
import { useField } from "vee-validate";

interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {
  invalid?: boolean;
  invalidText?: string;
  label: string;
  name: string;
  maxlength?: number;
  placeholder: string;
  required?: boolean;
}

const {
  invalid = false,
  invalidText,
  label,
  name,
  maxlength,
  placeholder,
  required = false,
} = defineProps<Props>();

const uniqueId = useId();

const { value, errorMessage } = useField<string>(() => name);

const symbolsCount = computed(() => {
  return value.value ? value.value.length : 0;
});
</script>

<template>
  <div class="container">
    <label :for="uniqueId">
      {{ label }}<span class="required" v-if="required">*</span>
    </label>
    <textarea
      :class="{ invalid: invalid || errorMessage }"
      :id="uniqueId"
      :name="name"
      :placeholder="placeholder"
      v-model="value"
      v-bind="$attrs"
    />
    <div class="info">
      <div class="description error" v-if="invalidText || errorMessage">
        {{ invalidText || errorMessage }}
      </div>
      <div
        class="counter"
        :class="{ error: symbolsCount > maxlength }"
        v-if="maxlength"
      >
        {{ symbolsCount }} / {{ maxlength }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
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
textarea {
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  background-color: var(--input-background);
  padding: 16px 12px;
  color: var(--text-primary);
  field-sizing: content;
  min-height: calc(3lh + 32px);
  max-height: calc(10lh + 32px);
  resize: vertical;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
}
textarea::placeholder {
  color: var(--text-secondary);
}
.invalid {
  border: 1px solid var(--danger);
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
.counter,
.description {
  padding-top: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.counter {
  flex-grow: 1;
  color: var(--text-tertiary);
  text-align: right;
}
.required,
.error {
  color: var(--danger);
}
</style>
