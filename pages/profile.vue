<template>
  <section class="section">
    <div class="columns is-mobile">
      <card v-if="user" title="Profile">
        <template #header>
          <div class="has-text-centered p-t-lg p-b-lg">
            <figure class="image container is-128x128 m-b-lg">
              <img class="is-rounded" :src="user.photoURL" alt="Profile picture" />
            </figure>
            <h1 class="title is-spaced">{{ user.displayName }}</h1>
            <h2 class="subtitle is-spaced">{{ user.isAdmin ? 'Admin ✨' : '' }}</h2>
          </div>
          <hr />
        </template>

        <b-field label="Email">
          <b-input type="email" :value="user.email" readonly> </b-input>
        </b-field>
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card';

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
