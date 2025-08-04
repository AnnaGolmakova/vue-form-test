<script setup lang="ts">
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Checkbox from "../components/Checkbox.vue";
import TextArea from "../components/TextArea.vue";
import DatePicker from "../components/DatePicker.vue";
import RadioGroup from "../components/RadioGroup.vue";
import Tabs from "../components/Tabs.vue";

import { useId, ref, onMounted, onBeforeUnmount } from "vue";

import { promocodeSchema } from "../schema/promocode";

const uniqueId = useId();
const currentStep = ref(1);
const totalSteps = 2;

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
    history.pushState(
      { step: currentStep.value },
      `Шаг ${currentStep.value}`,
      `?step=${currentStep.value}`,
    );
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    history.replaceState(
      { step: currentStep.value },
      `Шаг ${currentStep.value}`,
      `?step=${currentStep.value}`,
    );
  }
}

function handleTabSelection(id: number) {
  if (currentStep.value < id) {
    nextStep();
  } else {
    prevStep();
  }
}

function handlePopState(event: PopStateEvent) {
  if (event.state && event.state.step) {
    currentStep.value = event.state.step;
  } else {
    currentStep.value = 1;
  }
}

onMounted(() => {
  window.addEventListener("popstate", handlePopState);
  history.replaceState({ step: 1 }, `Шаг 1`, `?step=1`);
});

onBeforeUnmount(() => {
  window.removeEventListener("popstate", handlePopState);
});
</script>

<template>
  <div class="container">
    <h1>Создание промокода</h1>
    <Tabs
      :selected="currentStep"
      :values="[
        { label: 'Шаг 1: Основное', value: 1 },
        { label: 'Шаг 2: Настройки промокода', value: 2 },
      ]"
      @select="(id: number) => handleTabSelection(id)"
    />

    <form>
      <!-- First step fields -->
      <fieldset class="step first" v-if="currentStep === 1">
        <Input
          label="Название промокода"
          placeholder="Введи название"
          name="name"
          maxlength="30"
          required
        />
        <Input
          label="Заголовок"
          placeholder="Введи заголовок"
          name="title"
          maxlength="120"
          required
        />
        <TextArea
          label="Сопроводительный текст"
          placeholder="Например: «Ты попал в число счастливчиков! Дарим 300 баллов»"
          name="description"
          :maxlength="250"
        />
        <Input
          label="Укажи количество баллов"
          placeholder="100"
          name="amount"
          type="number"
          required
        />
      </fieldset>

      <!-- Second step fields -->
      <fieldset class="step second" v-if="currentStep === 2">
        <fieldset class="calendar" :aria-labelledby="uniqueId + '-h2'">
          <h2 :id="uniqueId + '-h2'">
            Срок действия промокода<span class="required">*</span>
          </h2>
          <div class="dates">
            <DatePicker label="Дата начала" name="start" />
            <DatePicker label="Дата конца" name="end" />
          </div>
          <Checkbox label="Без даты конца" name="isUnlimited" />
        </fieldset>
        <hr />
        <Input
          label="Введите лимит активаций (шт.)"
          placeholder="1000"
          name="limit"
          type="number"
          required
        />
        <RadioGroup
          label="Настроить получение промокода"
          name="sendToUsers"
          :default-value="false"
          :values="[
            { label: 'Создать промокод без отправки', value: false },
            { label: 'Отправить промокод всем пользователям', value: true },
          ]"
        />
      </fieldset>

      <div class="actions">
        <Button label="Отмена" type="reset" />
        <Button label="Далее" type="submit" primary />
      </div>
    </form>
  </div>
</template>

<style scoped>
fieldset {
  border: none;
  padding: 0;
}
hr {
  margin: 0;
  border: none;
  background-color: rgba(235, 235, 240, 1);
  width: 100%;
  height: 1px;
}
h1 {
  margin: 0 0 16px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
}
h2 {
  margin: 0 0 12px 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}
.step {
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 0;
}
.first {
  gap: 16px;
}
.second {
  gap: 20px;
}
.dates {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 8px;
}
.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}
.required {
  color: var(--danger);
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}
</style>
