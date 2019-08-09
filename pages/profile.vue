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

    <div class="columns is-mobile">
      <div class="column">
        <b-button type="is-danger" icon-left="delete" @click="openDeleteAccountDialog()">
          Delete account
        </b-button>
      </div>
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

  openDeleteAccountDialog() {
    this.$buefy.dialog.confirm({
      title: 'Deleting account',
      message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
      confirmText: 'Delete Account',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => this.deleteAccount()
    });
  }

  async deleteAccount() {
    // TODO: Add the account data deletion

    this.$buefy.toast.open({
      duration: 5000,
      message: `Account deleted! Signing out...`,
      position: 'is-bottom',
      type: 'is-danger'
    });

    await this.$store.dispatch('auth/signOut');
    this.$router.replace('about');
  }
}
</script>
