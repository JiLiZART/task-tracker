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
      <div class="card-block">
        <div class="form-group row">
          <label for="first-name" class="col-2 col-form-label">First Name</label>
          <div class="col-10">
            <input class="form-control" type="text" :value="firstName" @input="updateFirstName" id="first-name">
          </div>
        </div>
        <div class="form-group row">
          <label for="last-name" class="col-2 col-form-label">Last Name</label>
          <div class="col-10">
            <input class="form-control" type="text" :value="lastName" @input="updateLastName" id="last-name">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-2 col-form-label">Email</label>
          <div class="col-10">
            <input class="form-control" type="email" :value="email" @input="updateEmail" value="How do I shoot web" id="email">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings-view',

    data() {
      const user = this.$store.state.user;

      return {
        firstName: user.firstName || '',
        lastName: user.lastName,
        email: user.username
      }
    },

    methods: {
      updateFirstName(e) {
        this.$store.commit('updateUser', {firstName: e.target.value})
      },

      updateLastName(e) {
        this.$store.commit('updateUser', {lastName: e.target.value})
      },

      updateEmail(e) {
        this.$store.commit('updateUser', {username: e.target.value})
      }
    },

    computed: {
      user() {
        return this.$store.state.user;
      },
    }
  }
</script>
