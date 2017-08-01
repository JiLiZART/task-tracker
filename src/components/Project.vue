<template>
  <div class="card project" :class="{'project_editable': canEdit}">
    <div class="card-block">
      <form
        class="project__form"
        v-on:submit.prevent="onSubmit"
      >
        <h4 class="card-title project__name">
          <input class="form-control form-control_transparent project__name-input" v-model="title" :readonly="!canEdit" />
        </h4>
        <div class="card-text project__text">
          <textarea class="form-control form-control_transparent project__text-input" v-model="text" :readonly="!canEdit"></textarea>
        </div>
      </form>
    </div>

    <div class="project__tasks card-block">
      <template v-if="tasks && tasks.length">
        <templaate v-if="filterCompleted">
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

          <h5>Recently done tasks</h5>

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
        </templaate>
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
      },
      filterCompleted: {
        type: Boolean,
        'default': false
      }
    },

    components: {Document, Task},

    data: function () {
      //const project = this.project;

      return {
        //inEditName: !project.title,
        //inEditText: !project.text,
        //title: project.title,
        //text: project.text
      }
    },

    methods: {
      onSubmit() {
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

      filterUndoneTasks(tasks) {
        return tasks.filter(t => !t.done);
      },

      filterDoneTasks(tasks) {
        return tasks.filter(t => t.done);
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
      text: {
        get() {
          return this.project.text
        },
        set(text) {
          this.updateProject({text});
        }
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
