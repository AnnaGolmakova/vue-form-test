<script setup lang="ts">
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Checkbox from "../components/Checkbox.vue";
import TextArea from "../components/TextArea.vue";
import DatePicker from "../components/DatePicker.vue";
import RadioGroup from "../components/RadioGroup.vue";
import Tabs from "../components/Tabs.vue";

import { useId } from "vue";

const uniqueId = useId();
</script>

<template>
  <div class="container">
    <h1>Создание промокода</h1>
    <Tabs
      selected="first"
      :values="[
        { label: 'Шаг 1: Основное', value: 'first' },
        { label: 'Шаг 2: Настройки промокода', value: 'second' },
      ]"
      @select="(id: string | number) => console.log(id)"
    />

    <form>
      <!-- First step fields -->
      <fieldset class="step first" hidden>
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
      <fieldset class="step second">
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
          name="send"
          :values="[
            { label: 'Создать промокод без отправки', value: 'keep' },
            { label: 'Отправить промокод всем пользователям', value: 'send' },
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
  margin-top: 20px;
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
