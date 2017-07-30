<template>
  <div class="card widget-team">
    <div class="card-header widget-team__header">
      <div class="widget-team__title">My Team</div>

      <ul class="nav nav-pills card-header-pills widget-team__pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/team-load">View Team Load</router-link>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <template v-for="(item, index) in members">
        <span class="widget-team__member">
            <router-link class="avatar" :to="{ name: 'member', params: { id: item._id }}">
                <img
                  class="avatar__image rounded-circle"
                  :src="item.avatar"
                  :alt="item.username">
            </router-link>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'widget-team',
    props: {
      members: {
        type: Array
      }
    }
  }
</script>

<style lang="scss">

  .widget-team {
    &__header {
      display: flex;
      align-items: center;
    }

    &__pills {
      margin-left: auto;
    }

    &__member {
      margin-right: 1rem;
    }
  }

</style>
