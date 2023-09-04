<script lang="ts">
  import { isDarkMode } from "$lib/store.js";
  import { toggleDarkMode } from "$lib/themes.js";
  import axios, { AxiosError } from "axios";
  let username: string;
  let password: string;

  $: console.log($isDarkMode);

  async function submit() {
    try {
      const {
        data: { message },
      } = await (<Promise<{ data: { message: string } }>>(
        axios.post("/api/auth", { username, password })
      ));
      if (message) window.location.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
    }
  }
</script>

<div class="flex flex-col justify-center items-center h-screen px-10">
  <div
    class="flex gap-2 items-center mb-10 dark:text-blue-300 text-blue-600 drop-shadow"
  >
    <iconify-icon icon="grommet-icons:money" width="4rem" />
    <h1 class="text-lg font-bold">Money Tracker</h1>
  </div>
  <div class="flex gap-2 items-center">
    <h1 class="font-medium">Light</h1>
    <button
      on:click={() => toggleDarkMode()}
      class="dark:bg-slate-200 bg-slate-600 w-12 text-slate-200 dark:text-slate-900 rounded-full flex items-center duration-200 p-1"
      class:justifyEnd={$isDarkMode}
    >
      <iconify-icon
        icon="entypo:light-up"
        class:hide={$isDarkMode}
        class="text-yellow-200"
      />
      <iconify-icon
        icon="icon-park-solid:dark-mode"
        class:hide={!$isDarkMode}
        class="text-slate-800"
      />
    </button>
    <h1 class="font-medium">Dark</h1>
  </div>
  <form class="w-full" on:submit|preventDefault={submit}>
    <div class="mb-5">
      <small>Username</small>
      <input
        bind:value={username}
        type="text"
        class="border-b dark:border-b-slate-300 border-b-slate-700 duration-200 py-2"
        required
        placeholder="Type your username"
      />
    </div>
    <div class="mb-5">
      <small>Password</small>
      <input
        bind:value={password}
        type="password"
        class="border-b dark:border-b-slate-300 border-b-slate-700 duration-200 py-2"
        required
        placeholder="Type your password"
      />
    </div>
    <button class="btn">Sign in</button>
  </form>
</div>

<style lang="scss">
  .hide {
    @apply hidden;
  }

  .justifyEnd {
    @apply justify-end;
  }
</style>
