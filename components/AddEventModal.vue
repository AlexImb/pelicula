<template>
  <b-modal :active="isActive" :width="640" scroll="keep">
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ event ? 'Edit event' : 'Add event' }}</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Description">
            <b-input v-model="form.description" type="text"> </b-input>
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
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class AddEventModal extends Vue {
  @Prop({ default: null }) event: any;
  @Prop() isActive: boolean;
  form: { id?: string; description: string } = { description: '' };

  @Watch('isActive')
  onActiveChange(val: boolean) {
    if (val) {
      this.form = this.event ? { id: this.event.id, description: this.event.description } : { description: '' };
    } else {
      this.form = { description: '' };
    }
  }

  @Emit()
  close() {
    return null;
  }

  @Emit()
  save() {
    return this.form;
  }
}
</script>
