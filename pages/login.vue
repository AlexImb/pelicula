<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Login interface">
        <button @click="loginWithGoogle">Login with Google</button>
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card
  }
})
export default class Login extends Vue {
  async loginWithGoogle() {
    try {
      await this.$store.dispatch('auth/signInWithGoogle');
      this.$router.replace('overview');
    } catch (error) {
      console.log('Google Login error', error);
    }
  }
}
</script>
