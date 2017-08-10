<template>
  <div class="container">
    <template v-if="member">
      <team-member
        :teammates="teammates"
        :member="member"
        :tasks="tasks"
        :projects="projects"
      ></team-member>
    </template>
    <template v-if="!member">
      <div class="card-block">
        <h4 class="card-title">Member not found</h4>
        <p class="card-text">He was lost somewhere in the abyss of immense tasks.</p>
        <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
      </div>
    </template>
  </div>
</template>

<script>
  import TeamMember from '@/containers/TeamMember';

  export default {
    name: 'member-view',

    components: {TeamMember},

    data() {
      return {};
    },

    computed: {
      projects() {
        return this.$store.getters.projects;
      },

      teammates() {
        return this.$store.getters.teammates;
      },

      tasks() {
        return this.$store.state.tasks;
      },

      member() {
        return this.$store.state.teammates[this.$route.params.id]
      }
    }
  }
</script>
