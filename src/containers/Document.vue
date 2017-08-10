<template>
  <div class="doc card" :class="{ 'doc_expanded': isExpanded, 'doc_edit': inEdit }">
    <template v-if="isExpanded">
      <div class="card-block">
        <div class="doc__actions">
          <user-picker
            label="Add Followers"
            class="doc__action"
            :multiple="true"
            :members="teammates"
            :selectedMembers="doc.followers"
            v-on:change="onFollowersChange"
          ></user-picker>
        </div>
        <div class="doc__content">
          <h5 class="card-title" v-show="!inEdit" v-on:click="onTitleClick">{{ title }}</h5>

          <editor
            v-show="!inEdit"
            class="doc__text-editor"
            :bordered="false"
            :text="text"
            :placeholder="textPlaceholder"
            :canEdit="false"
            @change="onEditorChange">
          </editor>

          <form
            class="doc__edit-form"
            v-on:submit.prevent="onSubmit"
            v-show="inEdit"
          >
            <div class="form-group">
              <label for="doc-title" class="sr-only">Title</label>
              <input
                v-model="title"
                type="text"
                class="doc__edit-input-title form-control"
                id="doc-title"
                placeholder="Enter Doc Title..."/>
            </div>
            <div class="form-group">
              <editor
                class="doc__text-editor"
                :bordered="true"
                :light="false"
                :text="text"
                :placeholder="textPlaceholder"
                @change="onEditorChange">
              </editor>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="!title">Save</button>
              <button class="btn btn-secondary" v-on:click="onCancelClick">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <comments
        type="docs"
        :items.sync="comments"
        :entity="doc"
        v-if="!inEdit"
      ></comments>
    </template>
    <template v-else>
      <div class="doc__teaser">
        <div class="doc__teaser-performer">
          <i class="fa fa-file-text"></i>
        </div>
        <h5 class="card-title doc__teaser-title">{{ title }}</h5>
        <div class="doc__teaser-comments" v-if="commentsCount">
          <i class="fa fa-comment"></i>
          <span class="doc__teaser-comments-label">{{ commentsCount }}</span>
        </div>
      </div>
    </template>

    <template v-if="!inEdit">
      <div class="doc__expander" v-on:click="toggleExpanded">
        <i class="fa fa-angle-double-up" aria-hidden="true" v-if="isExpanded"></i>
        <i class="fa fa-angle-double-down" aria-hidden="true" v-else></i>
      </div>
    </template>
  </div>
</template>

<script>
  import fromNow from '@/utils/fromNow';
  import Comments from '@/containers/Comments';
  import UserPicker from '@/components/UserPicker';
  import Author from "@/components/Author";
  import Editor from '@/components/Editor';

  export default {
    name: 'document',
    props: {
      doc: {type: Object},
      project: {type: Object},
      teammates: {type: Array}
    },
    components: {Author, Comments, UserPicker, Editor},

    data: function () {
      const doc = this.doc || {};
      const inEdit = !doc.title;

      return {
        title: doc.title,
        //text: doc.text,

        inEdit: inEdit,
        isExpanded: inEdit === true,
        isNew: doc.isNew,

        followers: []
      }
    },

    methods: {
      updateDoc(params) {
        params._id = this.doc._id;

        this.$store.commit('updateDoc', {doc: params});
      },

      toggleExpanded() {
        this.isExpanded = !this.isExpanded;
      },

      onSubmit() {
        this.inEdit = false;

        this.updateDoc({title: this.title, text: this.text, isNew: false});
      },

      onEditorChange(text) {
        this.updateDoc({text});
      },

      onTextClick() {
        this.inEdit = true;
      },

      onTitleClick() {
        this.inEdit = true;
      },

      onFollowersChange(users) {
        //this.updateDoc({follower: user});
        console.log('doc follower change', users);
        this.$store.commit('addFollowersToDoc', {doc: this.doc, users})
      },

      onCancelClick() {
        if (this.isNew) {
          this.$store.commit('removeDoc', {doc: this.doc, project: this.project});
        } else {
          this.inEdit = false;
        }
      }
    },

    filters: {
      fromNow
    },

    computed: {
      text: {
        get() {
          return this.doc.text
        },
        set(text) {
          this.updateDoc({text});
        }
      },

      textPlaceholder() {
        return this.canEdit ? 'Click to edit description' : '';
      },

      commentsCount() {
        return this.comments.length ? this.comments.length : false
      },

      comments() {
        return this.doc.comments.map((id) => {
          return this.$store.state.comments[id];
        })
      }
    }
  }
</script>

<style lang="scss">
  .doc {
    position: relative;

    &__expander {
      padding: 0.5rem;
      font-size: 1rem;
      position: absolute;
      top: 0;
      right: 0;
      height: 39px;
      color: #818a91;
      background: #f7f7f9;
      cursor: pointer;
      border-left: 1px solid rgba(0, 0, 0, 0.125);
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0 0 0 0.25rem;
    }

    &__form-label {
      margin-right: .5rem;
    }

    &__actions {
      margin-bottom: 1rem;
      display: flex;
    }

    &__action {
      margin-right: 1rem;
      display: inline-block;
      font-size: 13px;
      cursor: pointer;
    }

    &__action_align_right {
      margin-left: auto;
    }

    &__teaser {
      padding: 0.5rem 1rem;
      padding-right: 38px;
      height: 38px;
      font-size: 1rem;
      display: flex;
      align-items: center;
    }

    &__teaser-title {
      margin-bottom: 0;
    }

    &__teaser-performer {
      margin-right: .5rem;
      display: inline-flex;
      align-items: center;
    }

    &__teaser-comments {
      margin-left: auto;
      margin-right: .5rem;
      display: inline-flex;
      align-items: center;
      color: #5d5d5d;
    }

    &__teaser-comments-label {
      margin-left: 4px;
    }
  }

</style>
