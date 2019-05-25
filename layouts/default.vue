<template>
  <div>
    <nav class="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/overview">
            <img src="~assets/pelicula_logo_white.png" alt="Película" />
          </nuxt-link>
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            :class="{ 'is-active': activeMenu }"
            @click="activeMenu = !activeMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': activeMenu }">
          <div class="navbar-end">
            <div v-if="user" class="navbar-item">
              <nuxt-link to="/overview" class="navbar-link__text">Overview</nuxt-link>
            </div>
            <div v-if="user && user.isAdmin" class="navbar-item">
              <nuxt-link to="/admin" class="navbar-link__text">Admin</nuxt-link>
            </div>
            <b-dropdown v-if="user" position="is-bottom-left" aria-role="menu">
              <a slot="trigger" class="navbar-item" role="button">
                <img :src="user.photoURL" />
                <b-icon icon="menu-down mdi-light"></b-icon>
              </a>
              <b-dropdown-item custom aria-role="menuitem">
                Logged as <b>{{ user.displayName }}</b>
              </b-dropdown-item>
              <b-dropdown-item value="settings" @click="goToProfile()">
                <b-icon icon="settings"></b-icon>
                Settings
              </b-dropdown-item>
              <b-dropdown-item value="logout" aria-role="menuitem" @click="signOut()">
                <b-icon icon="logout"></b-icon>
                Sign Out
              </b-dropdown-item>
            </b-dropdown>
            <div v-else class="navbar-item">
              <nuxt-link to="/login" class="navbar-link__text">Sign In</nuxt-link>
            </div>
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
.navbar-menu {
  .navbar-link__text {
    color: white;
  }

  &.is-active {
    .navbar-link__text {
      color: blueviolet;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  activeMenu = false;

  get user() {
    return this.$store.state.auth.user;
  }

  goToProfile() {
    this.$router.push('profile');
  }

  async signOut() {
    try {
      await this.$store.dispatch('auth/signOut');
      this.$router.replace('about');
    } catch (error) {
      console.log('Sign Out error', error);
    }
  }
}
</script>
