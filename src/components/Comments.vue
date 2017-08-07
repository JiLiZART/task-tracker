<template>
  <div class="list-group list-group-flush comments">
    <template v-for="(item, index) in items">
      <div class="list-group-item flex-column align-items-start comments__item">
        <div class="d-flex w-100 justify-content-between">
          <div class="mb-1">
            <author :item="item.user"></author>
          </div>
          <small><timeago :since="item.created"></timeago></small>
        </div>
        <p class="mb-1" v-html="item.text">{{ item.text }}</p>
      </div>
    </template>

    <div class="list-group-item flex-column align-items-start comments__item">
      <div class="d-flex w-100 justify-content-between">
        <author :item="user"></author>
      </div>

      <template v-if="isFormShown">
        <form
          class="comments__form"
          v-on:submit.prevent="onSubmit"
        >
          <div class="form-group">
            <editor
              class="comments__editor"
              :text="text"
              placeholder="Comment here..."
              @change="onTextChange">
            </editor>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary" :disabled="!text">Reply to</button>
            <button class="btn btn-secondary" v-on:click="onCancelClick">Cancel</button>
          </div>
        </form>
      </template>
      <template v-if="!isFormShown">
        <button class="btn btn-link comments__reply-btn" v-on:click="showForm">Reply to</button>
      </template>
    </div>
  </div>
</template>

<script>
  import fromNow from '@/utils/fromNow';
  import Author from '@/components/Author';
  import Editor from '@/components/Editor';

  export default {
    name: 'comments',
    props: {
      items: {type: Array},
      type: {type: String},
      entity: {type: Object}
    },
    components: {Author, Editor},

    data: function () {
      return {
        text: null,
        editableItems: this.items,

        isFormShown: false
      };
    },

    methods: {
      onSubmit() {
        const comment = {
          user: this.user,
          text: this.text
        };

        this.text = null;

        this.$store.commit('createComment', {comment, type: this.type, entity: this.entity});
      },

      onCancelClick() {
        this.isFormShown = false;
      },

      onTextChange(text) {
        this.text = text;
      },

      showForm() {
        this.isFormShown = true;
      }
    },

    computed: {
      user() {
        return this.$store.state.user;
      }
    },

    filters: {
      fromNow
    }
  }
</script>

<style lang="scss">
  .comments {
    &__form {
      margin-top: 1rem;
      width: 100%;
    }

    &__reply-btn {
      margin-top: 1rem;
    }
  }
</style>
