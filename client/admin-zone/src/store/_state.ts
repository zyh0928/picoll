interface I18n {
  key?: string;
  values?: any[] | { [key: string]: any };
}

interface Loading {
  show?: boolean;
  background?: string;
  size?: number;
  icon?: string;
  i18n: I18n;
  color?: string;
}

interface Notification {
  show?: boolean;
  color?: string;
  i18n: I18n;
  x?: string;
  y?: string;
  time?: number;
}

export default class State {
  readonly path = "picoll/client/admin-zone/";

  readonly debug = process.env.NODE_ENV === "development";

  readonly "domain.api" = this.debug ? "/api/" : "https://api.wjbzg.com/admin/";

  readonly "domain.resource" = "https://resource.wjbzg.com/";

  readonly langs = [
    { code: "zh-Hans", label: "简体中文" },
    { code: "en", label: "English" }
  ];

  drawer = !0;

  loading: Loading = { icon: "heart", i18n: {} };

  notification: Notification = { i18n: {} };

  readonly themes = [
    {
      id: "light",
      name: "Light",
      color: {
        primary: "#ab3b3a"
      }
    }
  ];

  readonly icons = [
    "azure",
    "blocks",
    "blue-cat",
    "bricks",
    "cloudy",
    "color-bar",
    "comments",
    "curve-bars",
    "cutie-fox",
    "DNA",
    "double-ring",
    "equalizer",
    "firework",
    "flask",
    "gear",
    "gears",
    "gear-set",
    "gooey-ring",
    "heart",
    "hexagram",
    "hourglass",
    "HUD",
    "infinity",
    "kaki-dog",
    "lava-lamp",
    "magnify",
    "midori-kappa",
    "pinky-pig",
    "progress",
    "radio",
    "rainy",
    "rocket",
    "sketch",
    "spooky-ghost",
    "square",
    "squaricle",
    "sunny",
    "tail"
  ];
}
