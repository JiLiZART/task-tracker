<template>
  <div class="task card" :class="classObject">
    <transition name="fade" :duration="200">
      <div class="task__body" v-if="isExpanded">
        <div class="card-block">
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
              <form class="form-inline">
                <div class="form-group">
                  <date-picker :value="deadline" placeholder="Deadline" @change="onDeadlineChange"></date-picker>
                </div>
              </form>
            </div>
          </div>

          <div class="task__content">
            <h4 class="card-title task__title" v-show="!inEdit" @click="onTitleClick">{{title}}</h4>

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
        <comments type="tasks" :items.sync="comments" :entity="task" v-if="!inEdit"></comments>
      </div>
    </transition>

    <div class="task__teaser" v-if="!isExpanded">
      <div class="task__teaser-performer">
        <template v-for="(item, index) in task.performers">
          <author :item="item" :small="true" :haveName="false"></author>
        </template>
      </div>
      <h5 class="card-title task__teaser-title" @click="toggleExpanded">{{ task.title }}</h5>
      <div class="task__teaser-spacer" @click="toggleExpanded"></div>
      <div class="task__teaser-deadline" v-if="task.deadline">
        {{ task.deadline | fromNow }}
      </div>
      <div class="task__teaser-comments" v-if="commentsCount">
        <i class="fa fa-comment"></i>
        <span class="task__teaser-comments-label">{{ commentsCount }}</span>
      </div>
    </div>

    <template v-if="!inEdit && canExpand">
      <button class="btn btn-link task__expander" @click="toggleExpanded">
        <i class="fa fa-angle-double-up" v-if="isExpanded"></i>
        <i class="fa fa-angle-double-down" v-else></i>
      </button>
    </template>
  </div>
</template>

<script>
  import fromNow from '@/utils/fromNow';
  import Comments from '@/containers/Comments';
  import UserPicker from '@/components/UserPicker';
  import DatePicker from '@/components/DatePicker';
  import Author from '@/components/Author';
  import Editor from '@/components/Editor';

  export default {
    name: 'task',
    props: {
      task: {
        type: Object
      },
      project: {
        type: Object
      },
      teammates: {
        type: Array
      },
      canExpand: {
        type: Boolean,
        'default': true
      },
      canEdit: {
        type: Boolean,
        'default': true
      },
    },
    components: {Comments, UserPicker, DatePicker, Author, Editor},

    data() {
      const task = this.task;
      const isTitleEmpty = !task.title;

      return {
        deadline: task.deadline,
        performers: task.performers,
        followers: task.followers,
        done: task.done,

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

      toggleExpanded() {
        this.isExpanded = !this.isExpanded;
      },

      toggleDone() {
        const done = !this.task.done;

        this.updateTask({done});
        this.logAction('marked as ' + (done ? 'done' : 'undone'));
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
        if (this.isNew) {
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
        return this.project && this.project._id;
      },

      title: {
        get () {
          return this.task.title
        },
        set (title) {
          this.updateTask({title});
        }
      },

      titlePlaceholder() {
        return this.canEdit ? 'Click to edit title' : '';
      },

      text: {
        get () {
          return this.task.text
        },
        set (text) {
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
        return this.task.comments.map((id) => {
          return this.$store.state.comments[id];
        })
      },

      user() {
        return this.$store.getters.user;
      }
    }
  }
</script>

<style lang="scss">
  .task {
    position: relative;
    transition: height 200ms ease-in-out;

    &__expander {
      padding: 0.5rem;
      font-size: 1rem;
      position: absolute;
      top: 0;
      right: 0;
      height: 39px;
      color: #818a91;
      background: #f7f7f9;
      cursor: pointer;
      border-left: 1px solid rgba(0, 0, 0, 0.125);
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0 0 0 0.25rem;
    }

    &_done &__expander {
      color: white;
      background: #5cb85c;
    }

    &__title-input {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.1;
      color: #2c3e50;
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
    }

    &__action-members {
      padding: .5rem 1rem;
    }

    &__action {
      margin-right: 1rem;
      display: inline-block;
      font-size: 13px;
      cursor: pointer;
    }

    &__action_align_right {
      margin-left: auto;
    }

    &_no-expand &__action_last,
    &_edit &__action_last {
      margin-right: 0;
    }

    &__teaser {
      padding: 0.5rem 1rem;
      padding-right: 38px;
      height: 38px;
      font-size: 1rem;
      display: flex;
      align-items: center;
    }

    &__teaser-title {
      margin-bottom: 0;
      cursor: pointer;
      flex: 1 1 0;
    }

    &__teaser-performer {
      margin-right: .5rem;
      display: inline-flex;
      align-items: center;
    }

    &__teaser-spacer {
      margin-left: auto;
      cursor: pointer;
    }

    &__teaser-deadline {
      margin-right: .5rem;
      display: inline-flex;
      align-items: center;
    }

    &__teaser-comments {
      margin-right: .5rem;
      display: inline-flex;
      align-items: center;
      color: #5d5d5d;
    }

    &__teaser-comments-label {
      margin-left: 4px;
    }
  }
</style>
