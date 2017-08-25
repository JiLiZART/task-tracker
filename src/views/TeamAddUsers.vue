<template>
  <div class="container">
    <div class="card add-users">
      <div class="card-body">
        <h4 class="card-title">Add users to your team.</h4>
      </div>
      <div class="card-body">
        <div class="add-users__body">
          <invite-teammates-form submit-route="/team"></invite-teammates-form>
          <router-link class="btn btn-lg btn-link btn-block" to="/team">Back to my team</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InviteTeammatesForm from '@/containers/InviteTeammatesForm'

  export default {
    name: 'team-add-users-view',
    components: {InviteTeammatesForm},
  }
</script>

<style lang="scss">
  .add-users {

    &__body {
      max-width: 330px;
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
