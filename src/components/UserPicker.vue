<template>
  <multiselect
    v-model="selectedItems"
    @input="selectMember"
    @tag="addTag"
    :placeholder="label"
    select-label=""
    tag-placeholder=""
    deselect-label=""
    class="user-picker"
    label="username"
    track-by="username"
    :options="members"
    :multiple="true"
    :max="max"
    :taggable="true"
    :clear-on-select="false">
    <template slot="maxElements">
      <span v-if="max === 1">Only one member can be selected</span>
    </template>
    <template slot="tag" scope="props">
      <author class="user-picker__tag" :item="props.option" :small="true" :haveLink="false" :haveName="true"></author>
    </template>
    <template slot="option" scope="props">
      <author class="user-picker__option" :item="props.option" :small="true" :haveLink="false"></author>
    </template>
  </multiselect>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import Author from '@/components/Author';

  export default {
    name: 'user-picker',

    props: {
      label: {
        type: String
      },

      selectedMembers: {},

      members: {
        type: Array
      },

      multiple: {type: Boolean}
    },

    components: {Multiselect, Author},

    data: function () {
      return {
        selectedItems: this.selectedMembers
      };
    },

    methods: {
      selectMember(values) {
        this.$emit('update:selected', this.selectedItems);
        this.$emit('change', values);
      },

      addTag(values) {
        console.log('add tag', values);
      }
    },

    computed: {
      max() {
        return this.multiple === true ? 300 : 1;
      }
    }
  }
</script>

<style lang="scss">
  @import "~vue-multiselect/dist/vue-multiselect.min.css";

  .user-picker {
    display: inline-block;
    max-width: 260px;
    min-height: 38px;

    .multiselect__tags {
      min-height: 38px;
      padding: 7px 40px 0 7px;
    }

    .multiselect__current {
      min-height: 38px;
    }

    .multiselect__option {
      max-width: 260px;
      min-height: 38px;
    }

    .multiselect__option:after {
      line-height: 38px;
    }

    .multiselect__option--highlight {
      color: #000;
      background: #fff;
    }

    .multiselect__option--selected {
      background: #fafafa;
    }
  }
</style>
