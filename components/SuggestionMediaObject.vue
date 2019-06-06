<template>
  <article class="media">
    <figure class="media-left is-hidden-mobile image is-96x96">
      <img :src="`https://image.tmdb.org/t/p/w500/${suggestion.suggestedItem.poster_path}`" />
    </figure>

    <div class="media-content">
      <div class="content">
        <h3>{{ suggestion.suggestedItem.title }} ({{ suggestion.suggestedItem.release_date.split('-')[0] }})</h3>
        <p>
          {{ suggestion.suggestedItem.overview.slice(0, 200) + '...' }}
        </p>
        <a :href="`https://www.themoviedb.org/movie/${suggestion.suggestedItem.id}`" target="_blank">
          Find more
          <b-icon icon="open-in-new" size="is-small"> </b-icon>
        </a>

        <div class="is-pulled-right">
          <transition name="fade">
            <b-icon v-if="currentUserVoted()" type="is-danger" icon="heart" @click.native="$emit('unvote', suggestion)" />
            <b-icon v-else icon="heart-outline" @click.native="$emit('vote', suggestion)" />
          </transition>
          <span v-if="suggestion.votes.length">{{ suggestion.votes.length }} votes</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SuggestionMediaObject extends Vue {
  @Prop() suggestion;

  currentUserVoted() {
    return false;
  }
}
</script>
