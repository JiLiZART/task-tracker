<template>
  <div class="group-list">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GroupList'
  }
</script>

<style lang="scss">
  .group-header {
    padding: 0 .25rem;
    margin-top: 1rem;
    margin-bottom: .5rem;
    display: flex;
    align-items: center;
  }

  .group-list {
    &__item {
      margin-bottom: .25rem;

      &.group_expanded {
        margin-bottom: 1rem;
        margin-top: 1rem;
      }
    }
  }
</style>
