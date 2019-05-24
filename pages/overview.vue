<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Upcoming movie night">
        <search-bar />
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Card from '~/components/Card';
import SearchBar from '~/components/SearchBar';

@Component({
  components: {
    Card,
    SearchBar
  }
})
export default class Overview extends Vue {}
</script>
