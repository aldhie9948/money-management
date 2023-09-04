<script lang="ts">
  import { isDarkMode } from "$lib/store.js";
  import { toggleDarkMode } from "$lib/themes.js";
  import { fade } from "svelte/transition";
</script>

<header class="flex gap-2 items-center mb-10">
  <iconify-icon icon="grommet-icons:money" class="text-lg" />
  <h1 class="flex-grow font-bold">Money Tracker</h1>
  <button title="Toggle Dark Mode" on:click={toggleDarkMode}>
    {#if $isDarkMode}
      <iconify-icon
        in:fade
        icon="entypo:light-up"
        class="text-yellow-200 text-lg"
      />
    {:else}
      <iconify-icon in:fade icon="icon-park-solid:dark-mode" class="text-lg" />
    {/if}
  </button>
</header>
