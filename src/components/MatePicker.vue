<template>
  <div class="mate-picker">
    <el-popover
      ref="popovermates"
      class="mate-picker__popover"
      placement="bottom-start"
      width="200"
      trigger="click">

      <div class="mate-picker__body">
        <div class="mate-picker__header">
          <div class="mate-picker__actions">
            <el-button type="primary" size="mini" @click="selectAll">Select All</el-button>
            <el-button type="primary" size="mini" @click="removeAll">Remove All</el-button>
          </div>
        </div>
        <div class="mate-picker__members">
          <template v-for="(item, index) in editableMembers">
            <div class="mate-picker__member" :class="mateClassObject(item)" @click="onMateSelect(item)">
              <avatar :item="item" :small="true" class="mate-picker__member-avatar"></avatar>
              <span class="mate-picker__member-name">{{ item.username }}</span>
            </div>
          </template>
        </div>
      </div>
    </el-popover>
    <el-button class="mate-picker__button" :plain="true" v-popover:popovermates>
      <template v-if="selectedMembers.length">

        <template v-for="(item, index) in editableSelectedMembers">
          <el-tooltip
            class="mate-picker__selected-item"
            effect="dark"
            placement="bottom-start"
            :content="item.username"
          >
            <avatar :item="item" class="mate-picker__selected-avatar" :small="true"></avatar>
          </el-tooltip>
        </template>

      </template>
      <template v-else>
        <span class="mate-picker__avatar-placeholder"></span>
        <span class="mate-picker__label">{{label}}</span>
      </template>
    </el-button>
  </div>
</template>

<script>
  import Avatar from './Avatar'

  export default {
    name: 'mate-picker',
    props: ['label', 'members', 'selectedMembers', 'multiple'],
    components: {Avatar},

    data() {
      return {
        editableSelectedMembers: this.selectedMembers.slice(),
        editableMembers: this.members.slice()
      }
    },

    methods: {
      onMateSelect(mate) {
        const mateIndex = this.selectedMateIndex(mate);

        if (mateIndex >= 0) {
          this.editableSelectedMembers.splice(mateIndex, 1);
        } else {
          if (this.multiple) {
            this.editableSelectedMembers.push(mate);
          } else {
            this.$set(this, 'editableSelectedMembers', [mate]);
          }
        }

        this.$emit('change', this.editableSelectedMembers.slice());
      },

      mateClassObject(mate) {
        return {
          'mate-picker__member_selected': this.isMateSelected(mate)
        }
      },

      selectedMateIndex(mate) {
        return this.editableSelectedMembers.findIndex(selected => selected._id === mate._id);
      },

      isMateSelected(mate) {
        return this.selectedMateIndex(mate) >= 0;
      },

      selectAll() {
        this.$set(this, 'editableSelectedMembers', this.editableMembers.slice());

        this.$emit('change', this.editableMembers.slice());
      },

      removeAll() {
        this.$set(this, 'editableSelectedMembers', []);

        this.$emit('change', []);
      }
    }
  }
</script>

<style lang="scss">
  .mate-picker {

    &__header {
      margin-bottom: .5rem;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
    }

    &__member {
      padding: .25rem;
      border-radius: .25rem;
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: .25rem;
      border: 1px solid hsla(210, 28%, 86%, .25);
      cursor: pointer;

      &_selected {
        border-color: #c4c4c4;
      }
    }

    &__member-avatar {
      margin-right: .25rem;
    }

    &__member-name {
      white-space: nowrap;
      overflow: hidden;
      max-width: 140px;
      text-overflow: ellipsis;
    }

    &__button {
      padding: 6px 15px;

      > span {
        height: 22px;
        display: flex;
        align-items: center;
      }
    }

    &__selected-item {
      margin-right: .25rem;
    }
  }
</style>
