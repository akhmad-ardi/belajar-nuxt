<script lang="ts" setup>
import { Task } from "~/utils/types";

definePageMeta({
  layout: "authenticated",
  middleware: "auth",
});

const user = await useUser();
const tasks = await useTasks();

async function handleUpdate(id: string) {
  const res = await useFetch(`/api/task/${id}`, { method: "PATCH" });

  if (res.data.value?.statusCode === 201) {
    const resGetTask = await useFetch("/api/task", {
      method: "GET",
      credentials: "include",
    });

    tasks.value = resGetTask.data.value?.data as Task[];
  }
}

async function handleDelete(id: string) {
  const res = await useFetch(`/api/task/${id}`, { method: "DELETE" });

  if (res.data.value?.statusCode === 201) {
    const resGetTask = await useFetch("/api/task", {
      method: "GET",
      credentials: "include",
    });

    tasks.value = resGetTask.data.value?.data as Task[];
  }
}
</script>

<template>
  <main class="container-fluid relative">
    <section class="bg-home min-h-[40vh] bg-cover bg-center opacity-50" />

    <section
      class="w-5/6 lg:w-2/4 bg-slate-400 opacity-100 py-8 pl-12 pr-6 lg:px-12 rounded-lg absolute top-24 right-[25%]"
    >
      <h1 class="text-center text-4xl mb-3">Hello {{ user.username }}</h1>

      <InputTask />

      <h3 v-if="tasks.length === 0" class="text-center text-3xl my-8">
        Nothing Task
      </h3>

      <ul class="divide-y mx-1 lg:mx-10">
        <li
          v-for="(task, index) in tasks"
          :key="index"
          class="py-3 flex justify-between"
        >
          <span class="text-2xl" :class="task.finished && 'line-through'">{{
            task.task
          }}</span>
          <div class="flex gap-1">
            <button
              class="btn btn-sm py-0 px-1"
              :class="task.finished ? 'btn-error' : 'btn-success'"
              @click="handleUpdate(task._id)"
            >
              <svg
                v-if="task.finished"
                class="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>

              <svg
                v-else
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              class="btn btn-error btn-sm py-0 px-1"
              @click="handleDelete(task._id)"
            >
              <svg
                class="h-6 w-6 text-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
