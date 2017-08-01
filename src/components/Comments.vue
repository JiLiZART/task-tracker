<template>
  <div class="list-group comments">
    <template v-for="(item, index) in items">
      <div class="list-group-item flex-column align-items-start comments__item">
        <div class="d-flex w-100 justify-content-between">
          <div class="mb-1">
            <author :item="item.user"></author>
          </div>
          <small><timeago :since="item.created"></timeago></small>
        </div>
        <p class="mb-1">{{ item.text }}</p>
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
            <label for="commentText" class="sr-only">Comment</label>
            <textarea
              v-model="text"
              class="form-control comments__textarea"
              id="commentText"
              rows="3"
            ></textarea>
          </div>
          <button
            :disabled="!text"
            type="submit"
            class="btn btn-primary">Reply to
          </button>
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
  import uuidv4 from 'uuid/v4';

  export default {
    name: 'comments',
    props: {
      items: {type: Array},
      type: {type: String},
      entity: {type: Object}
    },
    components: {Author},

    data: function () {
      return {
        text: null,
        editableItems: this.items,

        isFormShown: false
      };
    },

    methods: {
      onSubmit: function () {
        const id = uuidv4();
        const comment = {
          _id: id,
          user: this.user,
          text: this.text,
          created: new Date()
        };

        this.text = '';

        this.$store.commit('createComment', {comment, type: this.type, entity: this.entity});
      },

      showForm: function () {
        this.isFormShown = true;
      }
    },

    computed: {
      user() {
        return this.$store.state.user;
      }
    },

    filters: {
      fromNow: fromNow
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
