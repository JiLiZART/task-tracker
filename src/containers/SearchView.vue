<template>
  <div class="container">
    <div class="card search-view">
      <div class="card-block">
        <h4 class="card-title">Search results for "{{query}}"</h4>

        <div class="card " v-if="foundTasks && foundTasks.length">
          <div class="card-block">
            <h5 class="card-title">Tasks</h5>
            <template v-for="(item, index) in foundTasks">
              <div class="search-view__task">
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
        <div v-else>
          <div class="card-text">Nothing found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Fuse from 'fuse.js';
  import Vue from 'vue';
  import Task from '@/components/Task';

  function createFuse(items, keys) {
    const options = {
      keys,
      id: '_id'
    };

    const transformedItems = JSON.parse(JSON.stringify(items));

    return new Fuse(transformedItems, options);
  }

  export default {
    name: 'search-view',

    components: {Task},

    data() {
      return {
        foundProjects: [],
        foundTasks: [],
        foundDocs: []
      }
    },

    watch: {
      'query': 'performSearch'
    },

    methods: {
      performSearch() {
        console.log('perform search');

        if (!this.fuseTasks) {
          this.fuseTasks = createFuse(this.tasks,
            [{
              name: 'title',
              weight: 0.3
            }, {
              name: 'text',
              weight: 0.7
            }]
          )
        }

        this.foundTasks = this
          .fuseTasks
          .search(this.query)
          .map((id) => this.$store.state.tasks[id]);
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
    }
  }
</script>

<style lang="scss">

  .search-view {
    &__task {
      margin-bottom: .5rem;
    }
  }
</style>
