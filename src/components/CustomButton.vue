<template>
  <button :style="`background-color: ${color}`"><slot></slot></button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: ['color']
}
</script>

<style>
button {
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>
