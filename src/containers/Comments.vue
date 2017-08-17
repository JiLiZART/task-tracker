<template>
  <div class="list-group list-group-flush comments">
    <template v-for="(item, index) in items">
      <div class="list-group-item flex-column align-items-start comments__item">
        <div class="d-flex w-100 justify-content-between">
          <div class="mb-1">
            <author :item="item.user"></author>
          </div>
          <small>
            <timeago :since="item.created"></timeago>
          </small>
        </div>
        <p class="mb-1" v-html="item.text">{{ item.text }}</p>
      </div>
    </template>

    <div class="list-group-item flex-column align-items-start comments__item">
      <div class="d-flex w-100 justify-content-between">
        <author :item="user"></author>
      </div>

      <template v-if="inEdit">
        <form
            class="comments__form"
            @submit.prevent="onSubmit"
        >
          <div class="form-group">
            <editor
                class="comments__editor"
                @change="onTextChange"
                ref="textEditor"
                :text="text"
                :placeholder="textPlaceholder"
                :bordered="true"
                >
            </editor>
          </div>

          <div class="form-group">
            <button class="btn btn-primary" :disabled="!text">Reply to</button>
            <button class="btn btn-secondary" type="button" @click="onCancelClick">Cancel</button>
          </div>
        </form>
      </template>
      <template v-if="!inEdit">
        <button class="btn btn-link comments__reply-btn" @click="showForm">Reply to</button>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import Vue from 'vue';
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

    data() {
      return {
        text: null,
        inEdit: false
      };
    },

    methods: {
      onSubmit() {
        const comment = {
          user: this.user,
          text: this.text
        };

        this.text = null;

        this.createComment({comment, type: this.type, typeId: this.entity._id});
      },

      onCancelClick() {
        this.inEdit = false;
      },

      onTextChange(text) {
        this.text = text;
      },

      showForm() {
        this.inEdit = true;

        Vue.nextTick(() => {
          this.textEditor.focus();
        });
      },

      ...mapMutations([
        'createComment'
      ]),
    },

    computed: {
      textPlaceholder() {
        return 'Comment here...';
      },

      textEditor() {
        return this.$refs.textEditor;
      },

      user() {
        return this.$store.getters.user;
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
