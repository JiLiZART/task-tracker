<template>
  <div class="card card-outline-secondary widget-updates">
    <div class="card-body">
      <h5 class="card-title widget-updates__title">Updates</h5>
    </div>

    <ul class="list-group list-group-flush" v-if="items && items.length">
      <template v-for="(item, index) in items">
        <li class="list-group-item widget-updates__item">
          <author :small="true" :item="item.author"></author>
          <span class="widget-updates__action">
            {{ item.action }}
          </span>
          <router-link
            :to="{ name: item.route.name, params: item.route.params}" class="widget-updates__entity">
            {{ item.entity.title }}
          </router-link>
        </li>
      </template>
    </ul>
    <div class="card-body" v-else>
      <div class="card">
        <div class="card-body">
          <p class="card-text">There are no updates. Try to do something.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Author from '@/components/Author';

  export default {
    name: 'widget-updates',
    props: {
      items: {
        type: Array
      }
    },
    components: {Author}
  }
</script>

<style lang="scss">
  .widget-updates {
    &__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__entity {
      margin-left: .5rem;
    }
  }
</style>
