<template>
  <div class="container dashboard-view">
    <div class="dashboard-view__actions" v-hotkey="actionsKeymap">
      <button class="btn btn-success dashboard-view__action-button"
              @click="createTask"
              :disabled="!canCreateTask">
        <icon name="tasks" class="dashboard-view__action-icon"></icon>
        <span class="dashboard-view__action-label">New Task</span>
      </button>
      <button class="btn btn-primary dashboard-view__action-button"
              @click="createProject"
              :disabled="!canCreateProject">
        <icon name="object-group" class="dashboard-view__action-icon"></icon>
        <span class="dashboard-view__action-label">New Bundle</span>
      </button>
    </div>
    <group-list class="group-list">
      <task-list :items="newTasks" class="dashboard-view__new-tasks"></task-list>

      <template v-for="item in newProjects">
        <project-group class="group-list__item" :item="item" :key="item._id"></project-group>
      </template>

      <!-- My Tasks -->
      <group class="group-list__item" :title="`My Tasks (${myTasks.length})`">
        <template slot="content">
          <template v-if="myTasks.length">
            <task-list :items="myUngroupedTasks"></task-list>

            <template v-for="item in projects" v-if="myTasksByProject(item).length">
              <div class="project-group" :key="item._id">
                <div class="group-header">{{item.title}}</div>
                <task-list :items="myUndoneTasksByProject(item)"></task-list>
              </div>
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
          <template v-for="item in teammates">
            <div class="teammate-group" :key="item._id">
              <div class="group-header">
                <author :small="true" :item="item"></author>
                tasks
              </div>

              <template v-if="undoneTasksByMate(item).length">
                <task-list :items="undoneTasksByMate(item)" :showProjectTitle="true"></task-list>
              </template>
              <empty text="There are no tasks assigned. You can assign a task to him." v-else></empty>
            </div>
          </template>
        </template>

        <template slot="actions">
          <router-link class="btn btn-outline-primary btn-sm" to="/team/add">Invite Teammates</router-link>
        </template>
      </group>

      <!-- NotNew Projects -->
      <template v-for="item in notNewProjects">
        <project-group class="group-list__item" :item="item" :key="item._id"></project-group>
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
  import 'vue-awesome/icons/object-group'
  import Icon from 'vue-awesome/components/Icon'

  const isTaskUndone = (t) => !t.done;
  const isTaskDone = (t) => t.done;
  const isNew = (t) => t.isNew;
  const isNotNew = (t) => !t.isNew;

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

      createProject() {
        if (this.canCreateProject) {
          this.$store.dispatch('createProject', {});
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
          .filter(isNotNew)
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
          .filter(isNotNew)
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

      canCreateProject() {
        return this.newProjects.length <= 0;
      },

      newProjects() {
        return this.projects
          .filter(isNew);
      },

      notNewProjects() {
        return this.projects
          .filter(isNotNew);
      },

      newTasks() {
        return this.tasks
          .filter(isNew);
      },

      ungroupedNotNewTasks() {
        return this.ungroupedTasks
          .filter(isNotNew);
      },

      myTasks() {
        return this.tasks
          .filter(this.isUserTask)
          .filter(isNotNew)
      },

      myUngroupedTasks() {
        return this.ungroupedTasks
          .filter(this.isUserTask)
          .filter(isTaskUndone)
          .filter(isNotNew)
      },

      myDoneTasks() {
        return this.tasks
          .filter(this.isUserTask)
          .filter(isTaskDone)
          .filter(isNotNew)
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
    position: relative;

    &__actions {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;

      @media (min-width: 992px) {
        flex-direction: row;
      }
    }

    &__action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-right: .5rem;

      &:disabled {
        opacity: .35;
      }
    }

    &__action-icon {
      margin-right: .5rem;
    }

    &__action-label {
      font-size: .9rem;
    }
  }

</style>


