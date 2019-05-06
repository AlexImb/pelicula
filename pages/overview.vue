<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Upcoming movie night">
        <search-bar />
      </card>
    </div>
  </section>
</template>

<style lang="scss"></style>

<script>
import Card from '~/components/Card'
import SearchBar from '~/components/SearchBar'

export default {
  components: {
    Card,
    SearchBar
  }
}
</script>
