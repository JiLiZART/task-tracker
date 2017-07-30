<template>
  <b-dropdown class="user-picker" variant="link">

    <div class="user-picker__toggle" slot="button-content">
      <template v-if="currentSelected">
        <span class="avatar user-picker__avatar">
            <img
              class="avatar__image rounded-circle"
              :src="currentSelected.avatar"
              :alt="currentSelected.username">
        </span><span class="user-picker__username">{{ currentSelected.username }}</span>
      </template>
      <template v-else>
        <span class="user-picker__placeholder avatar avatar_placeholded">
            <i class="fa fa-plus"></i>
        </span><span class="user-picker__label">{{ label }}</span>
      </template>
    </div>

    <template v-for="(item, index) in members">
      <b-dropdown-item>
      <span v-on:click="selectMember(item)" class="user-picker__member">
          <span class="avatar">
              <img
                class="avatar__image rounded-circle"
                :src="item.avatar"
                :alt="item.username">
          </span>

        <span class="user-picker__username">{{ item.username }}</span>
      </span>
      </b-dropdown-item>
    </template>
  </b-dropdown>
</template>

<script>
  export default {
    name: 'user-picker',

    props: {
      label: {
        type: String
      },

      selected: {
        type: Object
      },

      members: {
        type: Array
      }
    },

    data: function () {
      return {
        currentSelected: this.selected
      };
    },

    methods: {
      selectMember: function (member) {
        this.currentSelected = member;

        this.$emit('update:selected', this.currentSelected);
        this.$emit('change', this.currentSelected);
      }
    }
  }
</script>

<style lang="scss">

  .user-picker {
    display: inline-block;

    > .dropdown-toggle {
      padding: 0;
    }

    &__toggle {
      display: inline-block;
    }

    &__members {
      display: flex;
      flex-direction: column;
    }

    &__member {
      padding: .5rem;
      display: flex;
      align-items: center;
    }

    &__label,
    &__avatar,
    &__username {
      display: inline-block;
      vertical-align: middle;
    }

    &__label,
    &__username {
      margin-left: 10px;
    }
  }

</style>
