<template>
  <div id="app">
    <vue-snotify></vue-snotify>
  </div>
</template>

<style lang="stylus" src="./assets/style.styl"></style>

<script>
const oAuth = require("./utils/authHandler");
const imageHandler = require("./utils/imageHandler");
const commandHandler = require("./utils/commandHandler");
const responseHandler = require("./utils/responseHandler");
export default {
  data: () => ({
    availableCommands: commandHandler.commands,
    allHandlers: imageHandler.images,
    timeout: 30000,
    urldata: "http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0",
    baseUrl: "https://api.twitch.tv/kraken/channels/",
    titleDelimit: "> ",
    source: {},
    title: null,
    body: "",
    badges: "",
    emotes: "",
    combined: "",
    profileImage: "",
    icon: null,
    info: null,
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
      identity: {
        username: "thisWAIFU",
        password: oAuth.oAuth
      },
      channels: ["thiswaifu"]
    });

    client.connect();

    client.on("message", (channel, tags, message, self) => {
      if (self) return;
      var isValidCommand = this.availableCommands.includes(
        message.toLowerCase()
      );
      if (isValidCommand) {
        var index = this.availableCommands.indexOf(message.toLowerCase());
        client.say(
          channel,
          `@${tags.username} ` + responseHandler.responses[index]
        );
      } else {
        if (tags.mod === true) {
          var mode = true;
          console.log("mode");
          this.source = `${tags["display-name"]} : \n ${message}`;
          this.title = `${tags["display-name"]}`;
          this.emotes = `${tags["emotes-raw"]}`;
          this.badges = `${tags["badges"]}`;
          (this.profileImage = `${tags["user-id"]}`),
            (this.body = `${message}`);
          this.combined =
            '[ "' +
            this.title.toUpperCase() +
            '" ]' +
            "  \n" +
            ">  " +
            this.body;
          this.sendToast(mode);
          this.findUserProfileImage();
        } else {
          console.log("not mode");
          mode = false;
          this.source = `${tags["display-name"]} : \n ${message}`;
          this.title = `${tags["display-name"]}`;
          this.emotes = `${tags["emotes-raw"]}`;
          this.badges = `${tags["badges"]}`;
          (this.profileImage = `${tags["user-id"]}`),
            (this.body = `${message}`);
          this.combined =
            '[ "' +
            this.title.toUpperCase() +
            '" ]' +
            "  \n" +
            ">  " +
            this.body;
          this.sendToast(mode);
          this.findUserProfileImage();
        }

        // TODO find a way to get twitch user img
      }
    });
  }
};
</script>
