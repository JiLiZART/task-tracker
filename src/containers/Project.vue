<template>
  <div class="card project" :class="{'project_editable': canEdit}">
    <div class="card-body">
      <form
          class="project__form"
          @blur="onCancelClick"
          @submit.prevent="onSubmit"
      >
        <div class="form-group">
          <h4 class="card-title project__name" @click="onTitleClick">
            <input class="form-control project__name-input"
                   :class="{'form-control_transparent': !inEdit}"
                   v-model="title"
                   v-focus="titleFocused"
                   :placeholder="titlePlaceholder"
                   :readonly="!inEdit"
                   required
            />
          </h4>
          <div class="card-text project__text" v-show="text || inEdit" @click="onTextClick">
            <editor class="project__text-editor"
                    @change="onEditorChange"
                    ref="textEditor"
                    :text="text"
                    :placeholder="textPlaceholder"
                    :bordered="inEdit"
                    :canEdit="inEdit">
            </editor>
          </div>
        </div>

        <div class="form-group" v-show="inEdit">
          <button class="btn btn-primary" :disabled="!title">Save</button>
          <button class="btn btn-secondary" type="button" @click="onCancelClick">Cancel</button>
        </div>
      </form>
    </div>

    <div class="project__tasks card-body" v-if="haveTasks || canCreate">
      <template v-if="tasks && tasks.length">
        <template v-if="filterCompleted">
          <template v-for="(item, index) in filterUndoneTasks(tasks)">
            <task
                :key="item._id"
                :index="index"
                :id="item._id"
                :task.sync="item"
                :project="project"
                :teammates="teammates"
                @change="onTaskChange"
            ></task>
          </template>

          <h5 class="card-title" v-if="filterDoneTasks(tasks).length">Recently done tasks</h5>

          <template v-for="(item, index) in filterDoneTasks(tasks)">
            <task
                :key="item._id"
                :index="index"
                :id="item._id"
                :task.sync="item"
                :project="project"
                :teammates="teammates"
                @change="onTaskChange"
            ></task>
          </template>
        </template>
        <template v-else>
          <template v-for="(item, index) in tasks">
            <task
                :key="item._id"
                :index="index"
                :id="item._id"
                :task.sync="item"
                :project="project"
                :teammates="teammates"
                @change="onTaskChange"
            ></task>
          </template>
        </template>
      </template>
      <template v-else>
        <div class="card card-outline-secondary" v-if="canCreate">
          <div class="card-body">
            <p class="card-text">There are no tasks. Try to create one and assign to someone.</p>
          </div>
        </div>
      </template>

      <div class="project__actions" v-if="canCreate">
        <button class="btn btn-link card-link project__action-button" @click="createTask">
          <i class="fa fa-tasks"></i>
          Create Task
        </button>
      </div>
    </div>

    <div class="card-body project__docs" v-if="haveDocs || canCreate">
      <template v-if="haveDocs">
        <template v-for="(item, index) in docs">
          <document
              :key="item._id"
              :index="index"
              :id="item._id"
              :doc.sync="item"
              :project="project"
              :teammates="teammates"
              @change="onDocChange"
          ></document>
        </template>
      </template>
      <template v-else-if="canCreate">
        <div class="card card-outline-secondary">
          <div class="card-body">
            <p class="card-text">There are no documents and conversations. Try to add one.</p>
          </div>
        </div>
      </template>

      <div class="project__actions" v-if="canCreate">
        <button class="btn btn-link card-link project__action-button" @click="createDoc">
          <i class="fa fa-file-text"></i>
          Add document or start a conversation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mixin as focusMixin} from 'vue-focus';

  import Document from '@/containers/Document';
  import Task from '@/containers/Task';
  import Editor from '@/components/Editor';

  export default {
    name: 'project',
    props: {
      project: {type: Object},
      tasks: {type: Array},
      docs: {type: Array},
      canCreate: {
        type: Boolean,
        'default': true
      },
      canEdit: {
        type: Boolean,
        'default': true
      },
      filterCompleted: {
        type: Boolean,
        'default': false
      }
    },

    mixins: [focusMixin],
    components: {Document, Task, Editor},

    data() {
      const project = this.project || {};
      const isTitleEmpty = !project.title;

      return {
        title: project.title,
        text: project.text,

        inEdit: project.isNew || isTitleEmpty,
        isNew: project.isNew,

        titleFocused: false
      }
    },

    methods: {
      updateProject(params) {
        params._id = this.project._id;

        this.$store.commit('updateProject', params);
      },

      createTask() {
        this.$store.commit('createTask', {
          project: this.project
        });
      },

      createDoc() {
        this.$store.commit('createDoc', {
          project: this.project
        });
      },

      filterUndoneTasks(tasks) {
        return tasks.filter(t => !t.done);
      },

      filterDoneTasks(tasks) {
        return tasks.filter(t => t.done);
      },

      onSubmit() {
        this.inEdit = false;
        this.titleFocused = false;

        this.updateProject({title: this.title, text: this.text, isNew: false});
      },

      onEditorChange(text) {
        this.text = text;
      },

      onTitleClick() {
        this.inEdit = true;
        this.titleFocused = true;
      },

      onTextClick() {
        this.inEdit = true;

        Vue.nextTick(() => {
          this.textEditor.focus();
        });
      },

      onCancelClick() {
        this.inEdit = false;

        this.title = this.project.title;
        this.text = this.project.text;
      },

      onTaskChange: function (task) {
        this.$emit('update:project', this.project);
        this.$emit('change:task', task);
      },

      onDocChange: function (doc) {
        this.$emit('update:project', this.project);
        this.$emit('change:doc', doc);
      }
    },

    computed: {
      titlePlaceholder() {
        return this.canEdit ? 'Click to edit title' : '';
      },

      textPlaceholder() {
        return this.canEdit ? 'Click to edit description' : '';
      },

      textEditor() {
        return this.$refs.textEditor
      },

      haveDocs() {
        return this.docs && this.docs.length;
      },

      haveTasks() {
        return this.tasks && this.tasks.length;
      },

      teammates() {
        return this.$store.getters.teammates;
      }
    }
  };
</script>

<style lang="scss">
  .project {
    margin-bottom: 30px;

    &__name-input {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.1;
    }

    &__name-input:hover,
    &__text-editor:hover {
      cursor: text;
    }

    &__tasks .task {
      margin-bottom: .5rem;
    }

    &__docs .doc {
      margin-bottom: .5rem;
    }

    &__actions {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
