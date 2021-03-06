<template>
  <span>
    <template v-if="readonly">
      <div
        class="editor"
        :class="editorClasses"
        ref="textEditor"
        v-html="text"
      ></div>
    </template>
    <template v-else>
      <textarea
        ref="textEditor"
        class="form-control editor"
        :class="editorClasses"
        cols="30"
        rows="10"
        :placeholder="placeholder"
        :readonly="readonly"
        v-html="text"
        @focus="onFocus"
        @blur="onBlur"
        @input="onChange"
      >
      </textarea>
    </template>
  </span>
  <!-- <quill-editor class="editor"
                ref="textEditor"
                :class="editorClasses"
                :content="text"
                :options="editorOption"
                :placeholder="placeholder"
                :disabled="disabled"
                @focus="onFocus"
                @blur="onBlur"
                @change="onChange">
  </quill-editor> -->

  <!-- /# -->
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

export default {
  name: "Editor",

  props: {
    placeholder: { type: String },
    text: { type: String },
    light: { type: Boolean, default: true },
    bordered: { type: Boolean, default: false }, //@TODO remove ugly param
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },

  data() {
    const fullToolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: [3, 4, 5, 6, false] }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      //[{'direction': 'rtl'}],                         // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      //[{'header': [1, 2, 3, 4, 5, 6, false]}],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      //[{'font': []}],
      [{ align: [] }],

      ["link", "image"],

      ["clean"] // remove formatting button
    ];

    const lightToolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"]
    ];

    console.log("text", this.text);

    return {
      isFocused: false,

      editorOption: {
        theme: this.light ? "bubble" : "snow",
        placeholder: this.placeholder,
        modules: {
          toolbar: this.light ? lightToolbarOptions : fullToolbarOptions
        }
      }
    };
  },

  mounted() {
    if (this.disabled) {
      this.disable();
    }
  },

  methods: {
    disable() {
      this.editor.disabled = true;
    },

    enable() {
      this.editor.disabled = false;
    },

    focus() {
      this.editor.focus();
    },

    blur() {
      this.editor.blur();
    },

    onFocus() {
      if (!this.disabled) {
        this.isFocused = true;
      }

      this.$emit("focus");
    },

    onBlur() {
      if (!this.disabled) {
        this.isFocused = false;
      }

      this.$emit("blur");
    },

    onChange(e) {
      this.$emit("change", e.target.value);
    }
  },

  computed: {
    editorClasses() {
      return {
        editor_focused: this.isFocused,
        editor_disabled: this.disabled,
        editor_readonly: this.readonly,
        editor_bordered: this.bordered
      };
    },

    editor() {
      return this.$refs.textEditor; //this.$refs.textEditor.quill
    }
  }
};
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

  &_readonly,
  &_readonly[readonly] {
    background-color: transparent;
    border-color: transparent;

    &:hover {
      border-color: transparent;
    }
  }

  &_bordered {
    border: 1px solid rgba(0, 0, 0, 0.15);

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
    padding: 0;
    font-size: 1rem;
    line-height: 1.25;
    font-family: inherit;
  }

  .ql-container.ql-snow,
  .ql-toolbar.ql-snow {
    border: none;
  }

  .ql-editor.ql-blank:before {
    left: 0;
    right: 0;
  }
}
</style>
