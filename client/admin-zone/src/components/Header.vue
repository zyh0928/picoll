<template>
  <v-toolbar height="40" color="primary" app clipped-left fixed flat dark>
    <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.commit('showDrawer')"
    />

    <v-toolbar-title class="subheading hidden-sm-and-down">
      {{ $t(`common.title`) }}
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon @click.stop="changeBright">
      <v-icon> {{ dark ? "brightness_3" : "wb_sunny" }} </v-icon>
    </v-btn>

    <v-menu
      v-if="themes.length"
      transition="slide-y-transition"
      offset-y
      bottom
    >
      <template #activator="{on}">
        <v-btn v-on="on" icon>
          <v-icon>color_lens</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="({ id, color, name }, index) in themes"
          :key="`header-theme${index}`"
          :color="color.primary"
          ripple
          @click.stop="setTheme(id)"
        >
          <v-list-tile-avatar>
            <v-icon :color="color.primary">format_color_fill</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="name" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu transition="slide-y-transition" offset-y>
      <template #activator="{on}">
        <v-btn v-on="on" icon> <v-icon>language</v-icon> </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="({ code, label }, index) in langs"
          :key="`header-lang${index}`"
          color="primary"
          ripple
          @click.stop="setLang(code)"
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

    <v-btn
      :loading="outLoading"
      :disabled="outLoading"
      icon
      @click.stop="signOut"
    >
      <v-icon> power_settings_new </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State } from "vuex-class";
import { getTheme } from "@/util";

@Component
export default class Header extends Vue {
  @Prop(Boolean)
  readonly dark!: boolean;

  @State("domain.resource")
  readonly resource!: string;

  @State
  readonly langs!: any[];

  @State
  readonly themes!: any[];

  @Emit("update:dark")
  changeBright() {
    const flag = !this.dark;

    localStorage.dark = flag;

    return flag;
  }

  outLoading = !1;

  setTheme(id: string) {
    localStorage.theme = id;

    this.themes.forEach((theme, index) => {
      if (id === theme.id)
        this.$vuetify.theme = getTheme(this.themes[index].color);
    });
  }

  setLang(lang: string) {
    localStorage.lang = lang;
    document.documentElement.lang = lang;

    this.$i18n.locale = lang;
  }

  async signOut() {
    if (this.outLoading) return;

    try {
      this.outLoading = !0;
      await this.$store.dispatch("user/logout");
      this.outLoading = !1;

      this.$vuetify.theme = getTheme();
      this.$router.push("/login");
    } catch (e) {
      this.outLoading = !1;
      throw e;
    }
  }

  created() {
    let lang;
    let theme;
    let dark;
    switch (navigator.language.substring(0, 2)) {
      case "zh":
        lang = this.langs[0].code;
        break;

      // en
      default:
        lang = this.langs[1].code;
        break;
    }

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

      theme = !localStorage.theme ? this.themes[0].id : localStorage.theme;
      dark = localStorage.dark === "true" ? !0 : !1;
    } catch {
      let lang = this.langs[0].code;
      let theme = this.themes[0].id;
      let dark = !1;
    }

    this.setTheme(theme);
    this.setLang(lang);
    this.$emit("update:dark", dark);
  }
}
</script>
