<script setup>
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";

const todoList = [
  { title: "Add product", icon: "fluent:clipboard-note-16-regular", action: () => {} },
  { title: "Record orders", icon: "icon-park-solid:shopping-bag", action: () => {} },
  { title: "Add customer", icon: "fluent:person-28-filled", action: () => {} },
  { title: "Record expense", icon: "fluent:reciept-24-filled", action: () => {} },
];
</script>

<template>
  <div>
    <EmptyData class="py-0 mb-4" />

    <div>
      <h4 class="font-medium text-base mb-1">What would you like to start with?</h4>
      <ul class="border border-brand-200 rounded-2xl">
        <li
          v-for="(todo, v) in todoList"
          :key="v"
          class="flex gap-2 py-3 px-3 border-b border-brand-200 last:border-0"
        >
          <div class="flex items-center gap-2 flex-1">
            <span class="border border-brand-200 rounded-lg p-2 bg-white">
              <Icon :icon="todo.icon" class="text-lg text-brand-300" />
            </span>
            <p class="text-sm text-brand-400">{{ todo.title }}</p>
          </div>
          <AppButton small variant="tonal" @click="todo.action">
            <Icon icon="basil:add-solid" class="h-4 w-4" />
            Add
          </AppButton>
        </li>
      </ul>
    </div>
  </div>
</template>
