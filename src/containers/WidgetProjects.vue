<template>
  <div class="card card-outline-secondary widget-projects">
    <div class="card-header widget-projects__header">
      <h5 class="card-title widget-projects__title">Projects</h5>

      <ul class="nav nav-pills card-header-pills widget-projects__pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/create-project">Create Project</router-link>
        </li>
      </ul>
    </div>

    <div class="card-body">
      <template v-for="(item, index) in items">
        <router-link class="btn btn-light" :to="{ name: 'project', params: { id: item._id }}">
          {{ item.title }}
          <span class="badge badge-light"><i class="fa fa-tasks"></i>{{ tasksCount(item) }}</span>
          <span class="badge badge-light"><i class="fa fa-file-text"></i>{{ docsCount(item) }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'widget-projects',
    props: {
      items: {
        type: Array
      }
    },

    methods: {
      tasksCount: function (prj) {
        return (prj.tasks && prj.tasks.length) || 0
      },

      docsCount: function (prj) {
        return (prj.docs && prj.docs.length) || 0
      }
    }
  }
</script>

<style lang="scss">
  .widget-projects {
    &__header {
      display: flex;
      align-items: center;
    }

    &__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    &__pills {
      margin-left: auto;
    }
  }
</style>
