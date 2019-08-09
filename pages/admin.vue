<template>
  <section class="section">
    <div class="columns">
      <div class="column is-narrow">
        <calendar v-model="calendarDate" :events="calendarEvents" />
      </div>

      <card :title="calendarDate.toLocaleDateString()">
        <template v-if="!currentDateEvents.length">
          No events on this date.
        </template>
        <template v-else>
          <b-collapse v-for="(event, index) in currentDateEvents" :key="event.id" class="card" :open="!index">
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
              <span class="card-header-title">{{ event.description }}</span>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"> </b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a>#buefy</a>.
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Cancel</a>
              <a class="card-footer-item has-text-danger" @click="deleteEvent(event)">Delete</a>
            </footer>
          </b-collapse>
        </template>

        <br />
        <b-button class="m-t-lg" @click="isEventModalActive = true">Add new</b-button>
      </card>
    </div>
    <add-event-modal :is-active="isEventModalActive" @close="isEventModalActive = false" @save="saveEvent" />
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Calendar from '@/components/Calendar.vue';
import AddEventModal from '@/components/AddEventModal.vue';
import { Event } from '@/types/event';
import { isSameDay } from '@/helpers/datetime';

@Component({
  components: {
    Card,
    Calendar,
    AddEventModal
  }
})
export default class Admin extends Vue {
  calendarDate: Date = new Date();
  isEventModalActive = false;

  created() {
    this.$store.dispatch('events/getEvents');
  }

  get events(): Event[] {
    return this.$store.state.events.events;
  }

  get calendarEvents(): Date | Object {
    return this.events.map(event => event.date);
  }

  get currentDateEvents(): Event[] {
    return this.events.filter(event => isSameDay(event.date, this.calendarDate));
  }

  saveEvent(event) {
    return event.id ? this.updateEvent(event) : this.addNewEvent(event);
  }

  async addNewEvent(event) {
    try {
      await this.$store.dispatch('events/addEvent', { ...event, timestamp: this.calendarDate });
      this.isEventModalActive = false;
      this.$buefy.toast.open({
        message: 'Event added'
      });
    } catch (e) {
      this.$buefy.toast.open({
        message: 'Error while adding event'
      });
    }
  }

  async updateEvent(event) {
    try {
      await this.$store.dispatch('events/updateEvent', event);
      this.isEventModalActive = false;
      this.$buefy.toast.open({
        message: 'Event updated'
      });
    } catch (e) {
      this.$buefy.toast.open({
        message: 'Error while updating event'
      });
    }
  }

  deleteEvent(event) {
    this.$store.dispatch('events/deleteEvent', event);
  }
}
</script>
