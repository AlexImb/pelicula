<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box has-text-centered">
          <h2 class="is-size-2 has-text-weight-semibold">Sign In</h2>
          <hr />
          <h3 class="is-size-5">Sign in with Google to manage vote for your favourite movie!</h3>
          <ButtonGoogleSignIn @clicked="loginWithGoogle()" />
          <p class="is-size-7">By signing in, I agree to Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import ButtonGoogleSignIn from '@/components/ButtonGoogleSignIn.vue';

@Component({
  components: {
    Card,
    ButtonGoogleSignIn
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
