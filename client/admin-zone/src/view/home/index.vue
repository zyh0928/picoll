<template>
  <v-layout wrap justify-center align-content-start>
    <v-flex xs12>
      <v-toolbar height="60">
        <v-icon color="primary" size="36">person</v-icon>
        <v-toolbar-title> {{ $t("view.home.title") }}</v-toolbar-title>
      </v-toolbar>
    </v-flex>

    <v-flex xs10 md8 lg6 xl4 mt-3>
      <v-card v-if="!$util.isEmpty(profile)">
        <v-card-text>
          <v-text-field
            :label="$t('model.user.account')"
            :value="profile.account"
            readonly
          />

          <v-text-field
            :label="$t('model.user.nickname')"
            :value="profile.nickname"
            readonly
          />

          <v-text-field
            :label="$t('model.user.email')"
            :value="profile.email"
            readonly
          />

          <v-text-field
            :label="$t('model.user.phone')"
            :value="profile.phone"
            readonly
          />

          <v-text-field
            :label="$t('model.userAuth.name')"
            :value="profile.auth[$i18n.locale]"
            readonly
          />

          <v-text-field
            :label="$t('model.userAuth.power')"
            :value="profile.auth.power"
            readonly
          />

          <v-text-field
            :label="$t('model.user.createdAt')"
            :value="$util.parseDate(profile.createdAt, $i18n.locale)"
            readonly
          />

          <v-text-field
            :label="$t('model.user.loginAt')"
            :value="$util.parseDate(profile.loginAt, $i18n.locale)"
            readonly
          />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const userModule = namespace("user");

@Component
export default class Home extends Vue {
  created() {}
  @userModule.State
  profile: any;
}
</script>
