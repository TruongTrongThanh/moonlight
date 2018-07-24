<template>
  <div class="panel">
    <div class="panel-header" :style="`background-color: ${color}; padding: ${paddingHeader}`">
      <slot name="header"></slot>
    </div>
    <div class="panel-content" :style="`grid-template-columns: ${templateCol}; grid-row-gap: ${rowGap}; grid-column-gap: ${colGap}; padding: ${paddingContent}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: ['color', 'rowGap', 'colGap', 'paddingHeader', 'paddingContent', 'templateCol']
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Patua+One');

.panel > div:first-child {
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 22px;
  font-family: 'Patua One', cursive;

  padding: 10px 7px 10px 7px;
}

.panel > div:last-child {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 20px;

  padding: 20px 27px 27px 27px;
}

.panel {
  background-color: #363636;
  margin-bottom: 40px;
}
</style>
