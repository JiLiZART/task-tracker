<script>
export default {
  name: "ExpansionPanel",
  props: {
    active: Boolean
  },
  components: {},
  computed: {
    classes() {
      return {
        active: this.active
      };
    }
  }
};
</script>

<template>
  <drag class="epanel" :class="classes" v-bind="$attrs" v-on="$listeners">
    <button class="epanel-header">
      <div class="epanel-header-content">
        <span class="epanel-title" @click="$emit('click:title', $event)">
          <slot name="title"></slot>
        </span>
        <div class="epanel-description">
          <slot name="actions"></slot>
        </div>
        <div class="epanel-indicator"></div>
      </div>
    </button>
    <div class="epanel-body">
      <slot></slot>
    </div>
  </drag>
</template>

<style lang="scss" scoped>
:root {
  --background: #303030;
  --foreground: #424242;
  --text-color: #ffffff;
  --text-color-2: rgba(255, 255, 255, 0.6);
  --primary-color: #e91e63;
  --elevation-z1: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  --elevation-z2: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  --hover: rgba(255, 255, 255, 0.04);
  --thumb: rgba(0, 0, 0, 0.25);
  --min-width: 400px;
  --max-width: 900px;
}

.epanel {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  position: relative;
  background: #424242;
  transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1);

  &:nth-child(1) {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:nth-last-child(1) {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.epanel-header {
  height: 48px;
  cursor: pointer;
  outline: 0;
  width: 100%;
  background: none;
  border: 0;
  color: inherit;
  padding: 16px 24px;
  text-align: initial;

  &-content {
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-auto-flow: column;
    user-select: none;
  }

  .epanel-description {
    color: rgba(255, 255, 255, 0.6);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0 16px;
    font-size: 14px;
  }

  .epanel-indicator {
    border-style: solid;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    vertical-align: middle;
    width: 8px;
    height: 8px;
    transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.epanel-body {
  min-height: 0;
  height: 0;
  transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  visibility: hidden;
  text-indent: 16px;
  line-height: 1.3;
  user-select: none;
}

.epanel:not(.active) {
  .epanel-header:hover,
  .epanel-header:focus {
    background: rgba(255, 255, 255, 0.04);
  }
}

.epanel.active {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  margin: 16px 0;
  border-radius: 4px;

  .expansion-indicator {
    transform: rotate(225deg);
  }

  .epanel-body {
    height: var(--ht, 440px);
    visibility: visible;
    user-select: initial;
  }
}
</style>
