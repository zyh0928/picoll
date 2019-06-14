<template>
  <v-app :dark="dark">
    <picoll-sidebar v-if="!$util.isEmpty(profile)" />

    <picoll-header :dark.sync="dark" v-if="!$util.isEmpty(profile)" />

    <v-content>
      <v-container fill-height fluid pa-0>
        <transition
          enter-active-class="animated fast jackInTheBox"
          leave-active-class="animated fast zoomOut"
          mode="out-in"
        >
          <router-view :dark.sync="dark" />
        </transition>

        <transition
          enter-active-class="animated faster fadeIn"
          leave-active-class="animated faster fadeOut"
        >
          <v-layout
            :style="{
              width: '100%',
              height: '100%',
              position: 'absolute',
              background: loading.background
            }"
            align-center
            column
            justify-center
            v-show="loading.show"
          >
            <img
              :src="`${resource}icon/loading/${loading.icon}.svg`"
              :width="loading.size"
            />
            <span
              :class="[`${loading.color}--text`]"
              :style="{ maxWidth: loading.size * 2 + 'px' }"
              class="title pt-1 text-truncate"
            >
              {{ loadingMsg }}
            </span>
          </v-layout>
        </transition>
      </v-container>
    </v-content>

    <v-snackbar
      :bottom="notification.y === 'bottom'"
      :color="notification.color"
      :left="notification.x === 'left'"
      :right="notification.x === 'right'"
      :timeout="notification.time"
      :top="notification.y === 'top'"
      v-model="notification.show"
    >
      {{ notificationMsg }}
      <v-btn @click.stop="setNotification" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import PicollHeader from "@/components/Header.vue";
import PicollSidebar from "@/components/Sidebar.vue";
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";

const userModule = namespace("user");

@Component({
  components: {
    PicollHeader,
    PicollSidebar
  }
})
export default class App extends Vue {
  @State("domain.resource")
  readonly resource!: string;

  @State
  readonly loading: any;

  @State
  readonly notification: any;

  @userModule.State
  readonly profile: any;

  dark = !1;

  get loadingMsg() {
    const { key, values } = this.loading.i18n;

    return this.$te(key) ? this.$t(key, values) : key;
  }

  get notificationMsg() {
    const { key, values } = this.notification.i18n;

    return this.$te(key) ? this.$t(key, values) : key;
  }

  @Mutation
  setNotification!: Function;

  created() {
    this.$store.dispatch("sayOkay", "common.title");
  }
}
</script>
