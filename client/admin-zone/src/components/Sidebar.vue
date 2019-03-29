<template>
  <v-navigation-drawer app clipped fixed v-model="$store.state.drawer">
    <v-list> </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {}
</script>
