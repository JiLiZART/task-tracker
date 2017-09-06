<template>
  <router-link class="author" tabindex="0" :class="{'author_size_small': small}" :to="authorLink" v-if="haveLink">
    <el-tooltip
      effect="dark"
      placement="bottom-start"
      :content="authorName"
      :disabled="haveName"
    >
      <avatar :item="item" :small="small"></avatar>
    </el-tooltip>
    <span class="author__name" v-if="haveName">{{ authorName }}</span>
  </router-link>
  <div class="author" :class="{'author_size_small': small}" v-else>
    <el-tooltip
      effect="dark"
      placement="bottom-start"
      :content="authorName"
      :disabled="haveName"
    >
      <avatar :item="item" :small="small"></avatar>
    </el-tooltip>
    <span class="author__name" v-if="haveName">{{ authorName }}</span>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar';

  export default {
    name: 'author',
    props: {
      item: {type: Object},
      small: {type: Boolean, 'default': false},
      haveName: {type: Boolean, 'default': true},
      haveLink: {type: Boolean, 'default': true}
    },

    components: {Avatar},

    computed: {
      authorLink() {
        return {name: 'member', params: {id: this.item._id}};
      },

      authorName() {
        return this.firstName ? `${this.firstName} ${this.lastName}` : this.item.username;
      },

      firstName() {
        return this.item.firstName || '';
      },

      lastName() {
        return this.item.lastName || '';
      }
    }
  }
</script>

<style lang="scss">

  .author {
    display: inline-flex;
    align-items: center;
    border-radius: 50%;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, .14);
    }

    &__name {
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      padding: 0 5px;
    }

    &_size_small &__name {
      line-height: 22px;
    }
  }

</style>
