<template>
  <v-layout column primary>
    <v-flex xs1>
      <v-layout align-center column>
        <v-menu offset-y transition="slide-y-transition">
          <template #activator="{on}">
            <v-btn class="align-self-end" dark icon v-on="on">
              <v-icon>language</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              :key="`login-lang${index}`"
              @click.stop="setLang(code)"
              color="primary"
              ripple
              v-for="({ code, label }, index) in langs"
            >
              <v-list-tile-avatar>
                <v-img
                  :src="`${resource}icon/national-flag/${code}_rect_ani.svg`"
                  width="60"
                />
              </v-list-tile-avatar>
              <v-list-tile-title> {{ label }} </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-card
          :ripple="{ class: 'primary--text' }"
          @click.stop="clickImg"
          class="overflow-hidden"
          hover
          style="border-radius:50%"
        >
          <transition
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutDown"
          >
            <v-img
              :src="`${resource}icon/loading/${imgs[imgIndex] || 'heart'}.svg`"
              v-show="imgShow"
              width="200"
            />
          </transition>
        </v-card>

        <div class="display-1 white--text my-3">
          {{ $t("common.title") }}
        </div>
      </v-layout>
    </v-flex>

    <v-flex elevation-9 py-5 white xs1>
      <v-card class="mx-auto" flat width="360">
        <v-card-text>
          <v-text-field
            :error-messages="errors.collect('user.account')"
            :label="$t('model.user.account')"
            @keyup.enter="signIn"
            color="accent"
            counter
            data-vv-name="user.account"
            maxlength="16"
            v-model="account"
            v-validate="'required'"
          />

          <v-text-field
            :append-icon="visibility ? 'visibility_off' : 'visibility'"
            :error-messages="errors.collect('user.password')"
            :label="$t('model.user.password')"
            :type="visibility ? 'text' : 'password'"
            @click:append="visibility = !visibility"
            @keyup.enter="signIn"
            color="accent"
            counter
            data-vv-name="user.password"
            maxlength="20"
            v-model="password"
            v-validate="'required'"
          />

          <v-btn
            :disabled="inLoading"
            :loading="inLoading"
            @click.stop="signIn"
            block
            class="mt-3"
            color="accent"
          >
            {{ $t("view.login.label") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { mapFields } from "vee-validate";

@Component
export default class Login extends Vue {
  @State("domain.resource")
  readonly resource!: string;

  @State
  readonly langs: any;

  @State("icons")
  readonly imgs!: string[];

  imgShow = !0;
  imgIndex = -1;
  timer = setInterval(this.changeImg, 6000);

  account = "";
  password = "";
  visibility = !1;

  inLoading = !1;

  clickImg() {
    this.changeImg();

    clearInterval(this.timer);

    this.timer = setInterval(this.changeImg, 6000);
  }

  changeImg() {
    if (!this.imgShow) return;

    this.imgShow = !1;
    setTimeout(() => {
      this.imgIndex = Math.floor(Math.random() * this.imgs.length);
      this.imgShow = !0;
    }, 1000);
  }

  setLang(lang: string) {
    localStorage.lang = lang;
    document.documentElement.lang = lang;

    this.$i18n.locale = lang;
  }

  async signIn() {
    if (this.inLoading) return;

    const flagAccount = await this.$validator.validate("user.account");
    const flagPassword = await this.$validator.validate("user.password");
    const valid = flagAccount && flagPassword;
    if (!valid) return;

    try {
      this.inLoading = !0;
      await this.$store.dispatch("user/login", {
        account: this.account,
        password: this.password
      });
      this.inLoading = !1;

      this.$router.push("/home");
    } catch (e) {
      this.inLoading = !1;
      throw e;
    }
  }

  async created() {
    await this.$emit("update:dark", !1);

    let lang;

    try {
      if (!localStorage.lang)
        switch (navigator.language.substring(0, 2)) {
          case "zh":
            lang = this.langs[0].code;
            break;

          // en
          default:
            lang = this.langs[1].code;
            break;
        }
      else lang = localStorage.lang;
    } catch {
      lang = this.langs[0].code;
    }

    this.setLang(lang);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
