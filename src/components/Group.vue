<template>
  <div class="card group" :class="classObject">
    <div class="group__body" v-if="isExpanded">
      <div class="group__header">
        <div class="group__title">{{title}}</div>
        <div class="group__actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <div class="group__content">
        <slot name="content"></slot>
      </div>
    </div>

    <entity-row v-if="!isExpanded" @click:title="toggleExpanded">
      <template slot="icon" >
        <slot name="icon"></slot>
      </template>
      <template slot="title">
        {{title}}
      </template>
      <template slot="actions">
        <slot name="row-meta"></slot>
      </template>
    </entity-row>

    <button class="btn btn-link group__expander" @click="toggleExpanded">
      <i class="fa fa-angle-double-up" v-if="isExpanded"></i>
      <i class="fa fa-angle-double-down" v-else></i>
    </button>
  </div>
</template>

<script>
  import Author from './Author';
  import EntityRow from './EntityRow';

  export default {
    name: 'group',
    props: ['user', 'title'],
    components: {Author, EntityRow},

    data() {
      return {
        isExpanded: false
      }
    },

    methods: {
      toggleExpanded() {
        this.isExpanded = !this.isExpanded;
      }
    },

    computed: {
      classObject() {
        return {
          'group_expanded': this.isExpanded
        }
      }
    }
  }
</script>

<style lang="scss">
  .group {
    position: relative;
    border-radius: 6px;
    background: hsl(188, 48%, 90%);

    &_expanded {
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
      border-radius: 7px;
      padding: 1rem;
      margin: -1rem;
      border: none;
    }

    &__expander {
      padding: 0.5rem;
      font-size: 1rem;
      position: absolute;
      top: 0;
      right: 0;
      height: 50px;
      color: #818a91;
      background: hsl(188, 48%, 90%);
      cursor: pointer;
      border-radius: 0 6px 6px 0;

      &:hover,
      &:focus {
        color: #818a91;
        background: hsl(188, 48%, 94%);
      }
    }

    &_expanded &__expander {
      background: hsl(183, 61%, 94%);

      &:hover {
        background: hsl(183, 58%, 94%);
      }
    }

    &__header {
      background: hsl(183, 61%, 94%);
      border-radius: 6px 6px 0 0;
      padding: 0.5rem 2rem 0.5rem 1rem;
      height: 50px;
      display: flex;
      align-items: center;
    }

    &_expanded &__header {
      margin: -1rem -1rem 0;
    }

    &__header &__actions {
      margin-left: auto;
    }

    &__content {
      margin-top: 1rem;
    }
  }
</style>
