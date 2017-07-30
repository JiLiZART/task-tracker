<template>
  <div class="doc card" :class="{ 'doc_expanded': isExpanded, 'doc_edit': inEdit }">
    <template v-if="isExpanded">
      <div class="card-block">
        <div class="doc__content">
          <h5 class="card-title" v-show="!inEdit" v-on:click="onTitleClick">{{ title }}</h5>
          <p class="card-text doc__text" v-show="!inEdit" v-on:click="onTextClick">{{ text }}</p>

          <form
            class="doc__edit-form"
            action=""
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
              <label for="doc-description" class="sr-only">Description</label>
              <textarea
                v-model="text"
                class="doc__edit-input-desc form-control"
                id="doc-description"
                rows="3"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="!title">Save</button>
          </form>
        </div>
      </div>

      <comments
        :items.sync="comments"
        type="docs"
        :entity="doc"
        v-if="!inEdit"
        v-on:change="onCommentsChange"
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
  import Comments from '@/components/Comments';

  export default {
    name: 'document',
    props: {
      doc: {
        type: Object
      },
      teammates: {
        type: Array
      }
    },
    components: {Comments},

    data: function () {
      var doc = this.doc || {};
      var inEdit = !doc.title;

      return {
        title: doc.title,
        text: doc.text,

        inEdit: inEdit,
        isExpanded: inEdit === true,
        isNew: !doc.title
      }
    },

    methods: {
      onSubmit: function () {
        this.inEdit = false;

        this.updateDoc({title: this.title, text: this.text});

//        this.$emit('update:task', this.doc);
//        this.$emit('change', this.doc);

//        logAction(this.isNew ? 'created document' : 'updated document', {
//          title: this.doc.title,
//          url: 'doc.html?id=' + this.doc.id
//        });
      },

      updateDoc(params) {
        params._id = this.doc._id;

        this.$store.commit('updateDoc', {doc: params});
      },

      toggleExpanded: function () {
        this.isExpanded = !this.isExpanded;
      },

      onTextClick: function () {
        this.inEdit = true;
      },

      onTitleClick: function () {
        this.inEdit = true;
      },

      onCommentsChange: function () {
        this.doc.comments = this.comments;

        this.$emit('update:task', this.doc);
        this.$emit('change', this.doc);

//        logAction('commented on document', {
//          title: this.doc.title,
//          url: 'doc.html?id=' + this.doc.id
//        });
      }
    },

    filters: {
      fromNow: fromNow
    },

    computed: {
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
