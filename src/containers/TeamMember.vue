<template>
  <div class="card team-member">
    <div class="card-body">
      <author :item="member"></author>
    </div>

    <div class="card-body" v-if="performAnyTask">
      <template v-for="(item, index) in projects">
        <project
            v-if="haveMemberTasks(item.tasks)"
            :project="item"
            :tasks="findMemberTasks(item.tasks)"
            :filterCompleted="true"
            :teammates="teammates"
            :canCreate="false"
            :canEdit="false"
            :index="index"
            :key="item._id">
        </project>
      </template>
    </div>
    <div class="card-body" v-else>
      <div class="card card-outline-secondary">
        <div class="card-body">
          <h4 class="card-title">There are no tasks assigned</h4>
          <p class="card-text">You can assign a task to him.</p>
          <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Project from '@/containers/Project';
  import Author from '@/components/Author';

  export default {
    name: 'team-member',
    props: {
      member: {type: Object},
      tasks: {type: Object},
      teammates: {type: Array},
      projects: {type: Array}
    },

    components: {Project, Author},

    methods: {
      findMemberTasks(tasks) {
        return tasks
          .map((id) => this.tasks[id])
          .filter((task) => task.performers && task.performers.find((u) => u._id === this.member._id));
      },

      haveMemberTasks(tasks) {
        return this.findMemberTasks(tasks).length;
      }
    },

    computed: {
      performAnyTask() {
        return this.projects.filter((prj) => this.haveMemberTasks(prj.tasks)).length;
      }
    }
  }
</script>
