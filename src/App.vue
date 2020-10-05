<template>
  <div id="app">

  </div>
</template>

<style lang="stylus" src="./assets/style.styl"></style>

<script>
export default {
  data: () => ({
    allHandlers: [],
    source: "",
    timeout: 30000,
    title: "",
    body: "",
    combined: ""
  }),
  methods: {
    sendToast: function(data) {
       this.$toast(data, {
        position: "bottom-right",
        timeout: this.timeout,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.1,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: false,
        icon: false,
        toastClassName: "my-custom-toast-class",
        bodyClassName: ["custom-class-1"],
        transition: "Vue-Toastification__fade",
        maxToasts: 10,
        rtl: false
      });
    }
  },

  created() {
    const tmi = require("tmi.js");
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true
      },
      
      channels: ["ioshinigami"]
    });

    client.connect();

    client.on("message", (channel, tags, message) => {
      this.source = `${tags["display-name"]} : \n ${message}`;
      this.title = `${tags["display-name"]}`;
      this.body = `${message}`;
      this.combined = '[ "' + this.title.toUpperCase() + '" ]' + "  \n" + ">  " + this.body;
      const newData = this.combined
      this.sendToast(newData)

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
