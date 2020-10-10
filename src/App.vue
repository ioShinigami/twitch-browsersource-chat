<template>
 <div id="app">
  <vue-snotify ></vue-snotify>
 </div>
</template>

<style lang="stylus" src="./assets/style.styl"></style>

<script>

export default {
  data: () => ({
    allHandlers: [ 
                    "https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/2x",
                    "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/2x",
                    "https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/2x",
                    "https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/2x",
                    "https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/2x",
                    "https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/2x",
                    "https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/2x",
                    "https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/2x",
                    "https://cdn.betterttv.net/emote/59b73909b27c823d5b1f6052/2x",
                    "https://cdn.betterttv.net/emote/5d20a55de1cfde376e532972/2x",
                    "https://cdn.betterttv.net/emote/59143b496996b360ff9b807c/2x",
                    "https://cdn.betterttv.net/emote/5a6edb51f730010d194bdd46/2x",
                    "https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/2x",
                    "https://cdn.betterttv.net/emote/5c36fba2c6888455faa2e29f/2x",
                    "https://cdn.betterttv.net/emote/5d922afbc0652668c9e52ead/2x",
                    "https://cdn.betterttv.net/emote/5aea37908f767c42ce1e0293/2x",
                    "https://cdn.betterttv.net/emote/5c857788f779543bcdf37124/2x",
                    "https://cdn.betterttv.net/emote/5cd6b08cf1dac14a18c4b61f/2x",
                    "https://cdn.betterttv.net/emote/58f6e05e58f5dd226a16166e/2x",
                    "https://cdn.betterttv.net/emote/5abd36396723dc149c678e90/2x",
                    "https://cdn.betterttv.net/emote/5ec059009af1ea16863b2dec/2x",
                    "https://cdn.betterttv.net/emote/5de45e0d515a2a77bc9e723d/2x",
                    "https://cdn.betterttv.net/emote/56d6fbb4d5d429963e27410c/2x"

                  
          ],
    source: "",
    timeout: 30000,
    urldata: "http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0",
    baseUrl: "https://api.twitch.tv/kraken/channels/",
    titleDelimit: ">",
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
    var max = Math.floor(this.allHandlers.length)
    var min = Math.ceil(1)
    var newRandomMath = Math.floor(Math.random() * (max - min) + min);
    console.log("randomImageMath", newRandomMath)
    this.icon = this.allHandlers[newRandomMath]
    

    },
    // NOTE : This currently continues firing the current notification for testing
    // TODO : Remove the Interval and Secondary toast fire
    sendToast: function() {
      console.log("thisicon",this.allHandlers)
      if(this.body.length >= 44) {
        console.log("ITS LONGBOI")
        //this.body.length[43] = this.body + `\n`
      }
      this.$snotify.simple(this.body, this.titleDelimit+this.title, {
        bodyMaxLength: 510,
        maxOnScreen: 5,
        maxAtPosition: 5,
        icon: this.icon,
      })     
    }
  },

  created() {
    const tmi = require("tmi.js");
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true
      },
      
      channels: ["thiswaifu"]
    });

    client.connect();

    client.on("message", (channel, tags, message) => {
     console.log(tags)
      this.source = `${tags["display-name"]} : \n ${message}`;
      this.title = `${tags["display-name"]}`;
      this.emotes = `${tags["emotes-raw"]}`;
      this.badges =`${tags["badges"]}`
      this.profileImage = `${tags["user-id"]}`,
      //client.say("message", "Testdata Kappa Testdata");
      console.log("created -> this.profileImage", this.profileImage)
      this.body = `${message}`;
      this.combined = '[ "' + this.title.toUpperCase() + '" ]' + "  \n" + ">  " + this.body;
      //var test = this.sendToEmoteSanitize(this.body, this.emotes)
      //console.log("created -> test", test)  

      this.sendToast()
      this.findUserProfileImage()
      // TODO find a way to get twitch user img
     
     /* this.$toast(this.combined, {
        timeout: this.timeout,
        position: POSITION.BOTTOM_RIGHT,  
        toastClassName: "my-custom-toast-class",
        bodyClassName: ["custom-class-1", "custom-class-2"],
        transition: "Vue-Toastification__fade",
        maxToasts: 10
      });*/
    });
  }
};

</script>

