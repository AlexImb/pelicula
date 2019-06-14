<template>
  <article class="media">
    <figure class="media-left is-hidden-mobile">
      <p class="image is-128x128">
        <img :src="`https://image.tmdb.org/t/p/w500/${suggestionItem.poster_path}`" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h3>{{ suggestionItem.title }} ({{ suggestionItem.release_date.split('-')[0] }})</h3>
        <strong>IMDb score: {{ suggestionItem.vote_average }}</strong>
        <br />
        <strong>Popularity: {{ suggestionItem.popularity.toFixed(1) }}</strong>
        <p>
          <strong>Description:</strong>
          <br />
          {{ suggestionItem.overview }}
        </p>
        <a :href="`https://www.themoviedb.org/movie/${suggestionItem.id}`" target="_blank">
          Find more
          <b-icon icon="open-in-new" size="is-small"> </b-icon>
        </a>
        <b-button type="is-primary" class="is-pulled-right" :disabled="alreadySuggested" @click="$emit('suggest', suggestionItem)"
          >Suggest</b-button
        >
      </div>
    </div>
    <div class="media-right">
      <button class="delete" @click="$emit('cancel')"></button>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PreliminarySuggestionMediaObject extends Vue {
  @Prop() suggestionItem;
  @Prop() alreadySuggested;
}
</script>
