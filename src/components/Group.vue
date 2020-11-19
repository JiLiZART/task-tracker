<template>
  <v-expansion-panel
    class="group"
    tabindex="0"
    v-hotkey="keymap"
    @drop="onDrop"
    @dragover="dragover = true"
    @dragleave="dragover = false"
  >
    <v-expansion-panel-header class="group__header">
      <template v-slot:default="{ open }">
        <v-fade-transition leave-absolute>
          <v-row no-gutters v-if="open">
            <form
              class="group__title-form"
              @submit.prevent="onTitleSubmit"
              @click="onTitleFormClick"
            >
              <label>
                <input
                  type="text"
                  class="group__title-input"
                  placeholder="Enter title here..."
                  v-model="newTitle"
                  ref="inputTitle"
                  @blur="onTitleBlur"
                  @focus="onTitleFocus"
                  :tabindex="editable ? 0 : -1"
                  :readonly="!editable"
                  :required="editable"
                />
              </label>
            </form>
            <div class="group__spacer" @click="toggleExpanded">&nbsp;</div>
            <div class="group__actions">
              <slot name="actions"></slot>
            </div>
          </v-row>
          <EntityRow v-if="!open">
            <template slot="icon">
              <slot name="icon"></slot>
            </template>
            <template slot="title">
              {{ title }}
            </template>
            <template slot="actions">
              <slot name="row-meta"></slot>
            </template>
          </EntityRow>
        </v-fade-transition>
      </template>
      <template v-slot:actions>
        <v-icon color="primary">
          $expand
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot name="content"></slot>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import EntityRow from "@/components/EntityRow";
// import Expander from "@/components/Expander";
import getCurrentActiveElement from "@/utils/getCurrentActiveElement";

export default {
  name: "Group",
  props: {
    user: { type: Object },
    title: { type: String },
    droppable: { type: Boolean, default: false },
    expandable: { type: Boolean, default: true },
    editable: { type: Boolean, default: false }
  },
  components: { EntityRow },

  data() {
    return {
      expanded: false,
      dragover: false,
      inTitleEdit: !this.title,
      newTitle: this.title
    };
  },

  mounted() {
    if (this.inTitleEdit) {
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    }
  },

  methods: {
    toggleExpanded() {
      if (this.expandable) {
        this.expanded = !this.expanded;
      }
    },

    expand() {
      if (this.expandable) {
        this.expanded = true;
      }
    },

    collapse() {
      if (this.expandable) {
        this.expanded = false;
      }
    },

    isElementActive() {
      return this.$el === getCurrentActiveElement();
    },

    onEscHotkey() {
      if (this.isElementActive()) {
        this.collapse();
      }
    },

    onEnterHotkey() {
      if (this.isElementActive()) {
        this.toggleExpanded();
      }
    },

    onLeftHotkey() {
      if (this.isElementActive()) {
        this.collapse();
      }
    },

    onRightHotkey() {
      if (this.isElementActive()) {
        this.expand();
      }
    },

    onDrop(data, event) {
      if (this.droppable) {
        this.dragover = false;

        this.$emit("drop", data, event);
      }
    },

    onTitleSubmit() {
      if (this.newTitle) {
        this.$emit("edit:title", this.newTitle);
      }
    },

    onTitleFormClick() {
      if (!this.editable) {
        this.toggleExpanded();
      }
    },

    onTitleBlur() {
      this.$emit("title-input:blur", this.newTitle);
    },

    onTitleFocus() {
      this.$emit("title-input:focus", this.newTitle);
    }
  },

  computed: {
    classObject() {
      return {
        group_expanded: this.isExpanded,
        group_dragged: this.isDragover
      };
    },

    keymap() {
      return {
        enter: this.onEnterHotkey,
        esc: this.onEscHotkey,
        left: this.onLeftHotkey,
        right: this.onRightHotkey
      };
    },

    isExpanded() {
      return this.expandable ? this.expanded : true;
    },

    isDragover() {
      return this.droppable ? this.dragover : false;
    }
  }
};
</script>

<style lang="scss">
.group {
  position: relative;
  border-radius: 6px;
  --group-color: hsl(188, 48%, 90%);

  &.group {
    background: var(--group-color);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.14);
  }

  &_expanded {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    padding: 1rem 10px;
    margin: -1rem -10px;
    border: none;

    @media (min-width: 992px) {
      padding: 1rem;
      margin: -1rem;
    }

    &:focus {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }
  }

  &__expander {
    position: absolute;
    top: 0;
    right: 0;
    height: 50px;
    color: #818a91;
    background: var(--group-color);
    cursor: pointer;
    border-radius: 0 6px 6px 0;

    &:hover,
    &:focus {
      color: #818a91;
      background: hsl(188, 48%, 94%);
    }
  }

  &_expanded &__expander {
    background: hsl(183, 61%, 94%);

    &:hover {
      background: hsl(183, 58%, 94%);
    }
  }

  &_dragged,
  &_dragged &__expander,
  &_dragged &__expander:hover {
    background: hsl(188, 80%, 90%);
  }

  &__header {
    background: hsl(183, 61%, 94%);
    /*border-radius: 6px 6px 0 0;*/
    /*padding: 0.5rem 2.6rem 0.5rem 1rem;*/
    /*height: 50px;*/
    /*display: flex;*/
    /*align-items: center;*/
  }

  &_expanded &__header {
    margin: -1rem -10px 0;

    @media (min-width: 992px) {
      margin: -1rem -1rem 0;
    }
  }

  &__header &__actions {
    margin-left: auto;
  }

  &__title {
    display: flex;
    cursor: pointer;
    width: 100%;
  }

  &__title-form {
    margin-bottom: 0;
    cursor: pointer;
    display: inline-flex;
    flex: 1 1 0;
    font-size: 1rem;
    line-height: 1.1;

    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__title-input {
    background: none;
    border: 0;
    line-height: 2rem;

    &:focus {
      outline: none;
    }
  }

  &__spacer {
    margin-left: auto;
    cursor: pointer;
    flex-grow: 5;
  }

  &__content {
    margin-top: 1rem;
    min-height: 52px;
    padding-bottom: 52px;
  }

  &_dragged &__content {
    background: rgba(0, 0, 0, 0.06);
  }
}
</style>
