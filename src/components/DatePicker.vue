<template>
  <el-date-picker
    v-model="editableValue"
    type="datetime"
    class="date-picker"
    :placeholder="placeholder"
    @input="onChange"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    value: { type: String },
    placeholder: { type: String }
  },

  data() {
    return {
      editableValue: this.value
    };
  },

  methods: {
    onChange(e) {
      this.$emit("change", e);
    }
  }
};
</script>

<style lang="scss">
.date-picker {
  .el-input__inner {
    height: 38px;
  }
}
</style>
