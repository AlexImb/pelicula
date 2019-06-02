<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Suggest a movie">
        <suggestion-media-object
          v-if="selectedSuggestion"
          :suggestion="selectedSuggestion"
          @suggest="suggest"
          @cancel="selectedSuggestion = null"
        />
        <search-bar @select="selected => (selectedSuggestion = selected)" />
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Card from '~/components/Card';
import SuggestionMediaObject from '~/components/SuggestionMediaObject';
import SearchBar from '~/components/SearchBar';

@Component({
  components: {
    Card,
    SearchBar,
    SuggestionMediaObject
  }
})
export default class Overview extends Vue {
  selectedSuggestion = null;

  suggest(suggestion) {
    console.log('Suggestion: ', suggestion);
  }
}
</script>
