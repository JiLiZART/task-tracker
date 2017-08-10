<template>
  <div class="card project" :class="{'project_editable': canEdit}">
    <div class="card-block">
      <form
        class="project__form"
        v-on:submit.prevent="onSubmit"
      >
        <h4 class="card-title project__name">
          <input class="form-control form-control_transparent project__name-input"
                 v-model="title"
                 :placeholder="titlePlaceholder"
                 :readonly="!canEdit"
                 required
          />
        </h4>
        <div class="card-text project__text" v-show="text && canEdit">
          <editor class="project__text-editor"
                  :text="text"
                  :placeholder="textPlaceholder"
                  @change="onEditorChange"
                  :canEdit="canEdit">
          </editor>
        </div>
      </form>
    </div>

    <div class="project__tasks card-block" v-if="haveTasks || canCreate">
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
              v-on:change="onTaskChange"
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
              v-on:change="onTaskChange"
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
              v-on:change="onTaskChange"
            ></task>
          </template>
        </template>
      </template>
      <template v-else>
        <div class="card card-outline-secondary" v-if="canCreate">
          <div class="card-block">
            <p class="card-text">There are no tasks. Try to create one and assign to someone.</p>
          </div>
        </div>
      </template>

      <div class="project__actions" v-if="canCreate">
        <button class="btn btn-link card-link" v-on:click="createTask">
          <i class="fa fa-tasks"></i>
          Create Task
        </button>
      </div>
    </div>

    <div class="card-block project__docs" v-if="haveDocs || canCreate">
      <template v-if="haveDocs">
        <template v-for="(item, index) in docs">
          <document
            :key="item._id"
            :index="index"
            :id="item._id"
            :doc.sync="item"
            :project="project"
            :teammates="teammates"
            v-on:change="onDocChange"
          ></document>
        </template>
      </template>
      <template v-else-if="canCreate">
        <div class="card card-outline-secondary">
          <div class="card-block">
            <p class="card-text">There are no documents. Try to add one.</p>
          </div>
        </div>
      </template>

      <div class="project__actions" v-if="canCreate">
        <button class="btn btn-link card-link" v-on:click="createDoc">
          <i class="fa fa-file-text"></i>
          Create Document
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Document from '@/containers/Document';
  import Task from '@/containers/Task';
  import Editor from '@/components/Editor';

  import uuidv4 from 'uuid/v4';

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

    components: {Document, Task, Editor},

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
      },

      onEditorChange(text) {
        this.updateProject({text});
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
      title: {
        get() {
          return this.project.title
        },
        set(title) {
          this.updateProject({title});
        }
      },

      titlePlaceholder() {
        return this.canEdit ? 'Click to edit title' : '';
      },

      text: {
        get() {
          return this.project.text
        },
        set(text) {
          this.updateProject({text});
        }
      },

      textPlaceholder() {
        return this.canEdit ? 'Click to edit description' : '';
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

    &__tasks .task {
      margin-bottom: .5rem;
    }

    &__docs .doc {
      margin-bottom: .5rem;
    }
  }
</style>
