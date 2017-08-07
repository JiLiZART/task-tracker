<template>
  <quill-editor class="editor"
                ref="textEditor"
                :class="editorClasses"
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
      light: {type: Boolean, 'default': true},
      bordered: {type: Boolean, 'default': false}
    },

    data() {
      const fullToolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': [3, 4, 5, 6, false]}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        //[{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        //[{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        //[{'font': []}],
        [{'align': []}],

        ['link', 'image'],

        ['clean']                                         // remove formatting button
      ];

      const lightToolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image'],
        ['clean']
      ];

      return {
        isFocused: false,

        editorOption: {
          theme: this.light ? 'bubble' : 'snow',
          placeholder: this.placeholder,
          modules: {
            toolbar: this.light ? lightToolbarOptions : fullToolbarOptions
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
      editorClasses() {
        return {
          'editor_focused': this.isFocused,
          'editor_disabled': this.disabled,
          'editor_bordered': this.bordered
        };
      },

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
    padding: 0;
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

    &_bordered {
      border-color: rgba(0, 0, 0, 0.15);

      &:hover {
        border-color: rgba(0, 0, 0, 0.15);
      }
    }

    .ql-editor {
      padding: 0;
      line-height: 1.25;
      min-height: 78px;
    }

    .ql-container {
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      line-height: 1.25;
      font-family: inherit;
    }

    .ql-container.ql-snow,
    .ql-toolbar.ql-snow {
      border: none;
    }
  }
</style>
