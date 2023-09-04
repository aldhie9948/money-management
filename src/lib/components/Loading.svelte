<script lang="ts">
  export let className: string = "";
  export let width: number | string = "1rem";
</script>

<div class="grid place-content-center {className}">
  <iconify-icon icon="gg:spinner" class="animate-spin" {width} />
</div>
