import Vue from "vue";
import Vuex from "vuex";
import * as TaxApi from "../api/TaxApi.js";
import * as SMETaxCalculations from "../taxData/SMETaxCalculations.js";
import * as TaxTable from "../taxData/TaxTable.js";

Vue.use(Vuex);

// Module for containing the data to Results.vue for the initial tax calculations based on user's input
const userInformation = {
  namespaced: true,
  state: {
    progressiveTax: 0,
    userInput: {
      tax_filing_status: "headOfHousehold",
      age: 37,
      salary: 32000,
      entity: "llc"
    }, // data captured in RetirementReferral.vue input form
    incomeData: {}, // data formatted from the input for tax API
    taxUpdate: {}, // tax API's output data to be displayed in Results.vue
    taxSummary: {
      totalIncome: 80000,
      profitAfterExpenses: 51111,
      profitAfterTaxes: 41111,
      totalDeduction: 20000,
      totalFederalTax: 0
    }
  },
  actions: {
    setTotalFederalTax({ commit }, payload) {
      commit("mutateTotalFederalTax", payload);
    },
    getTotalIncome({ commit }) {
      commit("setTotalIncome");
    },
    getProfitAfterExpenses({ commit }) {
      commit("setProfitAfterExpenses");
    },
    getProfitAfterTaxes({ commit }) {
      commit("setProfitAfterTaxes");
    },
    setProgressiveTax({ commit }, payload) {
      commit("mutateProgressiveTax", payload);
    },
    async getTotalDeduction({ commit }) {
      try {
        const response = await SMETaxCalculations.addTotalDeduction();
        commit("setTotalDeduction", response);
      } catch (err) {
        console.error(err);
      }
    },
    async getTaxSummary({ dispatch }) {
      dispatch("getTotalDeduction");
      await dispatch("getTotalIncome");
      await dispatch("getProfitAfterExpenses");
      await dispatch("getProfitAfterTaxes");
    }
  },
  mutations: {
    mutateProgressiveTax(state, data) {
      state.progressiveTax = data;
    },
    mutateTotalFederalTax(state, data) {
      state.taxSummary.totalFederalTax = data;
    },
    entry(state, data) {
      console.log(data);
      state.userInput = data;
    },
    results(state, data) {
      const { taxBalance } = data;
      state.taxUpdate = {
        ...data,
        totalTaxBalance: Math.abs(taxBalance + state.progressiveTax)
      };
    },
    setTotalIncome(state) {
      if (
        state.userInput.salary === undefined ||
        state.userInput.salary === ""
      ) {
        state.taxSummary.totalIncome = parseInt(state.userInput.income);
      } else {
        state.taxSummary.totalIncome =
          parseInt(state.userInput.income) + parseInt(state.userInput.salary);
      }
    },
    setProfitAfterExpenses(state) {
      state.taxSummary.profitAfterExpenses =
        parseInt(state.taxSummary.totalIncome) -
        parseInt(state.userInput.expenses);
    },
    setProfitAfterTaxes(state) {
      const rounded =
        Math.round(
          (parseFloat(state.taxSummary.profitAfterExpenses) -
            parseFloat(state.taxUpdate.taxBalance)) *
            100
        ) / 100;

      state.taxSummary = {
        ...state.taxSummary,
        totalProfitAfterTaxes: Math.abs(rounded - state.progressiveTax),
        profitAfterTaxes: rounded
      };
    },
    setTotalDeduction(state, data) {
      state.taxSummary.totalDeduction = data;
    }
  }
};
// Module for containing the data to RetirementOptions.vue for the calculations to define Tax Avoided
const calculatorDrag = {
  namespaced: true,
  state: {
    taxData0: {}, // additional objects from Results.vue to be used in RetirementOptions.vue
    postIraTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      personalContribution: null
    }, // calculations to be displayed in RetirementOptions.vue
    postSepIraTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      businessContribution: null
    }, // calculations to be displayed in RetirementOptions.vue
    postSimpleIraTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      personalContribution: null,
      businessContribution: null
    }, // calculations to be displayed in RetirementOptions.vue
    postIndividual401kTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      personalContribution: null,
      businessContribution: null
    } // calculations to be displayed in RetirementOptions.vue
  },
  mutations: {
    setTaxAvoided(state, data) {
      state.postIraTaxData.taxAvoided = data;
    }
  },
  actions: {
    async getTaxAvoided({ commit }) {
      try {
        const response = await TaxApi.repostData();
        commit("setTaxAvoided", response);
      } catch (err) {
        console.error(err);
      }
    }
  }
};

const loader = {
  namespaced: true,
  state: {
    loader: false
  },
  mutations: {
    toggle(state, data) {
      if (data) {
        state.loader = data;
      } else {
        state.loader = !state.loader;
      }
    }
  }
};

const store = new Vuex.Store({
  modules: {
    userInformation,
    calculatorDrag,
    loader
  }
});

export default store;
