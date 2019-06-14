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
            <transition-group name="list" tag="div">
              <suggestion-media-object
                v-for="suggestion in suggestions"
                :key="suggestion.id"
                :suggestion="suggestion"
                @vote="vote"
                @unvote="unvote"
                @delete="deleteSuggestion"
              />
            </transition-group>
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

<style lang="scss">
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateY(50px);
}

.list-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Event } from '@/types/event';
import firestore from '@/plugins/firestore';
import { QuerySnapshot } from '@firebase/firestore-types';
import Card from '~/components/Card.vue';
import SuggestionMediaObject from '~/components/SuggestionMediaObject.vue';
import PreliminarySuggestionMediaObject from '~/components/PreliminarySuggestionMediaObject.vue';
import SearchBar from '~/components/SearchBar.vue';
import firebase from '@firebase/app';

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
      .orderBy('votesCount', 'desc')
      .orderBy('createdAt', 'asc')
      .onSnapshot(async (suggestions: QuerySnapshot) => {
        const suggestionsArr = [];
        for (const suggestionDocument of suggestions.docs) {
          const { suggestedItem, userReference, votes } = suggestionDocument.data();
          const user = await userReference.get();
          const suggestion = {
            id: suggestionDocument.id,
            suggestedItem,
            user: { id: user.id, ...user.data() },
            votes
          };
          suggestionsArr.push(suggestion);
        }
        this.suggestions = suggestionsArr.sort();
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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userReference: firestore.doc(`users/${this.user.uid}`),
        suggestedItem: suggestion,
        votesCount: 0,
        votes: []
      });
      this.selectedPreliminarySuggestion = null;
    } catch (e) {
      this.$toast.open({ message: 'Error while adding the suggestion' });
      throw e;
    }
  }

  async vote(suggestion) {
    try {
      await firestore
        .collection(`events/${this.event.id}/suggestions`)
        .doc(suggestion.id)
        .update({
          votesCount: firebase.firestore.FieldValue.increment(1),
          votes: firebase.firestore.FieldValue.arrayUnion({
            userId: this.user.uid,
            userReference: firestore.doc(`users/${this.user.uid}`)
          })
        });
    } catch (e) {
      this.$toast.open({ message: 'Error while voting' });
      throw e;
    }
  }

  async unvote(suggestion) {
    try {
      await firestore
        .collection(`events/${this.event.id}/suggestions`)
        .doc(suggestion.id)
        .update({
          votesCount: firebase.firestore.FieldValue.increment(-1),
          votes: firebase.firestore.FieldValue.arrayRemove({
            userId: this.user.uid,
            userReference: firestore.doc(`users/${this.user.uid}`)
          })
        });
    } catch (e) {
      this.$toast.open({ message: 'Error while unvoting' });
      throw e;
    }
  }

  async deleteSuggestion(suggestion) {
    try {
      await firestore
        .collection(`events/${this.event.id}/suggestions`)
        .doc(suggestion.id)
        .delete();
    } catch (e) {
      this.$toast.open({ message: 'Error while deleting' });
      throw e;
    }
  }

  get user() {
    return this.$store.state.auth.user;
  }
}
</script>
