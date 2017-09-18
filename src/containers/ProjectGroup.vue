<template>
  <group
    :title="item.title"
    @drop="onDrop"
    @edit:title="onTitleEdit"
    @title-input:blur="onTitleBlur"
    :droppable="true"
    :editable="true"
    :expandable="expandable"
  >
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

  const isUndone = (t) => !t.done;
  const isDone = (t) => t.done;
  const isNotNew = (t) => !t.isNew;

  export default {
    name: 'project-group',
    props: ['item'],
    components: {Group, TaskList},
    methods: {
      tasksByProject(prj) {
        return this.projectsTasks
          .filter(isNotNew)
          .filter((task) => prj.tasks.indexOf(task._id) !== -1)
      },

      undoneTasksByProject(prj) {
        return this.tasksByProject(prj)
          .filter(isUndone);
      },

      doneTasksByProject(prj) {
        return this.tasksByProject(prj)
          .filter(isDone);
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

      onDrop({task, project}) {
        this.moveTaskToProject({task, project})
      },

      onTitleEdit(title) {
        const data = {title, isNew: false};

        this.$store.commit('updateProject', {...this.item, ...data});
      },

      onTitleBlur(title) {
        if (this.item.isNew && !title) {
          this.$store.commit('removeProject', this.item);
        }
      }
    },

    computed: {
      expandable() {
        return !!this.item.title
      },

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
