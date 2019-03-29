<template>
  <v-layout align-content-start red wrap>
    <v-flex display-3 mt-3 text-xs-center white--text xs12>
      {{ title }}
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {
  title = "404: Not found";
}
</script>
