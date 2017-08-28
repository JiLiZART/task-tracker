<template>
  <span class="avatar" :class="{'avatar_size_small': small}">
    <gravatar :email="item.username" :alt="item.username" class="avatar__image rounded-circle"/>
  </span>
</template>

<script>
  import Gravatar from 'vue-gravatar';

  export default {
    name: 'avatar',
    props: ['small', 'item'],
    components: {Gravatar}
  }
</script>

<style lang="scss">
  .avatar {
    display: inline-flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &_placeholded {
      border: 1px dashed #ccc;
      border-radius: 50%;
    }

    &_size_small {
      width: 22px;
      height: 22px;
    }

    &__image {
      width: 100%;
      height: 100%;
    }
  }
</style>
