<template>
  <div class="task card" :class="{ 'task_expanded': isExpanded, 'task_edit': inEdit, 'task_done': task.done, 'task_no-expand': !canExpand }">
    <template v-if="isExpanded">
      <div class="card-block">
        <div class="task__actions">
          <user-picker
            label="Add Performer"
            class="task__action"
            :members="teammates"
            :selectedMembers="task.performer"
            v-on:change="onPerformerChange"
          />
          <user-picker
            label="Add Followers"
            class="task__action"
            :multiple="true"
            :members="teammates"
            :selectedMembers="task.followers"
            v-on:change="onFollowersChange"
          />

          <div class="task__action task__action_align_right task__action_last">
            <form action="" class="form-inline">
              <div class="form-group">
                <label for="deadline" class="task__form-label">Deadline</label>

                <input type="date"
                       class="form-control"
                       v-model="deadline"
                       v-on:blur="onDeadlineChange"
                       id="deadline"
                       placeholder="Deadline"
                />
              </div>
            </form>
          </div>
        </div>

        <div class="task__content">
          <h4 class="card-title" v-show="!inEdit" v-on:click="onTitleClick">{{ task.title }}</h4>
          <p class="card-text task__text" v-show="!inEdit" v-on:click="onTextClick">{{ task.text }}</p>

          <form
            class="task__edit-form"
            v-on:submit.prevent="onSubmit"
            v-show="inEdit"
          >
            <div class="form-group">
              <label for="task-title" class="sr-only">Title</label>
              <input
                v-model="title"
                type="text"
                class="task__edit-input-title form-control"
                id="task-title"
                placeholder="Enter Task Title..."/>
            </div>
            <div class="form-group">
              <label for="task-description" class="sr-only">Description</label>
              <textarea
                v-model="text"
                class="task__edit-input-desc form-control"
                id="task-description"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="!title">Save</button>
              <button class="btn btn-secondary" v-on:click="onCancelClick">Cancel</button>
            </div>
          </form>
        </div>

        <div class="task__meta" v-if="!inEdit">
          <div class="task__meta-action task__meta-action_align_right">
            <button
              class="btn"
              :class="{'btn-secondary': !task.done, 'btn-success': task.done}"
              v-on:click="toggleDone"
            >
              {{ task.done ? 'Mark Undone' : 'Mark as Done' }}
            </button>
          </div>
        </div>
        <!-- /.task__meta -->
      </div>

      <comments
        :items.sync="comments"
        type="tasks"
        :entity="task"
        v-if="!inEdit"
      ></comments>
    </template>
    <template v-else>
      <div class="task__teaser">
        <div class="task__teaser-performer">
          <author :item="task.performer" :small="true" :haveName="false"></author>
        </div>
        <h5 class="card-title task__teaser-title">{{ task.title }}</h5>
        <div class="task__teaser-deadline">{{ task.deadline | fromNow }}</div>
        <div class="task__teaser-comments" v-if="commentsCount">
          <i class="fa fa-comment"></i>
          <span class="task__teaser-comments-label">{{ commentsCount }}</span>
        </div>
      </div>
    </template>

    <template v-if="!inEdit && canExpand">
      <div class="task__expander" v-on:click="toggleExpanded">
        <i class="fa fa-angle-double-up" aria-hidden="true" v-if="isExpanded"></i>
        <i class="fa fa-angle-double-down" aria-hidden="true" v-else></i>
      </div>
    </template>
  </div>
</template>

<script>
  import fromNow from '@/utils/fromNow';
  import Comments from '@/components/Comments';
  import UserPicker from '@/components/UserPicker';
  import Author from '@/components/Author';

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
      }
    },
    components: {Comments, UserPicker, Author},

    data() {
      const task = this.task;
      const isTitleEmpty = !task.title;

      return {
        title: task.title,
        text: task.text,
        deadline: task.deadline,
        performer: task.performer,
        follower: task.follower,
        done: task.done,

        inEdit: isTitleEmpty,
        isExpanded: (isTitleEmpty === true) || this.canExpand === false,
        isNew: isTitleEmpty
      }
    },

    methods: {
      onSubmit() {
        this.inEdit = false;

        this.updateTask({title: this.title, text: this.text});
        this.logAction(this.isNew ? 'created' : 'updated');
      },

      updateTask(params) {
        params._id = this.task._id;

        this.$store.commit('updateTask', {task: params});
      },

      logAction(action) {
        if (this.task.title) {
          this.$store.commit('logAction', {
            author: this.user,
            action,
            entity: {
              _id: this.task._id,
              title: this.task.title
            },
            route: {name: 'task', params: {id: this.task._id}}
          });
        }
      },

      toggleExpanded() {
        this.isExpanded = !this.isExpanded;
      },

      onTextClick() {
        this.inEdit = true;
      },

      onTitleClick() {
        this.inEdit = true;
      },

      onCancelClick() {
        this.$store.commit('removeTask', {task: this.task, project: this.project});
      },

      onPerformerChange(user) {
        console.log('performer change', user);

        this.updateTask({performer: user});
        this.logAction('changed performer on');
      },

      onFollowersChange(users) {
        console.log('follower change', users);

//        this.updateTask({follower: user});
//        this.logAction('changed follower on');
        this.$store.commit('addFollowersToTask', {task: this.task, users})
      },

      onDeadlineChange() {
        this.updateTask({deadline: this.deadline});
        this.logAction('changed deadline on');
      },

      onCancelClick() {
        this.$store.commit('removeTask', {task: this.task, project: this.project});
      },

      toggleDone() {
        const done = !this.task.done;

        this.updateTask({done});
        this.logAction('marked as ' + (done ? 'done' : 'undone'));
      }
    },

    filters: {
      fromNow
    },

    computed: {
      commentsCount() {
        return this.comments.length ? this.comments.length : false
      },

      comments() {
        return this.task.comments.map((id) => {
          return this.$store.state.comments[id];
        })
      },

      user() {
        return this.$store.state.user;
      }
    }
  }
</script>

<style lang="scss">
  .task {
    position: relative;

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

    &__editable-title,
    &__editable-text {
      min-height: 28px;
    }

    &_done &__expander {
      color: white;
      background: #5cb85c;
    }

    &__meta {
      margin-top: .5rem;
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

    &__form-label {
      margin-right: .5rem;
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
    }

    &__teaser-performer {
      margin-right: .5rem;
      display: inline-flex;
      align-items: center;
    }

    &__teaser-deadline {
      margin-right: .5rem;
      margin-left: auto;
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
