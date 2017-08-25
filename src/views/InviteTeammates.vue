<template>
  <div class="invite-teammates">
    <div class="invite-teammates__container">
      <div class="invite-teammates__inner cover">
        <h1 class="cover-heading">Invite Your Teammates.</h1>
      </div>

      <div class="invite-teammates__body">
        <invite-teammates-form submit-route="/create-project"></invite-teammates-form>
        <router-link class="btn btn-lg btn-link btn-block" to="/create-project">Skip this step</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import InviteTeammatesForm from '@/containers/InviteTeammatesForm'

  export default {
    name: 'invite-teammates-view',
    components: {InviteTeammatesForm},
  }
</script>

<style lang="scss">
  .invite-teammates {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100%;

    &__container {
      max-width: 42rem;
      width: 100%;
      margin: 0 auto;
      padding: 1rem;
    }

    &__inner {
      text-align: center;
    }

    &__body {
      max-width: 330px;
      width: 100%;
      margin: 0 auto;
    }

    &__input {
      margin-bottom: 10px;
    }
  }
</style>
