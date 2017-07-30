<template>
  <div class="container">
    <template v-if="task">
      <task
        :key="task._id"
        :id="task._id"
        :task.sync="task"
        :canExpand="false"
        :teammates="teammates"
      ></task>
    </template>
    <template v-if="!task">
      <div class="card-block">
        <h4 class="card-title">Task not found</h4>
        <p class="card-text">Hmm.</p>
        <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
      </div>
    </template>
  </div>
</template>

<script>
  import Task from '@/components/Task';

  export default {
    name: 'task-view',
    components: {Task},
    computed: {
      task() {
        return this.$store.state.tasks[this.$route.params.id]
      },

      teammates() {
        return this.$store.getters.teammates;
      }
    }
  }
</script>
