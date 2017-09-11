<template>
  <form class="invite-teammates-form" @submit.prevent="onSubmit">
    <template v-for="(item, index) in mates">
      <label :for="item.name" class="sr-only">{{item.label}}</label>
      <div class="input-group invite-teammates-form__input">
        <input type="email" :id="item.name" class="form-control form-control-lg"
               v-model="item.value"
               v-focus="focused[index]"
               @focus="focused[index] = true"
               @blur="focused[index] = false"
               :placeholder="item.label + ' Mail'"
               :required="required[index]">
        <span class="input-group-btn" v-if="isCanRemoveItem(index)">
          <button class="btn btn-outline-danger btn-lg" type="button" @click="onRemoveItem(index)">
            <icon name="times"></icon>
          </button>
        </span>
      </div>
    </template>

    <button class="btn btn-lg btn-outline-primary btn-block" type="button" @click="onAdd">Add more</button>
    <button class="btn btn-lg btn-success btn-block" type="submit">Invite</button>
  </form>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mixin as focusMixin} from 'vue-focus';

  import 'vue-awesome/icons/times'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    name: 'invite-teammates-form',
    mixins: [focusMixin],
    components: {Icon},

    props: {
      submitRoute: {type: String}
    },

    data() {
      return {
        mates: [
          {name: 'mate1', value: null, label: 'Mate 1'},
          {name: 'mate2', value: null, label: 'Mate 2'},
          {name: 'mate3', value: null, label: 'Mate 3'}
        ],
        focused: {0: true},
        required: {0: true}
      }
    },
    methods: {
      isCanRemoveItem(index) {
        return index > 2
      },

      onSubmit() {
        for (let item of this.mates) {
          if (item.value) {
            this.$store.dispatch('createTeamMate', {username: item.value});
          }
        }

        this.$router.push(this.submitRoute);
      },
      onAdd() {
        const idx = this.mates.length + 1;

        this.mates.push({name: `mate${idx}`, value: null, label: `Mate ${idx}`},)
      },

      onRemoveItem(index) {
        this.mates.splice(index, 1);
      },


      ...mapGetters([
        'user',
        'projects',
        'projectsTasks',
        'ungroupedTasks',
        'tasks',
        'teammates',
        'lastUpdates'
      ]),
    }
  }
</script>

<style lang="scss">
  .invite-teammates-form {
    &__input {
      margin-bottom: 10px;
    }
  }
</style>
