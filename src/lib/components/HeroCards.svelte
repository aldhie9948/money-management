<script lang="ts">
  import currencyFormatter from "$lib/currencyFormatter.js";
  import { getTransactions } from "$lib/service/transaction.js";
  import { currentTransactions } from "$lib/store.js";
  import type { ITransactions } from "$lib/types.js";
  import { onMount } from "svelte";
  import { backOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  let transactions: ITransactions[] = [];
  let income: ITransactions[] = [];
  let outcome: ITransactions[] = [];
  let deposit = tweenedStore(0);
  let incomeReduce = tweenedStore(0);
  let outcomeReduce = tweenedStore(0);

  function tweenedStore(value: number) {
    return tweened(value, { duration: 400, easing: backOut });
  }

  onMount(async () => {
    transactions = await getTransactions();
  });

  $: {
    income = transactions.filter((item) => item.status === "income");
    $incomeReduce = income.reduce((a, b) => a + b.nominal, 0);
    outcome = transactions.filter((item) => item.status === "outcome");
    $outcomeReduce = outcome.reduce((a, b) => a + b.nominal, 0);
    $deposit = $incomeReduce - $outcomeReduce;
  }
  $: $currentTransactions,
    getTransactions()
      .then((data) => (transactions = data))
      .catch((err) => (transactions = []));
</script>

<div class="grid grid-cols-2 gap-3 mb-2">
  <div
    class="col-span-2 bg-gradient-to-bl from-blue-500/80 to-blue-500/30 rounded-lg p-5"
  >
    <div class="flex gap-2 items-center">
      <iconify-icon icon="solar:wallet-money-bold-duotone" class="text-xl" />
      <h1 class="font-semibold">Deposit</h1>
    </div>
    <hr class="hr" />
    <h1 class="text-2xl font-bold">
      {currencyFormatter($deposit)}
    </h1>
  </div>
  <div
    class="bg-gradient-to-bl from-green-500/80 to-green-500/30 rounded-lg p-5"
  >
    <div class="flex gap-2 items-center">
      <iconify-icon icon="fluent-mdl2:money" class="text-xl" />
      <h1 class="font-semibold">Income</h1>
    </div>
    <hr class="hr" />
    <h1 class="text-base font-bold">
      {currencyFormatter($incomeReduce)}
    </h1>
  </div>
  <div class="bg-gradient-to-bl from-red-500/80 to-red-500/30 rounded-lg p-5">
    <div class="flex gap-2 items-center">
      <iconify-icon icon="fluent-mdl2:money" class="text-xl" />
      <h1 class="font-semibold">Outcome</h1>
    </div>
    <hr class="hr" />
    <h1 class="text-base font-bold">
      {currencyFormatter($outcomeReduce)}
    </h1>
  </div>
</div>

<style lang="scss">
  .hr {
    @apply opacity-50 dark:bg-slate-300 dark:border-slate-300  bg-slate-900 border-slate-900 mb-3 mt-2;
  }
</style>
