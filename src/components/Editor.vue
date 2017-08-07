<template>
  <quill-editor class="editor"
                ref="textEditor"
                :class="{'editor_focused': isFocused, 'editor_disabled': disabled}"
                :content="text"
                :options="editorOption"
                :placeholder="placeholder"
                :disabled="disabled"
                @focus="onFocus"
                @blur="onBlur"
                @change="onChange($event)">
  </quill-editor>
</template>

<script>
  export default {
    name: 'editor',

    props: {
      placeholder: {type: String},
      text: {type: String},
      canEdit: {type: Boolean, 'default': true},
      light: {type: Boolean, 'default': true}
    },

    data() {
      return {
        isFocused: false,

        editorOption: {
          theme: this.light ? 'bubble' : 'snow',
          placeholder: this.placeholder,
          modules: {
            toolbar: this.light ? [
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link', 'image'],
              ['clean']
            ] : null
          }
        }
      }
    },

    mounted() {
      if (this.disabled) {
        this.editor.disable();
      }
    },

    methods: {
      onFocus() {
        if (!this.disabled) {
          this.isFocused = true
        }
      },

      onBlur() {
        if (!this.disabled) {
          this.isFocused = false
        }
      },

      onChange({editor, html, text}) {
        this.$emit('change', html);
      }
    },

    computed: {
      disabled() {
        return !this.canEdit;
      },

      editor() {
        return this.$refs.textEditor.quill
      }
    }
  }
</script>

<style lang="scss">
  .editor {
    font-family: inherit;

    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.25;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

    &:hover {
      border-color: rgba(0, 0, 0, 0.05);
    }

    &_focused,
    &_focused:hover,
    &:focus {
      border-color: rgba(0, 0, 0, 0.15);
    }

    &_disabled {
      &:hover {
        border-color: transparent;
      }
    }

    .ql-editor {
      padding: 0;
      line-height: 1.25;
      min-height: 78px;
    }

    .ql-container {
      font-size: 1rem;
      line-height: 1.25;
      font-family: inherit;
    }
  }
</style>
