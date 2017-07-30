<template>
  <router-link class="author" :class="{'author_size_small': small}" :to="{ name: 'member', params: { id: item._id }}">
    <span class="avatar" :class="{'avatar_size_small': small}">
            <img
              class="avatar__image rounded-circle"
              :src="item.avatar"
              :alt="item.username">
    </span>
    <span class="author__name" v-if="haveName">{{ item.username }}</span>
  </router-link>
</template>

<script>
  export default {
    name: 'author',
    props: {
      item: {
        type: Object
      },
      small: {
        type: Boolean,
        default: false
      },
      haveName: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss">

  .author {
    display: inline-flex;
    align-items: center;

    &__name {
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      padding: 0 5px;
    }
  }

</style>
