<script lang="ts">
  import { toggleDarkMode } from "$lib/themes.js";
  import { isDarkMode } from "$lib/store.js";
  import { fade } from "svelte/transition";
  import AddTransaction from "./AddTransaction.svelte";

  let addTransaction: AddTransaction;
</script>

<nav
  class="fixed bottom-0 left-0 right-0 px-5 py-5 dark:bg-slate-900 bg-slate-50 grid grid-cols-5 place-items-center"
>
  <a href="/" class="item-layout">
    <iconify-icon icon="bx:home" width="1.2rem" height="1.2rem" />
    <small>Home</small>
  </a>
  <button class="item-layout" on:click={toggleDarkMode}>
    {#if $isDarkMode}
      <iconify-icon
        in:fade
        icon="entypo:light-up"
        class="text-yellow-200"
        width="1.2rem"
      />
      <small>Light</small>
    {:else}
      <iconify-icon
        in:fade
        icon="icon-park-solid:dark-mode"
        width="1.2rem"
        height="1.2rem"
      />
      <small>Dark</small>
    {/if}
  </button>
  <button on:click={addTransaction.toggleModal} class="item-layout">
    <iconify-icon icon="mdi:add-bold" width="1.2rem" height="1.2rem" />
    <small>New</small>
  </button>
  <a class="item-layout" href="/logout">
    <iconify-icon icon="ph:sign-out" width="1.2rem" height="1.2rem" />
    <small>Logout</small>
  </a>
  <a class="item-layout" href="/setting">
    <iconify-icon icon="codicon:three-bars" width="1.2rem" height="1.2rem" />
    <small>Setting</small>
  </a>
</nav>

<AddTransaction bind:this={addTransaction} />

<style lang="scss">
  .item-layout {
    @apply grid place-content-center place-items-center hover:opacity-70;
  }
</style>
