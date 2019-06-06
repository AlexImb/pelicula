<template>
  <section class="section">
    <template v-if="events.length && event">
      <div class="columns">
        <div class="column">
          <b-button icon-left="chevron-left" :disabled="eventIndex === 0" @click="previousEvent">
            Previous
          </b-button>
          <b-button icon-right="chevron-right" :disabled="eventIndex + 1 === events.length" @click="nextEvent">
            Next
          </b-button>
        </div>
        <div v-if="votingLimitsEnabled" class="column has-text-right">
          <p>3 votes left</p>
          <p>1 suggestion left</p>
        </div>
      </div>

      <div class="columns">
        <card :title="event.date.toLocaleDateString() + ' - ' + event.description">
          <div v-if="!suggestions.length" class="has-text-centered">No suggestions for this event!</div>
          <template v-else>
            <suggestion-media-object
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              :suggestion="suggestion"
              @suggest="suggest"
            />
          </template>
        </card>
      </div>

      <div class="columns is-mobile">
        <card title="Suggest a movie">
          <preliminary-suggestion-media-object
            v-if="selectedPreliminarySuggestion"
            :suggestion-item="selectedPreliminarySuggestion"
            @suggest="suggest"
            @cancel="selectedPreliminarySuggestion = null"
          />
          <search-bar @select="selected => (selectedPreliminarySuggestion = selected)" />
        </card>
      </div>
    </template>
    <template v-else>
      <p>No events available.</p>
    </template>
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Event } from '@/types/event';
import firestore from '@/plugins/firestore';
import { QuerySnapshot, QueryDocumentSnapshot } from '@firebase/firestore-types';
import Card from '~/components/Card.vue';
import SuggestionMediaObject from '~/components/SuggestionMediaObject.vue';
import PreliminarySuggestionMediaObject from '~/components/PreliminarySuggestionMediaObject.vue';
import SearchBar from '~/components/SearchBar.vue';

@Component({
  components: {
    Card,
    PreliminarySuggestionMediaObject,
    SuggestionMediaObject,
    SearchBar
  }
})
export default class Overview extends Vue {
  selectedPreliminarySuggestion = null;
  event: Event = null;
  eventIndex: number = null;
  suggestions = [];
  eventSuggestionsListener = null;
  votingLimitsEnabled = false;

  async created() {
    await this.$store.dispatch('events/getEvents');
    if (this.events.length) this.selectEvent();
  }

  get events(): Event[] {
    return this.$store.state.events.events;
  }

  /**
   * On every event change detach the old event suggestions data listener and attach the new one.
   */
  @Watch('event')
  eventChange(event) {
    if (this.eventSuggestionsListener) this.eventSuggestionsListener();
    this.eventSuggestionsListener = firestore
      .collection(`events/${event.id}/suggestions`)
      .onSnapshot((suggestions: QuerySnapshot) => {
        this.suggestions = [];
        suggestions.forEach(async (suggestion: QueryDocumentSnapshot) => {
          const { suggestedItem, userReference, votes } = suggestion.data();
          const user = await userReference.get();
          this.suggestions.push({ id: suggestion.id, suggestedItem, user: { id: user.id, ...user.data() }, votes });
        });
      });
  }

  /**
   * Select the next upcoming event; fallback to a previous one
   */
  selectEvent(): void {
    const nextEventIndex = this.events.findIndex(event => event.date.getTime() >= new Date().getTime());
    this.eventIndex = nextEventIndex > -1 ? nextEventIndex : this.events.length - 1;
    this.event = this.events[this.eventIndex];
  }

  previousEvent() {
    this.eventIndex = Math.abs(this.eventIndex - 1) % this.events.length;
    this.event = this.events[this.eventIndex];
  }

  nextEvent() {
    this.eventIndex = (this.eventIndex + 1) % this.events.length;
    this.event = this.events[this.eventIndex];
  }

  async suggest(suggestion) {
    try {
      await firestore.collection(`events/${this.event.id}/suggestions`).add({
        userReference: firestore.doc(`users/${this.user.uid}`),
        suggestedItem: suggestion,
        votes: []
      });
      this.$toast.open({ message: 'Suggestion added' });
      this.selectedPreliminarySuggestion = null;
    } catch (e) {
      this.$toast.open({ message: 'Error while adding the suggestion' });
      throw e;
    }
  }

  get user() {
    return this.$store.state.auth.user;
  }
}
</script>
