<template>
  <div v-if="dataset != null" class="hero is-fullheight">
    {{dataset}}
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div class="hero-body">
      <div class="container">
        <div v-if="dataset != null" class="tile is-ancestor">
          <div class="tile is-vertical is-12">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-grey">
                  <p class="title has-text-centered">For today {{today}} people</p>
                </article>
                <article class="tile is-child notification is-light">
                  <p class="title has-text-centered">Users</p>
                  <chart v-if="dataset != null" :type="'line'" :data="dataset.users"></chart>
                </article>
              </div>
              <div class="tile is-parent is-4">
                <article class="tile is-child notification is-light">
                  <p class="title has-text-centered">Platforms</p>
                  <chart v-if="dataset != null" :type="'pie'" :data="dataset.platforms"></chart>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "vue-bulma-chartjs";

export default {
  name: "ChartsView",
  components: {
    Chart
  },
  beforeMount: function() {
    this.loadData();
  },
  data: function() {
    return {
      isLoading: true,
      today: 0,
      data: null,
      dataset: {
        platforms: {
          labels: ["Mobile", "Table", "Unknow", "PC"],
          datasets: [
            {
              data: [0, 0, 0, 0],
              backgroundColor: [
                "#1fc8db",
                "#fce473",
                "#42afe3",
                "#ed6c63",
                "#97cd76"
              ]
            }
          ]
        },
        users: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: "#3399ff"
            }
          ]
        }
      }
    };
  },
  methods: {
    loadData: async function() {
      this.isLoading = true;
      let self = this;

      this.axios({
        method: "get",
        url: "http://127.0.0.1:5000/charts",
        params: {
          token: "token"
        }
      })
        .then(function(r) {
          self.makeData(r.data.data);
        })
        .catch(function(e) {
          self.$snackbar.open({ type: "is-danger", message: e.toString() });
        })
        .then(function() {
          self.isLoading = false;
        });
    },
    makeData: function(data) {
      let date = new Date();
      console.log(data)
      this.today =
        data[date.getFullYear()][date.getUTCMonth() + 1][date.getUTCDate()].all;

      this.dataset.users.labels = Object.keys(data[date.getFullYear()]);
      this.dataset.users.datasets.data = Object.values(
        data[date.getFullYear()]
      );
    }
  }
};
</script>

<style>
</style>
