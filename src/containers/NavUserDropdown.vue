<script>
import Author from "@/components/Author";

export default {
  name: "NavUserDropdown",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    Author
  }
};
</script>

<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="user" text depressed v-bind="attrs" v-on="on">
        <Author :item="user" :haveLink="false" />
      </v-btn>
    </template>

    <v-list>
      <v-list-item to="/settings">
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$emit('logout')">
        <v-list-item-title>Sign out</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="$emit('clear')">
        <v-list-item-title>Clear sandbox</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
