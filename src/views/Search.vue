<template>
  <div class="container search-view">
    <div class="card-body">
      <h3 class="card-title">Search results for "{{ query }}"</h3>
    </div>
    <group-list class="group-list">
      <!-- Projects -->
      <template v-for="item in foundProjects">
        <project-group
          class="group-list__item"
          :item="item"
          :key="item._id"
        ></project-group>
      </template>
    </group-list>
    <task-list :items="foundTasks"></task-list>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import TaskList from "@/containers/TaskList";
import GroupList from "@/components/GroupList";
import ProjectGroup from "@/containers/ProjectGroup";

function createFuse(items, keys) {
  const options = { keys, shouldSort: true },
    transformedItems = JSON.parse(JSON.stringify(items));

  return new Fuse(transformedItems, options);
}

export default {
  name: "search-view",

  components: { TaskList, GroupList, ProjectGroup },

  data() {
    return {
      foundItems: []
    };
  },

  watch: {
    query: "performSearch"
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
          [
            {
              name: "title",
              weight: 0.3
            },
            {
              name: "username",
              weight: 0.3
            },
            {
              name: "text",
              weight: 0.7
            }
          ]
        );
      }

      this.foundItems = this.fuse.search(this.query);
    },

    tasksCount: function(prj) {
      return (prj.tasks && prj.tasks.length) || 0;
    },

    docsCount: function(prj) {
      return (prj.docs && prj.docs.length) || 0;
    }
  },

  computed: {
    query() {
      return this.$route.params.query;
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
      return this.foundItems.filter(item => item.type === "task");
    },

    foundDocs() {
      return this.foundItems.filter(item => item.type === "doc");
    },

    foundProjects() {
      return this.foundItems.filter(item => item.type === "project");
    },

    foundMates() {
      return this.foundItems.filter(item => item.type === "teammate");
    }
  }
};
</script>

<style lang="scss">
.search-view {
  &__section {
    margin-bottom: 1rem;
  }

  &__item {
    margin-bottom: 0.5rem;
  }
}
</style>
