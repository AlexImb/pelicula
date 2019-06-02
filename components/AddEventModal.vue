<template>
  <b-modal :active="isActive" :width="640" scroll="keep">
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Add event</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Description">
            <b-input v-model="event.description" type="text"> </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click.prevent="close">Close</button>
          <button class="button is-primary" @click.prevent="save">Save</button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class AddEventModal extends Vue {
  @Prop() isActive: boolean;
  event = {
    description: ''
  };

  @Emit()
  close() {
    return null;
  }

  @Emit()
  save() {
    return this.event;
  }
}
</script>
