<template>
  <span class="logo" :class="{ logo_big: big }">
    <img src="../assets/logo.svg" :alt="title" class="logo__image" />
  </span>
</template>

<script>
export default {
  name: "Logo",
  props: {
    title: { type: String },
    big: { type: Boolean }
  }
};
</script>

<style lang="scss">
.logo {
  display: block;
  max-width: 68px;
  max-height: 68px;

  &__image {
    min-width: 100%;
  }

  &_big {
    max-width: 120px;
    max-height: 120px;
  }
}
</style>
