<template>
  <v-layout wrap align-content-start light-blue>
    <v-flex xs12 mt-3 text-xs-center display-3 white--text>
      {{ title }}
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserAuthority extends Vue {
  title = "User Authority Page";
}
</script>
