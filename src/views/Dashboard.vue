<template>
  <div class="container">
    <div class="nav-actions">
      <button class="btn btn-success card-link project__action-button" @click="createTask">
        <i class="fa fa-tasks"></i>
        Create Task
      </button>
    </div>
    <group-list class="group-list">

      <!-- My Tasks -->
      <group class="group-list__item" :title="`My Tasks (${myTasks.length})`">
        <template slot="content">
          <template v-if="myTasks.length">
            <task-list :items="myUngroupedTasks" :teammates="teammates"></task-list>

            <template v-for="(item, index) in projects" v-if="projectMyTasks(item).length">
              <div class="group-header">{{item.title}}</div>
              <task-list
                :items="projectMyUndoneTasks(item)"
                :teammates="teammates"
              ></task-list>
            </template>

            <div class="group-header" v-if="myDoneTasks.length">Recently done tasks</div>
            <task-list
              :items="myDoneTasks"
              :teammates="teammates"
              :showProjectTitle="true"
            ></task-list>
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

            <template v-if="mateUndoneTasks(item).length">
              <task-list
                :items="mateUndoneTasks(item)"
                :teammates="teammates"
                :showProjectTitle="true"
              ></task-list>
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
        <group class="group-list__item" :title="item.title" v-if="projectTasks(item).length">
          <template slot="content">
            <task-list :items="projectUndoneTasks(item)" :teammates="teammates"></task-list>

            <div class="group-header" v-if="projectDoneTasks(item).length">Recently done tasks</div>
            <task-list :items="projectDoneTasks(item)" :teammates="teammates"></task-list>
          </template>
        </group>
      </template>
    </group-list>

    <task-list :items="ungroupedTasks" :teammates="teammates"></task-list>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Group from '../components/Group';
  import Author from '../components/Author';
  import Empty from '../components/Empty';
  import GroupList from '../containers/GroupList';
  import TaskList from '../containers/TaskList';

  export default {
    name: 'dashboard',
    components: {Empty, Group, TaskList, GroupList, Author},

    methods: {
      createTask() {
        this.$store.dispatch('createTask', {});
      },

      findPerformer(users, id) {
        return users.find((u) => u._id === id);
      },

      mateUndoneTasks(mate) {
        return this.tasks.filter((task) => {
          return this.findPerformer(task.performers, mate._id) && !task.done
        })
      },

      projectMyTasks(prj) {
        return this.projectTasks(prj).filter((task) => this.findPerformer(task.performers, this.user._id))
      },

      projectMyUndoneTasks(prj) {
        return this.projectMyTasks(prj).filter(t => !t.done);
      },

      projectTasks(prj) {
        return this.projectsTasks.filter((task) => prj.tasks.indexOf(task._id) !== -1)
      },

      projectUndoneTasks(prj) {
        return this.projectTasks(prj).filter(t => !t.done);
      },

      projectDoneTasks(prj) {
        return this.projectTasks(prj).filter(t => t.done);
      },
    },

    computed: {
      myTasks() {
        return this.tasks.filter((task) => this.findPerformer(task.performers, this.user._id));
      },

      myUngroupedTasks() {
        return this.ungroupedTasks.filter((task) => this.findPerformer(task.performers, this.user._id) && !task.done);
      },

      myDoneTasks() {
        return this.tasks.filter((task) => {
          return this.findPerformer(task.performers, this.user._id) && task.done
        });
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

  .nav-actions {
    margin-bottom: 1rem;
  }
</style>


