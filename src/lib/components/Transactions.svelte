<script lang="ts">
  import currencyFormatter from "$lib/currencyFormatter.js";
  import { getTransactions } from "$lib/service/transaction.js";
  import { currentMenu, currentTransactions } from "$lib/store.js";
  import axios from "axios";
  import moment from "moment";
  import { onMount } from "svelte";
  import MenuTab from "./MenuTab.svelte";
  let layout: HTMLElement;
  let start: string = moment().startOf("week").format("YYYY-MM-DD");
  let end: string = moment().endOf("week").format("YYYY-MM-DD");

  async function deleteTransaction(idTransaction: number) {
    try {
      const isConfirm = confirm("Are you sure?");
      if (!isConfirm) return;
      const params = new URLSearchParams({ id: idTransaction.toString() });
      await axios.delete("/api/transaction?" + params.toString());
      $currentTransactions = await getTransactions($currentMenu);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  onMount(() => {
    if (layout) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 0;
      const windowHeight = window.innerHeight;
      layout.style.height =
        windowHeight - (layout.offsetTop + navHeight + 10) + "px";
    }
  });

  $: getTransactions($currentMenu, start, end)
    .then((data) => ($currentTransactions = data))
    .catch((err) => ($currentTransactions = []));
</script>

<MenuTab />

<main bind:this={layout} class="py-2 overflow-y-auto">
  <div class="grid grid-cols-2 gap-2 mb-2">
    <input
      type="date"
      class="bg-gradient-to-tr dark:from-slate-700/50 from-slate-300/50 dark:to-slate-700 to-slate-300 rounded p-2"
      bind:value={start}
    />
    <input
      type="date"
      class="bg-gradient-to-tr dark:from-slate-700/50 from-slate-300/50 dark:to-slate-700 to-slate-300 rounded p-2"
      bind:value={end}
    />
  </div>
  {#if $currentTransactions.length < 1}
    <div class="flex gap-2 items-center justify-center h-1/2">
      <iconify-icon icon="akar-icons:info-fill" />
      <h1>There is no transaction here</h1>
    </div>
  {:else}
    {#each $currentTransactions as item}
      <div
        class="bg-gradient-to-bl from-slate-400/50 to-slate-400/10 dark:from-slate-600/50 dark:to-slate-600 mb-2 p-3 rounded flex gap-2 items-center"
      >
        {#if item.status === "income"}
          <iconify-icon
            icon="ph:chart-line-up-bold"
            class="text-green-400"
            width="1.3rem"
          />
        {:else if item.status === "outcome"}
          <iconify-icon
            icon="ph:chart-line-down-bold"
            class="text-red-400"
            width="1.3rem"
          />
        {/if}
        <div class="flex-grow">
          <h1 class="font-semibold">
            {item.name.replace(/\b\w/g, (letter) => letter.toUpperCase())}
          </h1>
          <small class="block"
            >{moment.utc(item.createdAt).format("DD/MM/YYYY HH:mm")}</small
          >
        </div>
        <h1 class="font-bold">{currencyFormatter(item.nominal)}</h1>
        <button
          on:click={() => {
            deleteTransaction(item.id);
          }}
          title="Delete transaction"
          class="ml-1 duration-200 text-red-600 hover:text-red-500 active:text-red-700"
        >
          <iconify-icon icon="zondicons:minus-solid" width="1rem" />
        </button>
      </div>
    {/each}
  {/if}
</main>
