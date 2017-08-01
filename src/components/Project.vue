<template>
  <div class="card project" :class="{'project_editable': canEdit}">
    <div class="card-block">
      <h4 class="card-title project__name">
        <span v-show="!inEditName" v-on:click="onNameClick">{{ title }}</span>
        <form
          class="project__name-form form-inline"
          v-show="inEditName"
          v-on:submit.prevent="onNameSubmit"
        >

          <label for="description" class="sr-only">Project Name</label>
          <input class="form-control" id="name" v-model="title"/>

          <button type="submit" class="btn btn-primary" :disabled="!title">Save</button>
        </form>
      </h4>
      <div class="card-text project__text">
        <span v-show="!inEditText" v-on:click="onTextClick">{{ text }}</span>

        <form
          class="project__text-form"
          v-on:submit.prevent="onTextSubmit"
          v-show="inEditText"
        >
          <div class="form-group">
            <label for="description" class="sr-only">Description</label>
            <textarea
              class="form-control"
              id="description"
              rows="3"
              v-model="text"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="!text">Save</button>
        </form>
      </div>
    </div>

    <div class="project__tasks card-block">
      <template v-if="tasks && tasks.length">
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
      <template v-else>
        <div class="card card-outline-secondary" v-if="canCreate">
          <div class="card-block">
            <h4 class="card-title">There are no tasks</h4>
            <p class="card-text">Try to create one and assign to someone.</p>
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

    <div class="project__docs card-block">
      <template v-if="docs && docs.length">
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
      <template v-else>
        <div class="card card-outline-secondary" v-if="canCreate">
          <div class="card-block">
            <h4 class="card-title">There are no documents</h4>
            <p class="card-text">Try to add one.</p>
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
  import Document from '@/components/Document';
  import Task from '@/components/Task';
  import fromNow from '@/utils/fromNow';
  import uuidv4 from 'uuid/v4';

  export default {
    name: 'project',
    props: {
      project: {
        type: Object
      },
      tasks: {type: Array},
      docs: {type: Array},
      canCreate: {
        type: Boolean,
        'default': true
      },
      canEdit: {
        type: Boolean,
        'default': true
      }
    },

    components: {Document, Task},

    data: function () {
      const project = this.project;

      return {
        inEditName: !project.title,
        inEditText: !project.text,
        title: project.title,
        text: project.text
      }
    },

    methods: {
      onTextSubmit: function () {
        this.inEditText = false;

        this.updateProject({text: this.text});
      },

      onTextClick: function () {
        this.canEdit && (this.inEditText = true);
      },

      onNameSubmit: function () {
        this.inEditName = false;

        this.updateProject({title: this.title});

      },

      onNameClick: function () {
        this.canEdit && (this.inEditName = true);
      },

      updateProject(params) {
        params._id = this.project._id;

        this.$store.commit('updateProject', params);
      },

      createTask() {
        const id = uuidv4();

        this.$store.commit('createTask', {
          task: {_id: id, title: ''},
          project: this.project
        });
      },

      createDoc() {
        const id = uuidv4();

        this.$store.commit('createDoc', {
          doc: {_id: id, title: ''},
          project: this.project
        });
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
      teammates() {
        return this.$store.getters.teammates;
      }
    }
  };
</script>

<style lang="scss">
  .project {
    margin-bottom: 30px;

    &_editable &__name,
    &_editable &__text {
      cursor: pointer;
    }

    &__tasks .task {
      margin-bottom: .5rem;
    }

    &__docs .doc {
      margin-bottom: .5rem;
    }
  }
</style>
