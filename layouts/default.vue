<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="~assets/pelicula_logo_white.png" alt="Película" />
          </a>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  items = [
    {
      title: 'Home',
      icon: 'home',
      to: { name: 'index' }
    },
    {
      title: 'Inspire',
      icon: 'lightbulb',
      to: { name: 'inspire' }
    }
  ];
}
</script>
