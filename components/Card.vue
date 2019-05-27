<template>
  <div class="column" :class="size">
    <div class="card" :class="customClass">
      <slot name="header">
        <header class="card-header">
          <p v-if="title" class="card-header-title has-text-grey">{{ title }}</p>
        </header>
      </slot>
      <div class="card-content">
        <div class="content">
          {{size}}
          {{customClass}}
          <slot />
        </div>
      </div>
      <footer class="card-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() title;
  @Prop() size;
  @Prop() customClass;
}
</script>
