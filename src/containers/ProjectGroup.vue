<template>
  <group :title="item.title" v-if="tasksByProject(item).length" @drop="onDrop" :droppable="true">
    <template slot="content">
      <task-list :items="undoneTasksByProject(item)"></task-list>

      <div class="group-header" v-if="doneTasksByProject(item).length">Recently done tasks</div>
      <task-list :items="doneTasksByProject(item)"></task-list>
    </template>
  </group>
</template>

<script>
  import {mapGetters} from 'vuex';
  import TaskList from '@/containers/TaskList';
  import Group from '@/components/Group';

  const isTaskUndone = (t) => !t.done;
  const isTaskDone = (t) => t.done;
  const isTaskNotNew = (t) => !t.isNew;

  export default {
    name: 'project-group',
    props: ['item'],
    components: {Group, TaskList},
    methods: {
      tasksByProject(prj) {
        return this.projectsTasks
          .filter(isTaskNotNew)
          .filter((task) => prj.tasks.indexOf(task._id) !== -1)
      },

      undoneTasksByProject(prj) {
        return this.tasksByProject(prj)
          .filter(isTaskUndone);
      },

      doneTasksByProject(prj) {
        return this.tasksByProject(prj)
          .filter(isTaskDone);
      },

      onDrop({task, project}) {
        this.moveTaskToProject({task, project})
      },

      moveTaskToProject({task, project}) {
        let type, payload;

        if (project) {
          if (project._id === this.item._id) return;

          type = 'moveTaskFromProject';
          payload = {task, from: project, to: this.item};
        } else {
          type = 'addTaskToProject';
          payload = {project: this.item, task};
        }

        this.$store.commit(type, payload);
      },
    },

    computed: {
      ...mapGetters([
        'user',
        'projects',
        'projectsTasks',
        'ungroupedTasks',
        'tasks',
        'teammates',
        'lastUpdates'
      ]),
    }
  }
</script>
