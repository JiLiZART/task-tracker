<template>
  <el-autocomplete
    class="autocomplete"
    v-model="editableValue"
    :fetch-suggestions="querySearch"
    :placeholder="placeholder"
    @select="onSelect"
    @change="onChange"
    @input="onChange"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.enter.native.prevent="onEnter"
  ></el-autocomplete>
</template>

<script>
  export default {
    name: 'autocomplete',
    props: ['placeholder', 'value', 'querySearch'],

    data() {
      return {
        editableValue: this.value
      }
    },

    methods: {
      onEnter(e) {
        console.log('autocompl.enter', e);
        this.$emit('submit', e)
      },

      onFocus(e) {
        this.$emit('focus', e)
      },

      onBlur(e) {
        this.$emit('blur', e)
      },

      onChange(e) {
        this.$emit('change', e)
      },

      onClick(e) {
        this.$emit('click', e)
      },

      onSelect(e) {
        this.$emit('select', e)
      }
    }
  }
</script>

<style lang="scss">
  .autocomplete {

  }
</style>
