<script lang="ts">
  import { addTransaction, getTransactions } from "$lib/service/transaction.js";
  import { currentMenu, currentTransactions } from "$lib/store.js";
  import type { ITransactionRequest } from "$lib/types.js";
  import moment from "moment";
  import Modal from "./Modal.svelte";

  let modal: Modal;
  let name: string;
  let nominal: number;
  let status: string | undefined;
  let createdAt = moment().format("YYYY-MM-DDTHH:mm");
  let form: HTMLFormElement;

  export function toggleModal() {
    modal.toggleModal();
    name = "";
    nominal = 0;
    status = undefined;
    createdAt = moment().format("YYYY-MM-DDTHH:mm");
  }

  async function onSubmit() {
    try {
      if (!status) throw new Error("Pick a status first");
      const data: ITransactionRequest = {
        name,
        nominal,
        status,
        createdAt: moment.utc(createdAt).format(),
      };
      await addTransaction(data);
      toggleModal();
      $currentTransactions = await getTransactions($currentMenu);
      alert("Transaction saved successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        alert(err.message);
      }
    }
  }
</script>

<!-- Modal -->
<Modal
  show={false}
  bind:this={modal}
  header="Add transaction"
  on:confirm={() => form.checkValidity() && onSubmit()}
>
  <h1 class="font-semibold mb-1">Status</h1>
  <div class="grid grid-cols-2 mb-2">
    <button
      on:click={() => (status = "income")}
      disabled={status === "income"}
      class="font-semibold bg-green-100 text-green-700 py-2 rounded-l-full duration-200 disabled:text-slate-100 disabled:bg-green-500 enabled:hover:bg-green-400 enabled:active:ring-4 enabled:ring-green-200 enabled:active:scale-90"
      >Income</button
    >
    <button
      on:click={() => (status = "outcome")}
      disabled={status === "outcome"}
      class="font-semibold bg-red-100 text-red-700 py-2 rounded-r-full duration-200 disabled:text-slate-100 disabled:bg-red-500 enabled:hover:bg-red-400 enabled:active:ring-4 enabled:ring-red-200 enabled:active:scale-90"
      >Outcome</button
    >
  </div>
  <form bind:this={form} on:submit={onSubmit}>
    <h1 class="font-semibold mb-1">Name</h1>
    <input
      required
      type="text"
      bind:value={name}
      class="border-2 border-slate-500 w-full p-2 mb-2"
      placeholder="type transaction's name.."
    />
    <h1 class="font-semibold mb-1">Price</h1>
    <div
      class="flex gap-2 items-center border-2 border-slate-500 w-full p-2 mb-2"
    >
      <h1 class="font-semibold">IDR</h1>
      <input
        required
        on:keypress={(e) => {
          const key = /[0-9]/gi.test(e.key);
          if (!key) e.preventDefault();
        }}
        on:input={(e) => {
          const value = e.currentTarget.value;
          if (/^0/g.test(value))
            e.currentTarget.value = value.replace(/^0/g, "");
        }}
        min="0"
        type="number"
        bind:value={nominal}
        placeholder="type transaction's price.."
        class="w-full"
      />
    </div>
    <h1 class="font-semibold mb-1">Date</h1>
    <input
      required
      type="datetime-local"
      class="border-2 border-slate-500 w-full p-2 mb-2"
      placeholder="choose transaction's date.."
      bind:value={createdAt}
    />
  </form>
</Modal>
