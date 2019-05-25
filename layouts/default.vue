<template>
  <div>
    <nav class="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/overview">
            <img src="~assets/pelicula_logo_white.png" alt="Película" />
          </nuxt-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div v-if="user" class="navbar-item">
              <nuxt-link to="/overview" class="navbar-link__text">Overview</nuxt-link>
            </div>
            <div v-if="user" class="navbar-item">
              <nuxt-link to="/admin" class="navbar-link__text">Admin</nuxt-link>
            </div>
            <div v-else class="navbar-item">
              <nuxt-link to="/login" class="navbar-link__text">Login</nuxt-link>
            </div>

            <!-- <div v-if="user" class="navbar-item">
              <nuxt-link to="/profile" class="navbar-link__text">{{ user.displayName }}</nuxt-link>
            </div> -->

            <b-dropdown v-if="user" position="is-bottom-left" aria-role="menu">
              <a slot="trigger" class="navbar-item" role="button">
                <img :src="user.photoURL" />
                <b-icon icon="menu-down"></b-icon>
              </a>

              <b-dropdown-item custom aria-role="menuitem">
                Logged as <b>{{ user.displayName }}</b>
              </b-dropdown-item>

              <b-dropdown-item value="settings" @click="goToProfile()">
                <b-icon icon="settings"></b-icon>
                Settings
              </b-dropdown-item>
              <b-dropdown-item value="logout" aria-role="menuitem" @click="logout()">
                <b-icon icon="logout"></b-icon>
                Logout
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>

    <section class="main-content">
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.navbar-link__text {
  color: white;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  get user() {
    return this.$store.state.auth.user;
  }

  goToProfile() {
    this.$router.push('profile');
  }

  async logout() {
    try {
      await this.$store.dispatch('auth/signOut');
      this.$router.replace('about');
    } catch (error) {
      console.log('Logout error', error);
    }
  }
}
</script>
