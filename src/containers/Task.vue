<template>
  <div class="task card" :class="classObject">
    <div class="task__body" v-if="isExpanded">
      <div class="card-body">
        <div class="task__actions">
          <user-picker
            label="Add Performer"
            class="task__action"
            :members="teammates"
            :selectedMembers="task.performers"
            @change="onPerformerChange"
          ></user-picker>

          <user-picker
            label="Add Followers"
            class="task__action"
            :multiple="true"
            :members="teammates"
            :selectedMembers="task.followers"
            @change="onFollowersChange"
          ></user-picker>

          <div class="task__action task__action_align_right">
            <button class="btn"
                    :class="{'btn-secondary': !task.done, 'btn-success': task.done}"
                    v-if="!inEdit"
                    @click="toggleDone"
            >
              {{ task.done ? 'Mark Undone' : 'Mark as Done' }}
            </button>
          </div>

          <div class="task__action task__action_last">
            <form>
              <date-picker :value="deadline" class="task__action-deadline" placeholder="Deadline"
                           @change="onDeadlineChange"></date-picker>
            </form>
          </div>
        </div>

        <div class="task__content">
          <div class="task__header">
            <h4 class="card-title task__title" v-show="!inEdit" @click="onTitleClick">{{title}}</h4>
            <div class="task__project-title" v-if="project && showProjectTitle">{{project.title}}</div>
          </div>

          <editor class="task__text-editor"
                  v-show="!inEdit"
                  :bordered="false"
                  :text="text"
                  :placeholder="textPlaceholder"
                  :canEdit="false">
          </editor>

          <form class="task__edit-form" @submit.prevent="onSubmit" v-if="inEdit">
            <div class="form-group">
              <label for="task-title" class="sr-only">Title</label>
              <input class="form-control task__input-title"
                     v-model="title"
                     id="task-title"
                     placeholder="Enter Title..."
                     required/>
            </div>
            <div class="form-group">
              <editor class="task__text-editor"
                      :bordered="true"
                      :text="text"
                      :placeholder="textPlaceholder"
                      @change="onEditorChange">
              </editor>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="!title">Save</button>
              <button class="btn btn-secondary" @click="onCancelClick" v-if="canCancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <comments class="task__comments" type="tasks" :items.sync="comments" :entity="task" v-if="!inEdit"></comments>
    </div>

    <entity-row v-if="!isExpanded" @click:title="toggleExpanded">
      <template slot="icon">
        <template v-for="(item, index) in task.performers">
          <author :item="item" :small="true" :haveName="false"></author>
        </template>
      </template>
      <template slot="title">
        {{ task.title }}
      </template>
      <template slot="actions">
        <div class="task__teaser-project" v-if="project && showProjectTitle">{{project.title}}</div>
        <div class="task__teaser-deadline" v-if="task.deadline">
          {{ task.deadline | fromNow }}
        </div>
        <div class="task__teaser-comments" v-if="commentsCount">
          <i class="fa fa-comment"></i>
          <span class="task__teaser-comments-label">{{ commentsCount }}</span>
        </div>

        <div class="task__teaser-move" v-if="!project">
          <form @submit.prevent="onCreateProjectSubmit" v-if="inCreateProjectMode">
            <autocomplete
              placeholder="Enter name..."
              :querySearch="queryProjects"
              @select="onCreateProjectSelect"
              @change="onCreateProjectChange"
              @submit="onCreateProjectSubmit"
            ></autocomplete>
          </form>
          <button type="button" class="btn btn-sm btn-link" @click="inCreateProjectMode = true" v-else>{{createProjectTitle}}</button>
        </div>
      </template>
    </entity-row>

    <template v-if="!inEdit && canExpand">
      <button class="btn btn-link task__expander" @click="toggleExpanded">
        <i class="fa fa-angle-double-up" v-if="isExpanded"></i>
        <i class="fa fa-angle-double-down" v-else></i>
      </button>
    </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import fromNow from '@/utils/fromNow';
  import Comments from '@/containers/Comments';
  import EntityRow from '@/components/EntityRow';
  import UserPicker from '@/components/UserPicker';
  import DatePicker from '@/components/DatePicker';
  import Autocomplete from '@/components/Autocomplete';
  import Author from '@/components/Author';
  import Editor from '@/components/Editor';

  export default {
    name: 'task',
    props: {
      task: {type: Object},
      canExpand: {type: Boolean, 'default': true},
      canEdit: {type: Boolean, 'default': true},
      canMoveToProject: {type: Boolean, 'default': true},
      showProjectTitle: {type: Boolean, 'default': false}
    },
    components: {
      EntityRow,
      Comments,
      UserPicker,
      DatePicker,
      Autocomplete,
      Author,
      Editor
    },

    data() {
      const task = this.task;
      const isTitleEmpty = !task.title;

      return {
        deadline: task.deadline,
        performers: task.performers,
        followers: task.followers,
        done: task.done,

        newProjectName: null,

        inCreateProjectMode: false,

        inEdit: task.isNew || isTitleEmpty,
        isExpanded: (isTitleEmpty === true) || this.canExpand === false
      }
    },

    methods: {
      updateTask(task) {
        task._id = this.task._id;

        this.$store.commit('updateTask', {task});
      },

      logAction(action) {
        const {_id, title} = this.task;
        const author = this.user;

        if (this.task.title) {
          this.$store.commit('logAction', {
            author,
            action,
            entity: {_id, title},
            route: {name: 'task', params: {id: _id}}
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
        this.isExpanded = !this.isExpanded;
      },

      toggleDone() {
        const done = !this.task.done;

        this.updateTask({done});
        this.logAction('marked as ' + (done ? 'done' : 'undone'));
      },

      queryProjects(queryString, cb) {
        const links = this.projects
          .filter((project) => this.project ? project._id !== this.project._id : true)
          .map((project) => ({value: project.title, project}));

        const results = queryString ? links.filter(this.createFilter(queryString)) : links;

        cb(results);
      },

      createFilter(queryString) {
        return (prj) => (prj.value.indexOf(queryString.toLowerCase()) === 0);
      },

      moveTaskToProject({task, project}) {
        if (this.project) {
          this.$store.commit('moveTaskFromProject', {task, from: this.project, to: project});
        } else {
          this.$store.commit('addTaskToProject', {project, task})
        }

        this.inCreateProjectMode = false;
      },

      onCreateProjectSubmit(e) {
        console.log('project.submit', e);
        const title = this.newProjectName;
        const task = this.task;

        if (title) {
          this.$store
            .dispatch('createProject', {title})
            .then((project) => {
              this.moveTaskToProject({task, project})
            })
        }
      },

      onCreateProjectChange(value) {
        console.log('project.change', value);
        this.newProjectName = value;
      },

      onCreateProjectSelect({project}) {
        console.log('project.select', project);
        const task = this.task;

        this.moveTaskToProject({task, project})
      },

      onSubmit() {
        this.inEdit = false;

        this.updateTask({title: this.title, text: this.text, isNew: false});
        this.logAction(this.task.isNew ? 'created' : 'updated');
      },

      onEditorChange(text) {
        this.updateTask({text});
      },

      onTextClick() {
        this.inEdit = true;
      },

      onTitleClick() {
        this.inEdit = true;
      },

      onCancelClick() {
        if (this.task.isNew) {
          this.$store.commit('removeTask', {task: this.task, project: this.project});
        } else {
          this.inEdit = false;
        }
      },

      onPerformerChange(performers) {
        this.updateTask({performers});

        this.logUsersChange(performers, this.task.performers, 'performer');
      },

      onFollowersChange(followers) {
        this.updateTask({followers});

        this.logUsersChange(followers, this.task.followers, 'followers');
      },

      onDeadlineChange(deadline) {
        if (this.task.deadline !== deadline) {
          this.updateTask({deadline});
          this.logAction('changed deadline on');
        }
      }
    },

    filters: {
      fromNow
    },

    computed: {
      classObject() {
        return {
          'task_expanded': this.isExpanded,
          'task_edit': this.inEdit,
          'task_done': this.task.done,
          'task_no-expand': !this.canExpand
        };
      },

      canCancel() {
        //@TODO move cancel logic to parent component
        return true;
      },

      project() {
        return this.projects.find((prj) => prj.tasks.indexOf(this.task._id) !== -1)
      },

      createProjectTitle() {
        return this.project ? 'Move to bundle' : 'Add to bundle'
      },

      title: {
        get() {
          return this.task.title
        },
        set(title) {
          this.updateTask({title});
        }
      },

      titlePlaceholder() {
        return this.canEdit ? 'Click to edit title' : '';
      },

      text: {
        get() {
          return this.task.text
        },
        set(text) {
          this.updateTask({text});
        }
      },

      textPlaceholder() {
        return this.canEdit ? 'Click to edit description' : '';
      },

      commentsCount() {
        return this.comments.length ? this.comments.length : false
      },

      comments() {
        return this.task.comments.map((id) => this.$store.state.comments[id])
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
  .task {
    position: relative;
    border-radius: 6px;

    &_expanded {
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
      border-radius: 7px;
      border: none;
    }

    &__expander {
      padding: 0.5rem;
      font-size: 1rem;
      position: absolute;
      top: 0;
      right: 0;
      height: 50px;
      color: #818a91;
      cursor: pointer;
      /*border-left: 1px solid #f2f2f2;*/
      /*border-bottom: 1px solid #f2f2f2;*/
      border-radius: 0 6px 6px 0;

      &:hover, &:focus {
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

      &:hover, &:focus {
        background: #5cb85c;
      }
    }

    &__header {
      display: flex;
      align-items: center;
    }

    &__header &__project-title {
      margin-left: auto
    }

    &__title-input {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.1;
      color: #2c3e50;
    }

    &__title {
      font-size: 21px;
      color: #4e4e4e;
    }

    &__meta {
      display: flex;
    }

    &__meta-action_align_right {
      margin-left: auto;
    }

    &__actions {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;

      @media (min-width: 992px) {
        flex-direction: row;
      }
    }

    &__action {
      margin-bottom: 1rem;
      display: inline-block;
      font-size: 13px;
      cursor: pointer;

      @media (min-width: 992px) {
        margin-right: 1rem;
      }
    }

    &__action_align_right {
      @media (min-width: 992px) {
        margin-left: auto;
      }
    }

    &__action-members {
      padding: .5rem 1rem;
    }

    &__action-deadline {
      max-width: 120px;
    }

    &_no-expand &__action_last,
    &_edit &__action_last {
      margin-right: 0;
    }

    &__comments {
      border-radius: 0 0 6px 6px;
    }

    &__project-title,
    &__teaser-project {
      color: hsla(0, 0%, 0%, .5)
    }

    &__teaser-project,
    &__teaser-deadline,
    &__teaser-comments {
      margin-right: .5rem;
    }

    &__teaser-deadline {
      display: inline-flex;
      align-items: center;
    }

    &__teaser-comments {
      display: inline-flex;
      align-items: center;
      color: #5d5d5d;
    }

    &__teaser-comments-label {
      margin-left: 4px;
    }
  }
</style>
