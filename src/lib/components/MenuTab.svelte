<script lang="ts">
  import { currentMenu } from "$lib/store.js";
  const menus = ["All", "Income", "Outcome"];
  $currentMenu = menus[0];
</script>

<div class="grid grid-cols-3">
  {#each menus as menu}
    <button
      class:active={$currentMenu === menu}
      on:click={() => ($currentMenu = menu)}
      class="py-2 border-b-4 border-transparent font-semibold hover:border-slate-300 opacity-60 flex gap-2 items-center justify-center"
    >
      <iconify-icon icon="fluent:money-24-filled" class="text-lg" />
      <h1>{menu}</h1>
    </button>
  {/each}
</div>

<style lang="scss">
  .active {
    @apply border-slate-500 dark:border-slate-300 opacity-100;
  }
</style>
