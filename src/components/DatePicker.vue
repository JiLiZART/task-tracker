<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="placeholder"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="onChange">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
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
      date: this.value,
      menu: false
    };
  },

  methods: {
    onChange() {
      this.$refs.menu.save(this.date);
      this.$emit("change", this.date);
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
