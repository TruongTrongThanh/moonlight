<template>
  <div class="panel">
    <div class="panel-header" :style="`background-color: ${color}`"><slot name="header"></slot></div>
    <div class="panel-content" :style="`grid-template-columns: ${templateCol}; grid-row-gap: ${rowGap}; grid-column-gap: ${colGap}; padding: ${padding}`"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: ['color', 'rowGap', 'colGap', 'padding', 'templateCol']
}
</script>

<style lang="scss" scoped>
  .panel > div:first-child {
    text-align: left;
    font-size: 22px;

    padding: 5px;
  }

  .panel > div:last-child {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 20px;

    padding: 14px;
  }

  .panel {
    background-color: #363636;
  }
  
</style>
