<template>
  <drop class="empty-group"
        :class="classObject"
        @drop="onDrop"
        @dragover="dragover = true"
        @dragleave="dragover = false">
    <slot></slot>
  </drop>
</template>

<script>
  export default {
    name: 'EmptyGroup',

    data() {
      return {
        dragover: false
      }
    },

    methods: {
      removeTaskFromProject({project, task}) {
        this.$store.commit('removeTaskFromProject', {project, task});
      },

      onDrop({task, project}) {
        this.dragover = false;

        if (project) {
          this.removeTaskFromProject({task, project})
        }
      }
    },

    computed: {
      classObject() {
        return {
          'empty-group_dragged': this.dragover
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .empty-group {
    padding-bottom: 52px;
    min-height: 52px;
    border-radius: 6px;

    &_dragged {
      background: rgba(0, 0, 0, .06);
    }
  }
</style>
