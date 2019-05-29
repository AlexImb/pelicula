<template>
  <section class="section">
    <div class="columns">
      <div class="column is-narrow">
        <calendar v-model="calendarDate" :events="calendarEvents" />
      </div>
      <card :title="calendarDate.toLocaleDateString()"></card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Calendar from '@/components/Calendar.vue';

@Component({
  components: {
    Card,
    Calendar
  }
})
export default class Overview extends Vue {
  calendarDate: Date = new Date();
  calendarEvents = [];
}
</script>
