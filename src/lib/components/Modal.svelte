<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let show: boolean = false;
  export let header: string = "Modal Head";
  export function toggleModal() {
    show = !show;
  }
  const dispatch = createEventDispatcher();
  function onConfirm() {
    dispatch("confirm");
  }
</script>

{#if show}
  <div transition:fade class="fixed inset-0 z-[9999]">
    <!-- Modal Background Container -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="bg-black/70 absolute inset-0 -z-10" />
    <!-- Modal -->
    <div
      class="grid place-content-center place-items-center h-full text-slate-800 z-10"
    >
      <div class="bg-slate-50 rounded-lg shadow-lg max-w-[90vw] min-w-[80vw]">
        <!-- Modal Head -->
        <div
          class="px-5 py-3 flex gap-2 items-center bg-slate-200 rounded-t-lg"
        >
          <h1 class="flex-grow font-semibold">{header}</h1>
          <button on:click={toggleModal} class="grid place-content-center">
            <iconify-icon icon="typcn:times" class="text-2xl text-red-500" />
          </button>
        </div>
        <!-- Modal Body -->
        <div class="p-5">
          <slot />
        </div>
        <!-- Modal Footer -->
        <div class="grid grid-cols-2 gap-2 py-5 px-5 border-t-2">
          <button on:click={toggleModal} class="btn-cancel">Cancel</button>
          <button on:click={onConfirm} class="btn-confirm">Okay</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .btn-cancel {
    @apply bg-slate-300 rounded duration-200 py-1.5 enabled:hover:bg-slate-300 enabled:active:ring-4 enabled:active:ring-slate-200 enabled:focus:ring-4 enabled:focus:ring-slate-200 enabled:active:scale-90 disabled:grayscale px-5;
  }

  .btn-confirm {
    @apply bg-blue-700 text-slate-100 rounded duration-200 py-1.5 enabled:hover:bg-blue-800 enabled:active:ring-4 enabled:active:ring-blue-300 enabled:focus:ring-4 enabled:focus:ring-blue-300 enabled:active:scale-90 disabled:grayscale px-5;
  }
</style>
