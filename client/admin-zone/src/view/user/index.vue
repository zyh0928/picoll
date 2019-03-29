<template>
  <v-layout wrap align-content-start teal>
    <v-flex xs12 mt-3 text-xs-center display-3 white--text>
      {{ title }}
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class User extends Vue {
  title = "User Page";
}
</script>
