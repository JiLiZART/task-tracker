<template>
  <div class="container dashboard-view">
    <div class="dashboard-view__actions" v-hotkey="actionsKeymap">
      <v-btn
        class="dashboard-view__action-button"
        color="success"
        depressed
        large
        @click="createTask"
        :disabled="!canCreateTask"
      >
        <v-icon left dark class="dashboard-view__action-icon">
          mdi-notebook-plus
        </v-icon>
        <span class="dashboard-view__action-label">New Task</span>
      </v-btn>
      <v-btn
        class="dashboard-view__action-button"
        color="primary"
        depressed
        large
        @click="createProject"
        :disabled="!canCreateProject"
      >
        <v-icon left dark class="dashboard-view__action-icon"
          >mdi-object-group</v-icon
        >
        <span class="dashboard-view__action-label">New Bundle</span>
      </v-btn>
    </div>
    <GroupList class="group-list">
      <TaskList :items="newTasks" class="dashboard-view__new-tasks" />

      <ProjectGroup
        class="group-list__item"
        v-for="item in newProjects"
        :item="item"
        :key="item._id"
      />

      <!-- My Tasks -->
      <Group class="group-list__item" :title="`My Tasks (${myTasks.length})`">
        <template slot="content">
          <template v-if="myTasks.length">
            <TaskList :items="myUngroupedTasks" />

            <div
              class="project-group"
              v-for="item in myProjects"
              :key="item._id"
            >
              <div class="group-header">{{ item.title }}</div>
              <TaskList :items="myUndoneTasksByProject(item)" />
            </div>

            <div class="group-header" v-if="myDoneTasks.length">
              Recently done tasks
            </div>
            <TaskList :items="myDoneTasks" :showProjectTitle="true" />
          </template>
          <Empty v-else text="There are no tasks assigned to you." />
        </template>
      </Group>

      <!-- My Team -->
      <Group class="group-list__item" title="My Team">
        <template #content>
          <div class="teammate-group" :key="item._id" v-for="item in teammates">
            <div class="group-header">
              <Author :small="true" :item="item" />
              tasks
            </div>

            <TaskList
              v-if="undoneTasksByMate(item).length"
              :items="undoneTasksByMate(item)"
              :showProjectTitle="true"
            />
            <Empty
              v-else
              text="There are no tasks assigned. You can assign a task to him."
            />
          </div>
        </template>

        <template #actions>
          <router-link class="btn btn-outline-primary btn-sm" to="/team/add"
            >Invite Teammates</router-link
          >
        </template>
      </Group>

      <!-- NotNew Projects -->
      <ProjectGroup
        class="group-list__item"
        v-for="item in notNewProjects"
        :item="item"
        :key="item._id"
      />
    </GroupList>

    <!-- Unlabeled tasks -->
    <EmptyGroup>
      <TaskList :items="ungroupedNotNewTasks" />
    </EmptyGroup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Group from "@/components/Group";
import Author from "@/components/Author";
import Empty from "@/components/Empty";
import GroupList from "@/components/GroupList";
import TaskList from "@/containers/TaskList";
import isBodyActiveElement from "@/utils/isBodyActiveElement";
import ProjectGroup from "@/containers/ProjectGroup";
import EmptyGroup from "@/containers/EmptyGroup";

const isTaskUndone = t => !t.done;
const isTaskDone = t => t.done;
const isNew = t => t.isNew;
const isNotNew = t => !t.isNew;

export default {
  name: "dashboard",
  components: {
    Empty,
    Group,
    TaskList,
    GroupList,
    Author,
    ProjectGroup,
    EmptyGroup
  },

  methods: {
    createTask() {
      if (this.canCreateTask) {
        this.$store.dispatch("createTask", {});
      }
    },

    createProject() {
      if (this.canCreateProject) {
        this.$store.dispatch("createProject", {});
      }
    },

    findPerformer(users, id) {
      return users.find(u => u._id === id);
    },

    isUserTask(task) {
      return this.findPerformer(task.performers, this.user._id);
    },

    isMateTask(mate) {
      return task => this.findPerformer(task.performers, mate._id);
    },

    tasksByProject(prj) {
      return this.projectsTasks
        .filter(isNotNew)
        .filter(task => prj.tasks.indexOf(task._id) !== -1);
    },

    myTasksByProject(prj) {
      return this.tasksByProject(prj).filter(this.isUserTask);
    },

    myUndoneTasksByProject(prj) {
      return this.myTasksByProject(prj).filter(isTaskUndone);
    },

    undoneTasksByMate(mate) {
      return this.tasks
        .filter(this.isMateTask(mate))
        .filter(isTaskUndone)
        .filter(isNotNew);
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
        "shift+T": this.onShiftTHotkey
      };
    },

    canCreateTask() {
      return this.newTasks.length <= 0;
    },

    canCreateProject() {
      return this.newProjects.length <= 0;
    },

    newProjects() {
      return this.projects.filter(isNew);
    },

    notNewProjects() {
      return this.projects.filter(isNotNew);
    },

    newTasks() {
      return this.tasks.filter(isNew);
    },

    ungroupedNotNewTasks() {
      return this.ungroupedTasks.filter(isNotNew);
    },

    myProjects() {
      return this.projects.filter(item => this.myTasksByProject(item).length);
    },

    myTasks() {
      return this.tasks.filter(this.isUserTask).filter(isNotNew);
    },

    myUngroupedTasks() {
      return this.ungroupedTasks
        .filter(this.isUserTask)
        .filter(isTaskUndone)
        .filter(isNotNew);
    },

    myDoneTasks() {
      return this.tasks
        .filter(this.isUserTask)
        .filter(isTaskDone)
        .filter(isNotNew);
    },

    ...mapGetters([
      "user",
      "projects",
      "projectsTasks",
      "ungroupedTasks",
      "tasks",
      "teammates",
      "lastUpdates"
    ])
  }
};
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
    margin-right: 0.5rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
    }

    @media (max-width: 992px) {
      margin-right: 0;
    }
  }

  &__action-icon {
    margin-right: 0.5rem;
  }

  &__action-label {
    font-size: 0.9rem;
  }
}
</style>
