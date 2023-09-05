<script lang="ts" setup>
import { Menu } from "~/utils/types";

const listMenu: Menu[] = [{ label: "Home", href: "/" }];

const isLoading = ref<boolean>(false);

const user = await useUser();
const tasks = await useTasks();

async function handleSignOut() {
  isLoading.value = true;
  if (confirm("Sign Out ?")) {
    const res = await useFetch("/api/sign-out", {
      method: "get",
      credentials: "include",
    });

    if ((res.data.value?.statusCode as number) >= 200) {
      user.value = { email: "", username: "" };
      tasks.value = [];
      return navigateTo("/sign-in");
    }
  }
  isLoading.value = false;
}
</script>

<template>
  <div class="navbar bg-slate-800">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li v-for="(menu, index) in listMenu" :key="index">
            <NuxtLink
              :to="menu.href"
              class="text-black hover:text-slate-700 focus:text-slate-700"
              >{{ menu.label }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl">Belajar Nuxt JS</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="(menu, index) in listMenu" :key="index">
          <NuxtLink :to="menu.href">Home</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <button class="btn" @click="handleSignOut" :disabled="isLoading">
        Sign Out
      </button>
    </div>
  </div>
</template>
