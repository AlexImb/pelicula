<template>
  <span>
    <b-datepicker :events="events" :value="value" inline @input="selectDate" />
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() readonly events;
  @Prop({ type: Date, default: () => new Date() }) value: Date;

  @Emit('input')
  selectDate(date) {
    return date;
  }
}
</script>
