<template>
  <main>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <img class="hero__logo" src="~assets/pelicula_logo_white.png" alt="Película" />
          </h1>
          <h2 class="subtitle">
            <b-button class="is-large hero__btn" inverted @click="goToApp">GO TO THE DEMO APP</b-button>
          </h2>
        </div>
      </div>
      <div class="hero-footer">
        <div v-scroll-to="'#instructions'" class="container has-text-centered">
          <b-icon icon="chevron-down" size="is-large" class="scroll-down__arrow bounce" />
        </div>
      </div>
    </section>

    <section id="instructions" class="section is-medium is-light">
      <div class="container">
        <div class="columns is-centered is-vcentered has-text-centered">
          <div class="column">
            <figure class="image is-square">
              <img src="~assets/illustrations/developers-code.svg" class="instructions__image" alt="Movie Night Illustration" />
            </figure>
            <p class="is-size-5 has-text-weight-semibold">
              Clone or fork the source code from our
              <a href="https://github.com/AlexImb/pelicula" target="_blank">GitHub</a> repository and customize it.
            </p>
          </div>
          <div class="column">
            <figure class="image is-square">
              <img src="~assets/illustrations/self-host.svg" class="instructions__image" alt="Movie Night Illustration" />
            </figure>
            <p class="is-size-5 has-text-weight-semibold">
              Host the project on your own server or on a CDN like
              <a href="https://www.netlify.com/" target="_blank">Netlify</a> or
              <a href="https://firebase.google.com/" target="_blank">Firebase</a>.
            </p>
          </div>
          <div class="column">
            <figure class="image is-square">
              <img src="~assets/illustrations/like-dislike.svg" class="instructions__image" alt="Movie Night Illustration" />
            </figure>
            <p class="is-size-5 has-text-weight-semibold">
              Create movie nights and allow your friends to suggest, like and dislike movies.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="motivation" class="section is-medium has-background-white-bis">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h2 class="is-size-2">Movie nights made easy.</h2>
            <br />
            <p class="is-size-5">
              No matter how big is your team, it is always a challenge to pick the perfect movie for your next movie night.
              Inspired by companies like Mozilla who have their own internal tools, we build an open-source PWA ready
              to be used by everyone.
            </p>
            <br />
            <br />
            <div class="has-text-centered">
              <b-button size="is-large" icon-right="github-circle" @click="goToRepo()">
                View on GitHub
              </b-button>
            </div>
          </div>
          <div class="column is-offset-1 is-6">
            <figure class="image is-3by2">
              <img src="~assets/illustrations/movie-night.svg" class="" alt="Movie Night Illustration" />
            </figure>
          </div>
          <br />
        </div>
      </div>
    </section>

    <footer class="footer has-background-primary has-text-white">
      <div class="container has-text-centered">
        Made with ❤️ in 🇳🇱
      </div>
    </footer>
  </main>
</template>

<style lang="scss">
@import '~/assets/scss/gradients.scss';
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

  .scroll-down__arrow {
    color: white;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  .bounce {
    -moz-animation: bounce 2s infinite;
    -webkit-animation: bounce 2s infinite;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-1rem);
    }
    60% {
      transform: translateY(-0.5rem);
    }
  }
}

#instructions {
  .instructions__image {
    margin: 0 auto;
    max-width: 60%;
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
    this.$router.push('login');
  }

  goToRepo() {
    window.open('https://github.com/AlexImb/pelicula', '_blank');
  }
}
</script>
