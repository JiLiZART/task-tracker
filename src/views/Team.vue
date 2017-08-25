<template>
  <div class="container">
    <div class="card team-view">
      <div class="card-body">
        <h4 class="card-title">My Team</h4>
      </div>
      <div class="card-body" v-if="teammates && teammates.length">
        <template v-for="(item, index) in teammates">
          <div class="card team-view__member">
            <div class="card-body">
              <router-link class="team-view__member-header" :to="{name: 'member', params: {id: item._id}}">
                <avatar :item="item" class="team-view__member-avatar"></avatar>
                <div class="team-view__member-name">
                  <h4 class="card-title">{{item.username}}</h4>
                  <h6 class="card-subtitle mb-2 text-muted" v-if="getUserName(item)">{{getUserName(item)}}</h6>
                </div>
              </router-link>
            </div>
          </div>
        </template>
        <router-link class="btn btn-primary" to="/team/add">Add Users</router-link>
      </div>
      <div class="card-body" v-else>
        <div class="card">
          <div class="card-body">
            <p class="card-text">There are no teammates.</p>
            <router-link class="btn btn-primary" to="/team/add">Add Teammates</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import TeamLoad from '@/containers/TeamLoad';
  import Avatar from '@/components/Avatar';

  export default {
    name: 'team-view',

    components: {Avatar},

    methods: {
      getUserName(user) {
        return (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : null;
      }
    },

    computed: {
      ...mapGetters([
        'projects',
        'teammates',
        'haveProjects',
        'workspace'
      ]),

      tasks() {
        return this.$store.state.tasks;
      }
    }
  }
</script>

<style lang="scss">
  .team-view {
    &__member {
      margin-bottom: 1rem;
    }

    &__member-header {
      display: flex;
      align-items: center;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }

    &__member-name {
      margin-left: 1rem;
    }
  }

</style>
