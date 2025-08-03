<script setup lang="ts">
import { useTemplateRef, ref } from "vue";

interface Props {
  label: string;
  name: string;
}

const { label, name } = defineProps<Props>();

const dateInput = useTemplateRef("date-input");
const timeInput = useTemplateRef("time-input");

function openCalendar() {
  try {
    dateInput.value?.showPicker();
  } catch {}
}

function openTime() {
  try {
    timeInput.value?.showPicker();
  } catch {}
}
</script>

<template>
  <div class="container">
    <div class="caption">{{ label }}</div>
    <div class="fields">
      <label class="field date" @click="openCalendar">
        <span class="date-label">Дата</span>
        <input type="date" ref="date-input" :name="name + '-date'" />
      </label>
      <label class="field time" @click="openTime">
        <input type="time" ref="time-input" :name="name + '-time'" />
      </label>
    </div>
  </div>
</template>

<style scoped>
input {
  right: 0;
  bottom: 0;
  left: 0;
  border: none;
  background-color: transparent;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
}
input:focus {
  outline: none;
  border: none;
}
input[type="time"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}
.caption {
  padding-bottom: 6px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}
.fields {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.field {
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 12px;
  background-color: var(--input-background);
  height: 44px;
}
.date {
  width: 140px;
}
.date::before {
  display: block;
  position: absolute;
  top: 10px;
  left: 12px;
  background: url("../assets/calendar-icon.svg") center center no-repeat;
  width: 24px;
  height: 24px;
  content: " ";
}
.date-label {
  padding: 4px 12px 0px 44px;
  color: var(--text-tertiary);
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-family: inherit;
}
.date input {
  box-sizing: border-box;
  padding: 0 12px 6px 44px;
}
.time {
  justify-content: center;
  width: 80px;
}
.time input {
  padding: 12px;
}
</style>
