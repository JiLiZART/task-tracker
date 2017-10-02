<template>
  <div class="card card-outline-secondary empty">
    <div class="card-body">
      <p class="card-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Empty',
    props: {
      text: {type: String}
    }
  }
</script>

<style lang="scss" scoped>
  .empty {
    background: transparent;
  }
</style>
