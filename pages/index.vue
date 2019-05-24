<template>
  <main>
    <section class="hero is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <!-- <div class="navbar-brand">
            <a class="navbar-item">
              <img src="~assets/pelicula_logo_white.png" alt="Película" />
            </a>
            </div>-->
          </div>
        </header>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <img class="hero__logo" src="~assets/pelicula_logo_white.png" alt="Película" />
          </h1>
          <h2 class="subtitle">
            <b-button class="is-large hero__btn" inverted @click="goToApp">CREATE A MOVIE NIGHT</b-button>
          </h2>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <!-- <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li class="is-active"><a>Overview</a></li>
            <li><a>Modifiers</a></li>
            <li><a>Grid</a></li>
            <li><a>Elements</a></li>
            <li><a>Components</a></li>
            <li><a>Layout</a></li>
          </ul>
        </div>
        </nav>-->
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@import '~/assets/gradients.scss';
.hero {
  background-image: url('../assets/landing-0.jpeg');
  background-size: cover;

  .hero__logo {
    min-width: 20rem;
    max-width: 33%;
    margin-bottom: 5rem;
  }

  .hero__btn {
    color: white;
    border: none;
    @extend .triple-gradient;
    transition: 0.5s;
    background-size: 200% auto;

    &:hover {
      background-position: right center;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  layout: 'landing'
})
export default class extends Vue {
  goToApp() {
    this.$router.push({ name: 'overview' });
  }
}
</script>
