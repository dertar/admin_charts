<template>
  <div :id="$options.name">
    <charts-view/>
  </div>
</template>

<script>
import ChartsView from "@/views/ChartsView.vue";

export default {
  name: "app",
  components: {
    ChartsView
  },
  methods: {
    dispatchInfo: async function() {
      var browser = require("@/browsers.js");
      let self = this;

      this.axios({
        method: "put",
        url: "http://127.0.0.1:5000/charts",
        data: {
          browser: browser.BrowserDetect.browser,
          mobile: browser.isMobile.any(),
          new: true
        }
      }).catch(function(e) {
        self.$snackbar.open({ type: "is-danger", message: e.toString() });
      });
    }
  },
  beforeMount: function() {
    this.dispatchInfo();
  }
};
</script>

<style>
</style>
