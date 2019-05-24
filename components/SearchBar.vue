<template>
  <section>
    <p class="content">
      <b>Selected:</b>
      {{ selected }}
    </p>
    <b-field label="Find a movie to propose">
      <b-autocomplete
        :data="data"
        placeholder="e.g. Fight Club"
        field="title"
        :loading="isFetching"
        @typing="getAsyncData"
        @select="option => (selected = option)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`" />
            </div>
            <div class="media-content">
              {{ props.option.title }}
              <br />
              <small>
                Released at {{ props.option.release_date }}, rated
                <b>{{ props.option.vote_average }}</b>
              </small>
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchBar extends Vue {
  data = [];
  selected = null;
  isFetching = false;

  getAsyncData(name) {
    if (!name.length) {
      this.data = [];
      return;
    }
    this.isFetching = true;
    this.$axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${name}`)
      .then(({ data }) => {
        this.data = [];
        data.results.forEach(item => this.data.push(item));
      })
      .catch(error => {
        this.data = [];
        throw error;
      })
      .finally(() => {
        this.isFetching = false;
      });
  }
}
</script>
