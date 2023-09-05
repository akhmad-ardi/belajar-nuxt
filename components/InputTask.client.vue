<script lang="ts" setup>
import { Task } from "~/utils/types";

const task = ref<string>("");
const tasks = await useTasks();

async function handleSubmit(e: Event) {
  const resPostTask = await useFetch("/api/task", {
    method: "POST",
    body: { task: task.value },
    credentials: "include",
  });

  if (resPostTask.data.value?.statusCode === 201) {
    const resGetTask = await useFetch("/api/task", {
      method: "GET",
      credentials: "include",
    });

    tasks.value = resGetTask.data.value?.data as Task[];
  }

  task.value = "";
}
</script>

<template>
  <form @submit.prevent="(e) => handleSubmit(e)" class="flex justify-center">
    <div class="form-control w-full max-w-xs">
      <input
        type="text"
        v-model="task"
        placeholder="Input Task"
        class="input input-bordered w-full max-w-xs text-black"
      />
    </div>

    <button type="submit" class="btn btn-success ml-1">
      <svg
        class="h-8 w-8 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
  </form>
</template>
