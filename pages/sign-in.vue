<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const statusCode = ref<number>(0);
const messageError = ref<string>("");

const email = ref<string>("");
const password = ref<string>("");

async function handleSubmit() {
  const res = await useFetch("/api/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { email, password },
  });

  statusCode.value = (res.data.value?.statusCode as number) || 0;
  messageError.value = (res.data.value?.message as string) || "";

  if (res.data.value?.statusCode === 200) return navigateTo("/");
}
</script>

<template>
  <main class="pt-[7%]">
    <div class="card w-96 bg-neutral text-neutral-content mx-auto shadow-xl">
      <form
        @submit.prevent="handleSubmit"
        class="card-body items-center text-center"
      >
        <h1 class="card-title text-3xl">Sign In</h1>

        <div class="form-control w-full max-w-xs">
          <div v-if="statusCode >= 400" class="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="capitalize">{{ messageError }}</span>
          </div>

          <label class="label">
            <span class="label-text text-white">E-mail</span>
          </label>
          <input
            type="text"
            placeholder="E-mail"
            v-model="email"
            class="input input-bordered w-full max-w-xs text-black"
          />

          <label class="label mt-2">
            <span class="label-text text-white">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="input input-bordered w-full max-w-xs text-black"
          />
        </div>

        <div class="card-actions justify-end mt-5">
          <button type="submit" class="btn btn-primary">sign in</button>
          <NuxtLink to="/sign-up" class="btn btn-ghost">sign up</NuxtLink>
        </div>
      </form>
    </div>
  </main>
</template>
