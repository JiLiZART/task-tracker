<template>
  <div class="card card-outline-secondary widget-tasks">
    <div class="card-header">
      <h5 class="card-title widget-tasks__title">My Tasks</h5>
    </div>
    <div class="card-body" v-if="tasks && tasks.length">
      <div class="widget-tasks__done-tasks" v-if="undoneTasks.length">
        <template v-for="(item, index) in undoneTasks">
          <div class="widget-tasks__task">
            <task
                :key="item._id"
                :index="index"
                :id="item._id"
                :task.sync="item"
                :project="getTaskProject(item)"
                :teammates="teammates"
                :showProjectTitle="true"
            ></task>
          </div>
        </template>
      </div>
      <div class="widget-tasks__undone-tasks" v-if="doneTasks.length">
        <h5 class="card-title">Recently done tasks</h5>

        <template v-for="(item, index) in doneTasks">
          <div class="widget-tasks__task">
            <task
                :key="item._id"
                :index="index"
                :id="item._id"
                :task.sync="item"
                :project="getTaskProject(item)"
                :teammates="teammates"
                :showProjectTitle="true"
            ></task>
          </div>
        </template>
      </div>
    </div>
    <div class="card-body" v-else>
      <div class="card">
        <div class="card-body">
          <p class="card-text">There are no tasks assigned to you. Ask someone for a task.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from '@/containers/Task';

  export default {
    name: 'widget-tasks',
    props: {
      tasks: {
        type: Array
      },
      projects: {
        type: Array
      },
      teammates: {
        type: Array
      }
    },

    components: {Task},

    methods: {
      getTaskProject(task) {
        const isContainTask = (tasks) => tasks.indexOf(task._id) !== -1;

        const prj = this.projects.find((p) => isContainTask(p.tasks));

        console.log('get task project', task, prj, this.projects);

        return prj;
      }
    },

    computed: {
      doneTasks() {
        return this.tasks.filter(t => t.done);
      },

      undoneTasks() {
        return this.tasks.filter(t => !t.done);
      }
    }
  }
</script>

<style lang="scss">
  .widget-tasks {
    &__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    &__task {
      margin-bottom: .5rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__done-tasks {
      margin-bottom: 1rem;
    }
  }
</style>
