<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import NavBar from "$lib/components/NavBar.svelte";
  import "$lib/styles/global.css";
  import moment from "moment";
  import "moment/locale/id";

  moment.locale("id");
</script>

<main class="p-5">
  <Header />
  <slot />
  <NavBar />
</main>
