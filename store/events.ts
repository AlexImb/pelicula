import { Event } from '@/types/event';
import { MutationTree, ActionTree } from 'vuex';
import firestore from '@/plugins/firestore';
import { QuerySnapshot, QueryDocumentSnapshot, DocumentData, Timestamp } from '@firebase/firestore-types';

interface State {
  loading: boolean;
  events: Event[];
}

export const state = (): State => ({
  loading: false,
  events: []
});

export const mutations: MutationTree<State> = {
  setLoading(state: State, loading: boolean): void {
    state.loading = loading;
  },
  setEvents(state: State, events: Event[]): void {
    state.events = events;
  }
};

export const actions: ActionTree<State, State> = {
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // async nuxtServerInit({ commit }, { req }) {
  // },

  // Fetch events from Firestore once
  async getEvents({ commit }) {
    commit('setLoading', true);

    const eventsSnapshot: QuerySnapshot = await firestore
      .collection('events')
      .orderBy('timestamp')
      .get();
    const events: Event[] = eventsSnapshot.docs.map((event: QueryDocumentSnapshot) => {
      const eventData: DocumentData = event.data();
      const timestamp: Timestamp = eventData.timestamp;
      const date: Date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds);
      return { id: event.id, timestamp, date, description: eventData.description };
    });

    commit('setEvents', events);
    commit('setLoading', false);
  },
  async addEvent({ dispatch }, event) {
    await firestore.collection('events').add(event);
    dispatch('getEvents');
  },
  async updateEvent({ dispatch }, event) {
    await firestore
      .collection('events')
      .doc(event.id)
      .set(event);
    dispatch('getEvents');
  },
  async deleteEvent({ dispatch }, event) {
    await firestore
      .collection('events')
      .doc(event.id)
      .delete();
    dispatch('getEvents');
  }
};
