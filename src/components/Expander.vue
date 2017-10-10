<template>
  <button class="btn btn-link expander" @click="toggleExpanded" tabindex="-1">
    <i class="el-icon-arrow-up" v-if="expanded"></i>
    <i class="el-icon-arrow-down" v-else></i>
  </button>
</template>

<script>
  export default {
    name: 'Expander',

    props: {
      expanded: {type: Boolean, 'default': false}
    },

    methods: {
      toggleExpanded() {
        this.$emit('toggle')
      }
    }
  }
</script>

<style lang="scss" >
  .expander {
    padding: 0.5rem;
    font-size: 1rem;
    color: #818a91;
    cursor: pointer;

    &:hover, &:focus {
      color: #818a91;
      text-decoration: none;
    }
  }
</style>
