<template>
  <div class="container dashboard-view">
    <div class="nav-actions" v-hotkey="actionsKeymap">
      <button class="btn btn-success card-link dashboard-view__action-button"
              @click="createTask"
              :disabled="!canCreateTask">
        <icon name="tasks" class="card-link dashboard-view__action-icon"></icon>
        Create Task
      </button>
    </div>
    <group-list class="group-list">
      <task-list :items="newTasks"></task-list>
      <!-- My Tasks -->
      <group class="group-list__item" :title="`My Tasks (${myTasks.length})`">
        <template slot="content">
          <template v-if="myTasks.length">
            <task-list :items="myUngroupedTasks"></task-list>

            <template v-for="(item, index) in projects" v-if="myTasksByProject(item).length">
              <div class="group-header">{{item.title}}</div>
              <task-list :items="myUndoneTasksByProject(item)"></task-list>
            </template>

            <div class="group-header" v-if="myDoneTasks.length">Recently done tasks</div>
            <task-list :items="myDoneTasks" :showProjectTitle="true"></task-list>
          </template>
          <empty text="There are no tasks assigned to you." v-else></empty>
        </template>
      </group>

      <!-- My Team -->
      <group class="group-list__item" title="My Team">
        <template slot="content">
          <template v-for="(item, index) in teammates">
            <div class="group-header">
              <author :small="true" :item="item"></author>
              tasks
            </div>

            <template v-if="undoneTasksByMate(item).length">
              <task-list :items="undoneTasksByMate(item)" :showProjectTitle="true"></task-list>
            </template>
            <empty text="There are no tasks assigned. You can assign a task to him." v-else></empty>
          </template>
        </template>

        <template slot="actions">
          <router-link class="btn btn-outline-primary btn-sm" to="/team/add">Invite Teammates</router-link>
        </template>
      </group>

      <!-- Projects -->
      <template v-for="(item, index) in projects">
        <project-group class="group-list__item" :item="item"></project-group>
      </template>
    </group-list>

    <!-- Unlabeled tasks -->
    <empty-group>
      <task-list :items="ungroupedNotNewTasks"></task-list>
    </empty-group>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Group from '@/components/Group';
  import Author from '@/components/Author';
  import Empty from '@/components/Empty';
  import GroupList from '@/components/GroupList';
  import TaskList from '@/containers/TaskList';
  import Hotkey from '@/components/Hotkey'
  import isBodyActiveElement from '@/utils/isBodyActiveElement'
  import ProjectGroup from '@/containers/ProjectGroup';
  import EmptyGroup from '@/containers/EmptyGroup';

  import 'vue-awesome/icons/tasks'
  import Icon from 'vue-awesome/components/Icon'

  const isTaskUndone = (t) => !t.done;
  const isTaskDone = (t) => t.done;
  const isTaskNew = (t) => t.isNew;
  const isTaskNotNew = (t) => !t.isNew;

  export default {
    name: 'dashboard',
    components: {
      Hotkey,
      Empty,
      Group,
      TaskList,
      GroupList,
      Author,
      ProjectGroup,
      EmptyGroup,
      Icon
    },

    methods: {
      createTask() {
        if (this.canCreateTask) {
          this.$store.dispatch('createTask', {});
        }
      },

      findPerformer(users, id) {
        return users.find((u) => u._id === id);
      },

      isUserTask(task) {
        return this.findPerformer(task.performers, this.user._id);
      },

      isMateTask(mate) {
        return (task) => this.findPerformer(task.performers, mate._id)
      },

      tasksByProject(prj) {
        return this.projectsTasks
          .filter(isTaskNotNew)
          .filter((task) => prj.tasks.indexOf(task._id) !== -1)
      },

      myTasksByProject(prj) {
        return this.tasksByProject(prj)
          .filter(this.isUserTask)
      },

      myUndoneTasksByProject(prj) {
        return this.myTasksByProject(prj)
          .filter(isTaskUndone);
      },

      undoneTasksByMate(mate) {
        return this.tasks
          .filter(this.isMateTask(mate))
          .filter(isTaskUndone)
          .filter(isTaskNotNew)
      },

      onShiftTHotkey(e) {
        if (isBodyActiveElement()) {
          e.preventDefault();
          this.createTask();
        }
      }
    },

    computed: {
      actionsKeymap() {
        return {
          'shift+T': this.onShiftTHotkey
        }
      },

      canCreateTask() {
        return this.newTasks.length <= 0;
      },

      newTasks() {
        return this.tasks
          .filter(isTaskNew);
      },

      ungroupedNotNewTasks() {
        return this.ungroupedTasks
          .filter(isTaskNotNew);
      },

      myTasks() {
        return this.tasks
          .filter(this.isUserTask)
          .filter(isTaskNotNew)
      },

      myUngroupedTasks() {
        return this.ungroupedTasks
          .filter(this.isUserTask)
          .filter(isTaskUndone)
          .filter(isTaskNotNew)
      },

      myDoneTasks() {
        return this.tasks
          .filter(this.isUserTask)
          .filter(isTaskDone)
          .filter(isTaskNotNew)
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

<style lang="scss">

  .dashboard-view {
    padding-bottom: 10rem;

    &__action-button {
      display: inline-flex;
      align-items: center;
    }

    &__action-icon {
      margin-right: .5rem;
    }
  }

  .nav-actions {
    margin-bottom: 1rem;
  }
</style>


