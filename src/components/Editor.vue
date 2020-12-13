<template>
  <span>
    <template v-if="readonly">
      <div
        class="editor"
        :class="editorClasses"
        ref="textEditor"
        v-html="value"
      ></div>
    </template>
    <template v-else>
      <div
        id="editor"
        ref="textEditor"
        class="editor"
        :class="editorClasses"
        @focus="onFocus"
        @blur="onBlur"
        @input="onChange"
      ></div>
    </template>
  </span>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import { keymap } from "@codemirror/next/view";
import {
  EditorState,
  EditorView,
  basicSetup
} from "@codemirror/next/basic-setup";
import { html } from "@codemirror/next/lang-html";
import { defaultKeymap } from "@codemirror/next/commands";

export default {
  name: "Editor",

  props: {
    value: { type: String },
    light: { type: Boolean, default: true },
    bordered: { type: Boolean, default: false }, //@TODO remove ugly param
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String }
  },

  data() {
    return {
      isFocused: false,

      raw: this.value,

      globalOptions: {
        mode: "gfm",
        theme: "base16-light",
        lineNumbers: false,
        lineWrapping: true,
        styleActiveLine: { nonEmpty: true },
        viewportMargin: Infinity,
        keyMap: "default",
        dragDrop: false,
        direction: "ltr",
        scrollPastEnd: false
      }
    };
  },

  mounted() {
    if (!this.readonly) {
      this.startState = EditorState.create({
        doc: this.value,
        extensions: [keymap(defaultKeymap), basicSetup, html()]
      });

      this.editorView = new EditorView({
        state: this.startState,
        parent: this.$refs.textEditor,
        extensions: EditorView.theme({
          content: { color: "orange" }
        })
      });

      console.log(this.editorView, this.startState);
    }

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
      console.log("onChange", e);
      this.$emit("change", e.target.value);
      this.$emit("input", e.target.value);
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
.cm-wrap {
  height: 300px;
  border: 1px solid #ddd;
}
.cm-scroller {
  overflow: auto;
}
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
