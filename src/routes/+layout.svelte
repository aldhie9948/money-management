<script lang="ts">
  import "$lib/styles/global.css";
  import { initTheme } from "$lib/themes.js";
  import moment from "moment";
  import "moment/locale/id";
  import { onMount } from "svelte";

  moment.locale("id");

  onMount(initTheme);
</script>

<slot />
