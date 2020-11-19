<template>
  <v-expansion-panel
    class="task"
    :class="classObject"
    v-hotkey="keymap"
    :transfer-data="{ task, project }"
    tabindex="0"
  >
    <v-expansion-panel-header>
      <template v-slot:default="{ open }">
        <entity-row v-if="!open" @click:title="toggleExpanded">
          <template slot="icon">
            <template v-for="item in task.performers">
              <author
                :item="item"
                :small="true"
                :haveName="false"
                :key="item._id"
              ></author>
            </template>
          </template>
          <template slot="title">
            {{ task.title }}
          </template>
          <template slot="actions">
            <div
              class="task-teaser__project"
              v-if="project && showProjectTitle"
            >
              {{ project.title }}
            </div>
            <div class="task-teaser__deadline" v-if="task.deadline">
              {{ task.deadline | daysLeft }}
            </div>

            <div class="task-teaser__comments" v-if="commentsCount">
              <icon name="comment" class="task-teaser__comments-icon"></icon>
              <span class="task-teaser__comments-label">{{
                commentsCount
              }}</span>
            </div>

            <div class="task-teaser__move" v-if="!project">
              <form
                @submit.prevent="onCreateProjectSubmit"
                v-if="inCreateProjectMode"
              >
                <autocomplete
                  placeholder="Enter label name..."
                  :querySearch="queryProjects"
                  @select="onCreateProjectSelect"
                  @change="onCreateProjectChange"
                  @submit="onCreateProjectSubmit"
                  @blur="inCreateProjectMode = false"
                ></autocomplete>
              </form>
              <button
                type="button"
                class="btn btn-sm btn-link"
                @click="inCreateProjectMode = true"
                v-else
              >
                {{ createProjectTitle }}
              </button>
            </div>
          </template>
        </entity-row>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="task__body">
        <div class="card-body">
          <div class="task__header">
            <h4
              class="card-title task__title"
              v-show="!inEdit"
              @click="inEdit = true"
            >
              {{ title }}
            </h4>
            <div class="task__project-title" v-if="project && showProjectTitle">
              {{ project.title }}
            </div>

            <button
              class="btn task__btn-done"
              :class="{ 'btn-secondary': !task.done, 'btn-success': task.done }"
              v-if="!inEdit"
              @click="toggleDone"
            >
              {{ task.done ? "Mark Undone" : "Mark as Done" }}
            </button>
          </div>

          <editor
            class="task__content"
            v-show="!inEdit"
            @click.native="inEdit = true"
            :bordered="false"
            :readonly="true"
            :text="text"
            :placeholder="textPlaceholder"
          >
          </editor>

          <!-- Edit Form -->
          <form class="task__form" @submit.prevent="onSubmit" v-if="inEdit">
            <!-- Edit title -->
            <div class="form-group">
              <label for="task-title" class="sr-only">Title</label>
              <input
                class="form-control task__input-title"
                v-model="title"
                id="task-title"
                ref="inputTitle"
                placeholder="Enter Title..."
                @keyup.enter="onEnterHotkey"
                required
              />
            </div>

            <!-- Edit text -->
            <div class="form-group">
              <editor
                class="task__text-editor"
                :bordered="true"
                :text="text"
                :placeholder="textPlaceholder"
                @change="onEditorChange"
              >
              </editor>
            </div>

            <!-- Actions -->
            <div class="task__actions">
              <div class="task__actions-left">
                <button class="btn btn-primary task__action" :disabled="!title">
                  Save
                  <hotkey name="command+enter"></hotkey>
                </button>
                <button
                  class="btn btn-secondary task__action"
                  @click="onCancelClick"
                  v-if="canCancel"
                >
                  Cancel
                  <hotkey name="esc"></hotkey>
                </button>

                <mate-picker
                  label="Add Performer"
                  class="task__action"
                  :members="teammates"
                  :selectedMembers="task.performers"
                  @change="onPerformerChange"
                ></mate-picker>

                <mate-picker
                  label="Add Followers"
                  class="task__action"
                  :multiple="true"
                  :members="teammates"
                  :selectedMembers="task.followers"
                  @change="onFollowersChange"
                ></mate-picker>
              </div>

              <div class="task__actions-right">
                <div class="task__action task__action_align_right"></div>

                <div class="task__action task__action_last">
                  <form @submit.prevent="onSubmit">
                    <date-picker
                      :value="deadline"
                      class="task__action-deadline"
                      placeholder="Deadline"
                      @change="onDeadlineChange"
                    ></date-picker>
                  </form>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Comments -->
        <comments
          class="task__comments"
          type="tasks"
          :items.sync="comments"
          :entity="task"
          v-if="!inEdit"
        ></comments>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import { mapGetters } from "vuex";
