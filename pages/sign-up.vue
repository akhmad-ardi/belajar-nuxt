<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const isLoading = ref<boolean>(false);
const statusCode = ref<number>(0);
const message = ref<string>("");

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

async function handleSubmit() {
  isLoading.value = true;

  statusCode.value = 0;
  message.value = "";

  const res = await useFetch("/api/sign-up", {
    method: "POST",
    body: { username, email, password, confirmPassword },
  });

  statusCode.value = (res.data.value?.statusCode as number) || 0;
  message.value = (res.data.value?.message as string) || "";

  isLoading.value = false;
}
</script>

<template>
  <main class="pt-[2%]">
    <div class="card w-96 bg-neutral text-neutral-content mx-auto shadow-xl">
      <form
        @submit.prevent="handleSubmit"
        class="card-body items-center text-center"
      >
        <h2 class="card-title text-3xl">Sign Up</h2>

        <div class="form-control w-full max-w-xs">
          <div
            v-if="statusCode"
            :class="statusCode < 400 ? 'alert-success' : 'alert-error'"
            class="alert"
          >
            <svg
              v-if="statusCode < 400"
              class="h-6 w-6 stroke-current shrink-0"
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
            <svg
              v-else
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
            <span class="capitalize"
              >{{ message }}.

              <span v-if="statusCode < 400">
                Please
                <NuxtLink to="/sign-in" class="underline font-bold"
                  >Sign In</NuxtLink
                >
              </span>
            </span>
          </div>

          <label class="label" for="username">
            <span class="label-text text-white">Username</span>
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Username"
            class="input input-bordered w-full max-w-xs text-black"
          />

          <label class="label" for="email">
            <span class="label-text text-white">E-mail</span>
          </label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="E-mail"
            class="input input-bordered w-full max-w-xs text-black"
          />

          <label class="label mt-2" for="password">
            <span class="label-text text-white">Password</span>
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            class="input input-bordered w-full max-w-xs text-black"
          />

          <label class="label mt-2" for="confirmPassword">
            <span class="label-text text-white">Confirm Password</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            class="input input-bordered w-full max-w-xs text-black"
          />
        </div>

        <div class="card-actions justify-end mt-5">
          <NuxtLink to="/sign-in" class="btn btn-ghost">sign in</NuxtLink>
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            sign up
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
