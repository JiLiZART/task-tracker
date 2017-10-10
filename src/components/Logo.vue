<template>
    <span class="logo">
        <img src="../assets/logo.svg" :alt="title" class="logo__image">
    </span>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      title: {type: String}
    }
  }
</script>

<style lang="scss" >
  .logo {
    display: block;
    max-width: 68px;
    max-height: 68px;

    &__image {
      min-width: 100%;
    }
  }
</style>
