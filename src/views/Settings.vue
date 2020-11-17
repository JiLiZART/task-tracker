<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#">Profile</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="form-group row">
          <label for="first-name" class="col-lg-2 col-md-12 col-form-label"
            >First Name</label
          >
          <div class="col-lg-10 col-md-12">
            <input
              class="form-control"
              :value="firstName"
              @input.lazy="updateFirstName"
              id="first-name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="last-name" class="col-lg-2 col-md-12 col-form-label"
            >Last Name</label
          >
          <div class="col-lg-10 col-md-12">
            <input
              class="form-control"
              :value="lastName"
              @input.lazy="updateLastName"
              id="last-name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-lg-2 col-md-12 col-form-label"
            >Email</label
          >
          <div class="col-lg-10 col-md-12">
            <input
              class="form-control"
              type="email"
              :value="email"
              @input="updateEmail"
              value="How do I shoot web"
              id="email"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "settings-view",

  data() {
    const user = this.$store.getters.user || {};

    return {
      firstName: user.firstName || "",
      lastName: user.lastName,
      email: user.username
    };
  },

  methods: {
    updateFirstName(e) {
      this.updateUser({ firstName: e.target.value });
    },

    updateLastName(e) {
      this.updateUser({ lastName: e.target.value });
    },

    updateEmail(e) {
      this.updateUser({ username: e.target.value });
    },

    ...mapMutations(["updateUser"])
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
