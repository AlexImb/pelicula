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
        <card :title="event.date.toLocaleDateString()">
          {{ event }}
        </card>
      </div>

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
    </template>
    <template v-else>
      <p>No events available.</p>
    </template>
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Event } from '@/types/event';
import Card from '~/components/Card.vue';
import SuggestionMediaObject from '~/components/SuggestionMediaObject.vue';
import SearchBar from '~/components/SearchBar.vue';

@Component({
  components: {
    Card,
    SearchBar,
    SuggestionMediaObject
  }
})
export default class Overview extends Vue {
  selectedSuggestion = null;
  event: Event = null;
  eventIndex: number = null;
  votingLimitsEnabled = false;

  async created() {
    await this.$store.dispatch('events/getEvents');
    if (this.events.length) this.selectEvent();
  }

  get events(): Event[] {
    return this.$store.state.events.events;
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

  suggest(suggestion): void {
    console.log('Suggestion: ', suggestion);
  }
}
</script>
