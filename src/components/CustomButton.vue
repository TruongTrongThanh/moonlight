<template>
  <button :style="`
    background-color: ${color};
    width: ${width}; 
    height: ${height}; 
    border-radius: ${radius};
    font-size: ${fontSize};
    `">
     <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: ['color', 'width', 'height', 'radius', 'fontSize']
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Francois+One');

button {
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Francois One', sans-serif;
  font-size: 19px;
}
</style>
