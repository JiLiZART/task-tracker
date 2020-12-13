<script>
import Editor from "@/components/Editor";
import Hotkey from "@/components/Hotkey";

export default {
  name: "TaskEditForm",
  props: {
    value: String,
    textPlaceholder: String,
    canCancel: Boolean,
    canSave: Boolean
  },
  components: {
    Editor,
    Hotkey
  },

  methods: {
    onSubmit() {
      this.$emit("submit");
    },
    onEditorChange(text) {
      this.$emit("input", text);
    },
    onCancelClick() {
      this.$emit("cancel");
    }
  }
};
</script>

<template>
  <form class="task__form" @submit.prevent="onSubmit">
    <Editor
      class="task__text-editor"
      :bordered="true"
      :value="value"
      :placeholder="textPlaceholder"
      @input="onEditorChange"
    />

    <!-- Actions -->
    <div class="task__actions">
      <div class="task__actions-left">
        <v-btn
          class="task__action"
          color="primary"
          type="submit"
          depressed
          large
          :disabled="!canSave"
        >
          Save
          <Hotkey name="command+enter" />
        </v-btn>
        <v-btn
          class="task__action"
          @click="onCancelClick"
          v-if="canCancel"
          depressed
          large
        >
          Cancel
          <Hotkey name="esc" />
        </v-btn>

        <slot name="actionLeft"></slot>
      </div>

      <div class="task__actions-right">
        <div class="task__action task__action_align_right"></div>

        <div class="task__action task__action_last">
          <slot name="actionRight"></slot>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="" scoped></style>