import getCurrentActiveElement from "@/utils/getCurrentActiveElement";
import isMac from "@/utils/isMac";
import daysLeft from "@/utils/daysLeft";
import Comments from "@/containers/Comments";
// import Expander from "@/components/Expander";
import EntityRow from "@/components/EntityRow";
import DatePicker from "@/components/DatePicker";
import Autocomplete from "@/components/Autocomplete";
import Author from "@/components/Author";
import Editor from "@/components/Editor";
import MatePicker from "@/components/MatePicker";
import Hotkey from "@/components/Hotkey";

import "vue-awesome/icons/comment";
import Icon from "vue-awesome/components/Icon";

export default {
  name: "Task",
  props: {
    task: { type: Object },
    expandable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: true },
    editable: { type: Boolean, default: true },
    canMoveToProject: { type: Boolean, default: true },
    showProjectTitle: { type: Boolean, default: false }
  },
  components: {
    EntityRow,
    Comments,
    DatePicker,
    Autocomplete,
    Author,
    Editor,
    MatePicker,
    Hotkey,
    Icon
  },

  data() {
    const task = this.task;
    const isTitleEmpty = !task.title;

    return {
      deadline: task.deadline,
      performers: task.performers,
      followers: task.followers,
      done: task.done,
      title: task.title,
      text: task.text,

      newProjectName: null,

      inCreateProjectMode: false,

      inEdit: task.isNew || isTitleEmpty,
      isExpanded: isTitleEmpty === true || this.canExpand === false
    };
  },

  mounted() {
    if (this.inEdit) {
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    }
  },

  methods: {
    updateTask(task) {
      task._id = this.task._id;

      this.$store.commit("updateTask", { task });
    },

    logAction(action) {
      const { _id, title } = this.task;
      const author = this.user;

      if (this.task.title) {
        this.$store.commit("logAction", {
          author,
          action,
          entity: { _id, title },
          route: { name: "task", params: { id: _id } }
        });
      }
    },

    logUsersChange(newUsers, currentUsers, label) {
      if (newUsers.length) {
        if (currentUsers.length) {
          this.logAction(`changed ${label} on`);
        } else {
          this.logAction(`assigned ${label} on`);
        }
      } else {
        this.logAction(`removed ${label} on`);
      }
    },

    toggleExpanded() {
      if (this.canExpand) {
        this.isExpanded = !this.isExpanded;
      }
    },

    expand() {
      if (this.canExpand) {
        this.isExpanded = true;
      }
    },

    collapse() {
      if (this.canExpand) {
        this.isExpanded = false;
      }
    },

    toggleDone() {
      const done = !this.task.done;

      this.updateTask({ done });
      this.logAction("marked as " + (done ? "done" : "undone"));
    },

    queryProjects(queryString, cb) {
      const links = this.projects
        .filter(project =>
          this.project ? project._id !== this.project._id : true
        )
        .map(project => ({ value: project.title, project }));

      const createFilter = queryString => prj =>
        prj.value.indexOf(queryString.toLowerCase()) === 0;
      const results = queryString
        ? links.filter(createFilter(queryString))
        : links;

      cb(results);
    },

    moveTaskToProject({ task, project }) {
      let type, payload;

      if (this.project) {
        type = "moveTaskFromProject";
        payload = { task, from: this.project, to: project };
      } else {
        type = "addTaskToProject";
        payload = { project, task };
      }

      this.$store.commit(type, payload);
      this.inCreateProjectMode = false;
    },

    findProject(query) {
      return this.projects.find(({ title }) => title === query);
    },

    submitTask() {
      if (this.title) {
        this.inEdit = false;

        this.updateTask({ title: this.title, text: this.text, isNew: false });
      }
    },

    isElementActive() {
      return this.$el === getCurrentActiveElement();
    },

    onCreateProjectSubmit(e) {
      const title = this.newProjectName;
      const task = this.task;
      let project;

      if (title) {
        project = this.findProject(title);

        if (project) {
          this.moveTaskToProject({ task, project });
        } else {
          this.$store.dispatch("createProject", { title }).then(project => {
            this.moveTaskToProject({ task, project });
          });
        }
      }
    },

    onCreateProjectChange(value) {
      this.newProjectName = value;
    },

    onCreateProjectSelect({ project }) {
      const task = this.task;

      this.moveTaskToProject({ task, project });
    },

    onSubmit() {
      this.submitTask();
      this.logAction(this.task.isNew ? "created" : "updated");
    },

    onEditorChange(text) {
      this.text = text;
    },

    onCancelClick() {
      if (this.canCancel) {
        if (this.task.isNew) {
          this.$store.commit("removeTask", {
            task: this.task,
            project: this.project
          });
        } else {
          this.inEdit = false;
          this.title = this.task.title;
          this.text = this.task.text;
        }
      }
    },

    onPerformerChange(performers) {
      this.updateTask({ performers });

      this.logUsersChange(performers, this.task.performers, "performer");
    },

    onFollowersChange(followers) {
      this.updateTask({ followers });

      this.logUsersChange(followers, this.task.followers, "followers");
    },

    onDeadlineChange(deadline) {
      if (this.task.deadline !== deadline) {
        this.updateTask({ deadline });
        this.logAction("changed deadline on");
      }
    },

    onEscHotkey() {
      if (this.isElementActive()) {
        if (this.inEdit) {
          this.onCancelClick();
        } else {
          this.collapse();
        }
      }
    },

    onEnterHotkey() {
      if (this.isElementActive()) {
        this.toggleExpanded();
      }
    },

    onLeftHotkey() {
      if (this.isElementActive()) {
        this.collapse();
      }
    },

    onRightHotkey() {
      if (this.isElementActive()) {
        this.expand();
      }
    }
  },

  filters: {
    daysLeft
  },

  computed: {
    classObject() {
      return {
        task_expanded: this.isExpanded,
        task_edit: this.inEdit,
        task_done: this.task.done,
        "task_no-expand": !this.canExpand,
        task_focused: this.focused
      };
    },

    keymap() {
      return {
        [isMac() ? "meta+enter" : "ctrl+enter"]: this.onSubmit,
        //'enter': this.onEnterHotkey,
        esc: this.onEscHotkey,
        left: this.onLeftHotkey,
        right: this.onRightHotkey
      };
    },

    canCancel() {
      return this.inEdit;
    },

    canExpand() {
      return !this.inEdit && this.expandable;
    },

    project() {
      return this.projects.find(prj => prj.tasks.indexOf(this.task._id) !== -1);
    },

    createProjectTitle() {
      return this.project ? "Move label" : "Add label";
    },

    titlePlaceholder() {
      return this.editable ? "Click to edit title" : "";
    },

    textPlaceholder() {
      return this.editable ? "Click to edit description" : "";
    },

    commentsCount() {
      return this.comments.length ? this.comments.length : false;
    },

    comments() {
      return this.task.comments.map(id => this.$store.state.comments[id]);
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
.task {
  position: relative;
  border-radius: 6px;

  &.task {
    background-color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.14);
  }

  &_expanded {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    border: none;
  }

  &_expanded:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  &__expander {
    position: absolute;
    top: 0;
    right: 0;
    height: 50px;
    /*border-left: 1px solid #f2f2f2;*/
    /*border-bottom: 1px solid #f2f2f2;*/
    border-radius: 0 6px 6px 0;

    &:hover,
    &:focus {
      background: #f7f7f9;
      /*border-color: #f2f2f2;*/
    }
  }

  &_expanded &__expander {
    border-radius: 0 6px 0 6px;
  }

  &_done &__expander {
    color: white;
    background: #5cb85c;
    border-color: #5cb85c;

    &:hover,
    &:focus {
      background: #5cb85c;
    }
  }

  &__btn-done {
    margin-left: auto;
    margin-right: 2rem;
    margin-top: -1rem;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__header &__project-title {
    margin-left: auto;
  }

  &__project-title {
    color: hsla(0, 0%, 0%, 0.5);
  }

  &__title {
    font-size: 21px;
    color: #4e4e4e;
  }

  &__content.editor {
    padding: 0;
  }

  &__actions {
    display: flex;
    flex-direction: row;
  }

  &__actions-left,
  &__actions-right {
    display: flex;
    flex-direction: column;

    @media (min-width: 992px) {
      flex-direction: row;
    }
  }

  &__actions-right {
    margin-left: auto;
    text-align: right;
  }

  &__action {
    margin-bottom: 1rem;
    display: inline-block;
    font-size: 13px;
    cursor: pointer;

    @media (min-width: 992px) {
      margin-right: 1rem;
      margin-bottom: 0;
    }
  }

  &__action_last {
    margin-right: 0;
  }

  &__action-deadline {
    max-width: 120px;
  }

  &__comments {
    border-radius: 0 0 6px 6px;
  }
}

.task-teaser {
  &__project,
  &__deadline,
  &__comments {
    margin-right: 0.5rem;
  }

  &__project {
    color: hsla(0, 0%, 0%, 0.5);
  }

  &__deadline {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__comments {
    display: inline-flex;
    align-items: center;
    color: #5d5d5d;
  }

  &__comments-label {
    margin-left: 4px;
  }
}
</style>
