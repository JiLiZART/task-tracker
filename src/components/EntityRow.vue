<template>
  <div class="entity-row">
    <div class="entity-row__icon">
      <slot name="icon"></slot>
    </div>
    <div class="entity-row__title" @click="$emit('click:title', $event)">
      <slot name="title"></slot>
    </div>
    <div class="entity-row__spacer"></div>
    <div class="entity-row__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntityRow"
};
</script>

<style lang="scss">
.entity-row {
  padding: 0;
  padding-right: 38px;
  display: flex;
  align-items: center;

  &__icon {
    margin-right: 0.5rem;
    display: inline-flex;
    align-items: center;

    .avatar {
      width: 30px;
      height: 30px;
    }
  }

  &__icon-placeholder {
    display: block;
    width: 30px;
    height: 30px;
    background-color: rgb(35, 196, 224);
    border-radius: 100%;
  }

  &__title {
    margin-bottom: 0;
    cursor: pointer;
    flex: 1 1 0;
    font-size: 1rem;
    line-height: 1.1;

    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__spacer {
    margin-left: auto;
    cursor: pointer;
  }

  &__actions {
    display: inline-flex;
    align-items: center;
  }
}
</style>
