<template>
  <div class="widget-updates card">
    <div class="card-block">
      <h5 class="card-title widget-updates__title">Updates</h5>
    </div>

    <ul class="list-group list-group-flush" v-if="items && items.length">
      <template v-for="(item, index) in items">
        <li class="list-group-item">
          <author :small="true" :item="item.author"></author>
          <span class="action">

          </span>
          {{ item.action }}
          <router-link
            :to="{ name: item.route.name, params: item.route.params}" class="widget-updates__entity">
            {{ item.entity.title }}
          </router-link>
        </li>
      </template>
    </ul>
    <div class="card-block" v-else>
      <div class="card card-outline-secondary">
        <div class="card-block">
          <h4 class="card-title">There are no updates</h4>
          <p class="card-text">Try to do something.</p>
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
      font-size: 1.1rem;
      margin-bottom: 0;
    }

    &__entity {
      margin-left: .5rem;
    }
  }

</style>
