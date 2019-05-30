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

        <b-button class="m-t-lg" @click="addNew">Add new</b-button>
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Calendar from '@/components/Calendar.vue';
import { Event } from '@/types/event';
import { isSameDay } from '@/helpers/datetime';

@Component({
  components: {
    Card,
    Calendar
  }
})
export default class Admin extends Vue {
  calendarDate: Date = new Date();

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

  addNew() {
    this.$toast.open({
      message: 'To be implemented'
    });
  }

  deleteEvent(event) {
    this.$store.dispatch('events/deleteEvent', event);
  }
}
</script>
