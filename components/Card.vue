<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">{{ title }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <slot />
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() title;
}
</script>
