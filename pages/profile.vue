<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="User profile">
        {{ user }}
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Card from '~/components/Card';

@Component({
  components: {
    Card
  }
})
export default class Overview extends Vue {
  get user() {
    return this.$store.state.auth.user;
  }
}
</script>
