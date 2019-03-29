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

    <v-btn :loading="loading" :disabled="loading" icon @click.stop="signOut">
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
  readonly langs: any;

  themes = [
    {
      id: "light",
      name: "Light",
      color: {
        primary: "#ab3b3a"
      }
    }
  ];

  @Emit("update:dark")
  changeBright() {
    const flag = !this.dark;

    localStorage.dark = flag;

    return flag;
  }

  loading = !1;

  setTheme(id: string) {
    localStorage.theme = id;

    this.themes.forEach((theme, index) => {
      if (id === theme.id)
        this.$vuetify.theme = getTheme(this.themes[index].color);
    });
  }

  setLang(lang: string) {
    localStorage.lang = lang;
    this.$i18n.locale = lang;
  }

  async signOut() {
    if (this.loading) return;

    try {
      this.$emit("update:dark", !1);
      this.loading = !0;
      await this.$store.dispatch("user/logout");
      this.loading = !1;

      this.$vuetify.theme = getTheme();
      this.$router.push("/login");
    } catch (e) {
      this.loading = !1;
      throw e;
    }
  }

  @Emit("update:dark")
  created() {
    let theme = this.themes[0].id;
    let lang = this.langs[0].code;
    let dark = !1;

    theme = localStorage.theme || theme;
    lang = localStorage.lang || lang;
    if (localStorage.dark) dark = localStorage.dark === "true" ? !0 : !1;

    this.setTheme(theme);
    this.setLang(lang);
    return dark;
  }
}
</script>
