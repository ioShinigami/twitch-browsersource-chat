<template>
  <div id="app">
    <vue-snotify></vue-snotify>
  </div>
</template>

<style lang="stylus" src="./assets/style.styl"></style>

<script>
export default {
  data: () => ({
    allHandlers: [
      "https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/2x", // NOTE : OMEGALUL
      "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/2x", // NOTE : MONKAS
      "https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/2x", // NOTE : POGGERS
      "https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/2x", // NOTE : PEPEHANDS
      "https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/2x", // NOTE : EZ
      "https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/2x", // NOTE : PEPEJAM
      "https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/2x", // NOTE : CATJAM
      "https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/2x", // NOTE : KEKW
      "https://cdn.betterttv.net/emote/59b73909b27c823d5b1f6052/2x", // NOTE : PEPELAUGH
      "https://cdn.betterttv.net/emote/5d20a55de1cfde376e532972/2x", // NOTE : WEIRDCHAMP
      "https://cdn.betterttv.net/emote/59143b496996b360ff9b807c/2x", // NOTE : GACHIHYPER
      "https://cdn.betterttv.net/emote/5a6edb51f730010d194bdd46/2x", // NOTE : PEPODANCE
      "https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/2x", // NOTE : DITTO
      "https://cdn.betterttv.net/emote/5c36fba2c6888455faa2e29f/2x", // NOTE : PEPEJAMJAM
      "https://cdn.betterttv.net/emote/5d922afbc0652668c9e52ead/2x", // NOTE : PEPOARRIVE
      "https://cdn.betterttv.net/emote/5aea37908f767c42ce1e0293/2x", // NOTE : POGSLIDE
      "https://cdn.betterttv.net/emote/5c857788f779543bcdf37124/2x", // NOTE : F
      "https://cdn.betterttv.net/emote/5cd6b08cf1dac14a18c4b61f/2x", // NOTE : PAUSECHAMP
      "https://cdn.betterttv.net/emote/58f6e05e58f5dd226a16166e/2x", // NOTE : MONKAGUN
      "https://cdn.betterttv.net/emote/5abd36396723dc149c678e90/2x", // NOTE : PEPOCHEER
      "https://cdn.betterttv.net/emote/5ec059009af1ea16863b2dec/2x", // NOTE : PETTHEPEEPO
      "https://cdn.betterttv.net/emote/5de45e0d515a2a77bc9e723d/2x", // NOTE : SALAMI
      "https://cdn.betterttv.net/emote/56d6fbb4d5d429963e27410c/2x", // NOTE : DOGGO
      "https://cdn.betterttv.net/emote/55999813f0db38ef6c7c663e/2x", // NOTE : GACCHIGASM
      "https://cdn.betterttv.net/emote/5ba6d5ba6ee0c23989d52b10/2x", // NOTE : BONGOTAP
      "https://cdn.betterttv.net/emote/5afdd149b5f610729e2f6e75/2x", // NOTE : LICKR
      "https://cdn.betterttv.net/emote/5afdd15ab5f610729e2f6e7a/2x", // NOTE : LICKL
      "https://cdn.betterttv.net/emote/5b15162147c7bf3bfc0b9c76/2x", // NOTE : PEPESMOKE
      "https://cdn.betterttv.net/emote/5e1a76dd8af14b5f1b438c04/2x", // NOTE : WIDEPEEPOHAPPY
      "https://cdn.betterttv.net/emote/5952d512023a013b5077a9ab/2x", // NOTE : MONKAS MULTIPLE
      "https://cdn.betterttv.net/emote/5cafb22c1a07c923f3f1db0e/2x", // NOTE : AYAYA
      "https://cdn.betterttv.net/emote/592ed12be9f5aa0463767b7f/2x" // NOTE : DOGE DANCE
    ],
    source: "",
    timeout: 30000,
    urldata: "http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0",
    baseUrl: "https://api.twitch.tv/kraken/channels/",
    titleDelimit: "> ",
    title: null,
    body: "",
    badges: "",
    emotes: "",
    icon: null,
    profileImage: "",
    info: null,
    combined: ""
  }),
  methods: {
    findUserProfileImage: function() {
      var max = Math.floor(this.allHandlers.length);
      var min = Math.ceil(1);
      var newRandomMath = Math.floor(Math.random() * (max - min) + min);
      this.icon = this.allHandlers[newRandomMath];
    },
    // NOTE : This currently continues firing the current notification for testing
    // TODO : Remove the Interval and Secondary toast fire
    sendToast: function(mode) {
      if (mode) {
        this.$snotify.simple(this.body, this.titleDelimit + this.title, {
          bodyMaxLength: 510,
          maxOnScreen: 5,
          maxAtPosition: 5,
          icon:
            "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1"
        });
      } else {
        this.$snotify.simple(this.body, this.titleDelimit + this.title, {
          bodyMaxLength: 510,
          maxOnScreen: 5,
          maxAtPosition: 5,
          icon: this.icon
        });
      }
    }
  },

  created() {
    const tmi = require("tmi.js");
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true
      },

      channels: ["citrusf"]
    });

    client.connect();

    client.on("message", (channel, tags, message) => {
      console.log("created -> tags", tags);
      console.log("created -> tags", tags.mod);
      if (tags.mod === true) {
        var mode = true;
        console.log("mode");
        this.source = `${tags["display-name"]} : \n ${message}`;
        this.title = `${tags["display-name"]}`;
        this.emotes = `${tags["emotes-raw"]}`;
        this.badges = `${tags["badges"]}`;
        (this.profileImage = `${tags["user-id"]}`), (this.body = `${message}`);
        this.combined =
          '[ "' + this.title.toUpperCase() + '" ]' + "  \n" + ">  " + this.body;
        this.sendToast(mode);
        this.findUserProfileImage();
      } else {
        console.log("not mode");
        mode = false;
        this.source = `${tags["display-name"]} : \n ${message}`;
        this.title = `${tags["display-name"]}`;
        this.emotes = `${tags["emotes-raw"]}`;
        this.badges = `${tags["badges"]}`;
        (this.profileImage = `${tags["user-id"]}`), (this.body = `${message}`);
        this.combined =
          '[ "' + this.title.toUpperCase() + '" ]' + "  \n" + ">  " + this.body;
        this.sendToast(mode);
        this.findUserProfileImage();
      }

      // TODO find a way to get twitch user img
    });
  }
};
</script>
