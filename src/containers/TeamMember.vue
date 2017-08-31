<template>
  <div class="card team-member">
    <div class="card-body">
      <author :item="member"></author>
    </div>

    <!--@TODO implement user tasks -->
  </div>
</template>

<script>
  import Author from '@/components/Author';

  export default {
    name: 'team-member',
    props: {
      member: {type: Object},
      tasks: {type: Object},
      teammates: {type: Array},
      projects: {type: Array}
    },

    components: {Author},

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
