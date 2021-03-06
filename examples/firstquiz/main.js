import Vue from "vue";
import VueRouter from "vue-router";
import "@babel/polyfill";
import "mutationobserver-shim";
import "../../src/plugins/bootstrap-vue";
import RetirementReferral from "./RetirementReferral.vue";
import Intro from "./views/Intro.vue";
import Main from "./views/Main.vue";
import Results from "./views/Results.vue";
import RetirementOptions from "./views/RetirementOptions.vue";
import VTooltip from "v-tooltip";
import Vuex from "vuex";
import store from "../../src/store";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("VueSlider", VueSlider);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Intro",
    component: Intro
  },
  {
    path: "/input",
    name: "input",
    component: RetirementReferral
  },
  {
    path: "/results",
    name: "results",
    component: Results
  },
  {
    path: "/retirement-options",
    name: "retirement options",
    component: RetirementOptions
  }
];

const router = new VueRouter({
  base: "/",
  routes
});

Vue.use(VTooltip, {
  defaultTrigger: window.innerWidth > 768 ? "hover focus click" : "click"
});

var app = new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount("#app");
