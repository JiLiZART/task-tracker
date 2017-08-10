<template>
  <div class="container">
    <div class="card search-view">
      <div class="card-block">
        <h4 class="card-title">Search results for "{{query}}"</h4>

        <div class="card search-view__section" v-if="foundTasks.length">
          <div class="card-block">
            <h5 class="card-title">Tasks</h5>
            <template v-for="(item, index) in foundTasks">
              <div class="search-view__item">
                <task
                  :key="item._id"
                  :index="index"
                  :id="item._id"
                  :task.sync="item"
                  :teammates="teammates"
                ></task>
              </div>
            </template>
          </div>
        </div>

        <div class="card search-view__section" v-if="foundDocs.length">
          <div class="card-block">
            <h5 class="card-title">Docs</h5>
            <template v-for="(item, index) in foundDocs">
              <div class="search-view__item">
                <document
                  :key="item._id"
                  :index="index"
                  :id="item._id"
                  :doc.sync="item"
                  :teammates="teammates"
                ></document>
              </div>
            </template>
          </div>
        </div>

        <div class="card search-view__section" v-if="foundProjects.length">
          <div class="card-block">
            <h5 class="card-title">Projects</h5>
            <template v-for="(item, index) in foundProjects">
              <router-link class="btn btn-link" :to="{ name: 'project', params: { id: item._id }}">
                {{ item.title }}
                <span class="badge badge-default badge-pill"><i class="fa fa-tasks"></i>{{ tasksCount(item) }}</span>
                <span class="badge badge-default badge-pill"><i class="fa fa-file-text"></i>{{ docsCount(item) }}</span>
              </router-link>
            </template>
          </div>
        </div>

        <div class="card search-view__section" v-if="foundMates && foundMates.length">
          <div class="card-block">
            <h5 class="card-title">Teammates</h5>
            <template v-for="(item, index) in foundMates">
              <router-link :to="{ name: 'member', params: { id: item._id }}">
                <avatar :item="item"></avatar>
              </router-link>
            </template>
          </div>
        </div>

        <div v-if="foundItems.length === 0">
          <div class="card-text">Nothing found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Fuse from 'fuse.js';
  import Vue from 'vue';
  import Task from '@/containers/Task';
  import Document from '@/containers/Document';
  import Project from '@/containers/Project';
  import Avatar from '@/components/Avatar';

  function createFuse(items, keys) {
    const options = {keys, shouldSort: true},
      transformedItems = JSON.parse(JSON.stringify(items));

    return new Fuse(transformedItems, options);
  }

  export default {
    name: 'search-view',

    components: {Task, Document, Project, Avatar},

    data() {
      return {
        foundItems: []
      }
    },

    watch: {
      'query': 'performSearch'
    },

    mounted() {
      this.performSearch();
    },

    methods: {
      performSearch() {
        if (!this.fuse) {
          this.fuse = createFuse(
            []
              .concat(this.projects)
              .concat(this.tasks)
              .concat(this.docs)
              .concat(this.teammates),
            [{
              name: 'title',
              weight: 0.3
            }, {
              name: 'username',
              weight: 0.3
            }, {
              name: 'text',
              weight: 0.7
            }]
          )
        }

        this.foundItems = this.fuse.search(this.query);
      },

      tasksCount: function (prj) {
        return (prj.tasks && prj.tasks.length) || 0
      },

      docsCount: function (prj) {
        return (prj.docs && prj.docs.length) || 0
      }
    },

    computed: {
      query() {
        return this.$route.params.query
      },

      projects() {
        return this.$store.getters.projects;
      },

      tasks() {
        return this.$store.getters.tasks;
      },

      docs() {
        return this.$store.getters.docs;
      },

      teammates() {
        return this.$store.getters.teammates;
      },

      foundTasks() {
        return this.foundItems.filter((item) => item.type === 'task');
      },

      foundDocs() {
        return this.foundItems.filter((item) => item.type === 'doc');
      },

      foundProjects() {
        return this.foundItems.filter((item) => item.type === 'project');
      },

      foundMates() {
        return this.foundItems.filter((item) => item.type === 'teammate');
      }
    }
  }
</script>

<style lang="scss">

  .search-view {
    &__section {
      margin-bottom: 1rem;
    }

    &__item {
      margin-bottom: .5rem;
    }
  }
</style>
