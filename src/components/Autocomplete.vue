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
    name: 'Autocomplete',
    props: {
      value: {type: String},
      placeholder: {type: String},
      querySearch: {type: Function}
    },

    data() {
      return {
        editableValue: this.value
      }
    },

    methods: {
      onEnter(e) {
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
