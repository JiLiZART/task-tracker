<template>
  <div class="card card-outline-secondary widget-team">
    <div class="card-header widget-team__header">
      <h5 class="card-title widget-team__title">My Team</h5>

      <ul class="nav nav-pills card-header-pills widget-team__pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/team-load">View Team Workload</router-link>
        </li>
      </ul>
    </div>
    <div class="card-block" v-if="members && members.length">
      <template v-for="(item, index) in members">
        <span class="widget-team__member">
          <router-link :to="{ name: 'member', params: { id: item._id }}">
            <avatar :item="item"></avatar>
          </router-link>
        </span>
      </template>
    </div>
    <div class="card-block" v-else>
      <div class="card">
        <div class="card-block">
          <p class="card-text">There are no teammates.</p>
          <router-link class="btn btn-primary" to="/invite-teammates">Invite Teammates</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar';

  export default {
    name: 'widget-team',
    props: {
      members: {
        type: Array
      }
    },
    components: {Avatar}
  }
</script>

<style lang="scss">
  .widget-team {
    &__header {
      display: flex;
      align-items: center;
    }

    &__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    &__pills {
      margin-left: auto;
    }

    &__member {
      margin-right: 1rem;
    }
  }
</style>
