import * as TaxTable from "./TaxTable.js";
import * as TaxApi from "../api/TaxApi.js";
import store from "../store";
import vueCustomSlider from "../../examples/firstquiz/components/vue-slider";
import * as RetirementOptions from "../../examples/firstquiz/views/RetirementOptions";
import { roundOff } from "../../examples/util/round-of";
import { tax_table_2020 } from "./TaxTable";
// Set the deductions from retirement contribution from W2 Income and/or Business Expenses
export function addTotalDeduction() {
  let filingStatus = store.state.userInformation.userInput.tax_filing_status;
  let qbiDeduction = store.state.userInformation.taxUpdate.qbiDeduction;
  let standardDeduction;
  let elderStandardDeduction;
  let totalDeduction;
  if (filingStatus === "headOfHousehold") {
    return (standardDeduction =
      Math.round(
        (parseFloat(TaxTable.tax_table_2020.headOfHousehold_deduction) +
          parseFloat(qbiDeduction)) *
          100
      ) / 100);
  } else if (filingStatus === "married") {
    return (standardDeduction =
      Math.round(
        (parseFloat(TaxTable.tax_table_2020.married_deduction) +
          parseFloat(qbiDeduction)) *
          100
      ) / 100);
  } else if (filingStatus === "single") {
    return (standardDeduction =
      Math.round(
        (parseFloat(TaxTable.tax_table_2020.single_deduction) +
          parseFloat(qbiDeduction)) *
          100
      ) / 100);
  } else if (filingStatus === "marriedFilingSeparately") {
    return (standardDeduction =
      Math.round(
        (parseFloat(TaxTable.tax_table_2020.marriedFilingSeparately_deduction) +
          parseFloat(qbiDeduction)) *
          100
      ) / 100);
  } else {
    standardDeduction = 0;
  }
  console.log("Standard Deduction is:" + standardDeduction);

  //let elderStandardDeduction; **NOT WORKING YET......**
  //if (age >= 65) {
  //  return elderStandardDeduction = 1650 } else if ( age >= 65 && filingStatus === 'married') {
  //  return elderStandardDeduction = 1300 } else { return elderStandardDeduction = 0 };
}

export function setSliderMax() {
  const slider = {};
  let entity = store.state.userInformation.userInput.entity;
  let salary = parseInt(store.state.userInformation.userInput.salary);
  let profitAfterExpenses = parseInt(
    store.state.userInformation.taxSummary.profitAfterExpenses
  );
  let employeeCount = store.state.userInformation.userInput.employeeCount;
  let seTaxDeducted = 0.925; //92.5% to deduct half of SE tax
  let netBizEarnings =
    Math.round(profitAfterExpenses * seTaxDeducted * 100) / 100;
  let incorporatedEarnings = Math.round((netBizEarnings + salary) * 100) / 100;

  if (salary > 0) {
    // individual401K slider's max
    slider.personalMax_individual401k = roundOff(
      Math.min(19500, incorporatedEarnings)
    );
    slider.businessMax_individual401k = roundOff(
      Math.min(37500, Math.round(0.25 * salary))
    );
    // sep-Ira slider's max
    slider.businessMax_sepIra = roundOff(
      Math.min(57000, Math.round(0.25 * salary))
    );
    // simpleIra slider's max
    slider.personalMax_simpleIra = roundOff(
      Math.min(13500, incorporatedEarnings)
    );
    slider.businessMax_simpleIra = roundOff(Math.round(0.03 * salary));
    // traditionalIra slider's max
    slider.personalMax_traditionalIra = roundOff(
      Math.min(6000, incorporatedEarnings)
    );
  } else {
    // individual401K slider's max
    slider.personalMax_individual401k = roundOff(
      Math.min(19500, netBizEarnings)
    );
    slider.businessMax_individual401k = roundOff(
      Math.min(37500, Math.round(0.2 * netBizEarnings))
    );
    // sep-Ira slider's max
    slider.businessMax_sepIra = roundOff(
      Math.min(57000, Math.round(0.2 * netBizEarnings))
    );
    // simpleIra slider's max
    slider.personalMax_simpleIra = roundOff(Math.min(13500, netBizEarnings));
    slider.businessMax_simpleIra = roundOff(Math.round(0.03 * netBizEarnings));
    // traditionalIra slider's max
    slider.personalMax_traditionalIra = roundOff(
      Math.min(6000, netBizEarnings)
    );
  }
  return slider;
}

// progressive tax calculations to address the w2 tax that's not being calculated from Track Tax / Abound Tax Api's services
export const progressiveTax = (userInput, minusNumber = 0) => {
  const { tax_filing_status, salary: editedSalary = 0 } = userInput;
  const salary = +editedSalary - minusNumber;
  const percent = value => Number(value) / 100;
  const activeTaxTable = tax_table_2020[tax_filing_status];
  let sum = 0;
  Object.keys(activeTaxTable).forEach(item => {
    if (
      salary > activeTaxTable[item][0] &&
      (salary < activeTaxTable[item][1] ||
        activeTaxTable[item][1] === "Infinity")
    ) {
      if (activeTaxTable[item][0] == 0) {
        sum += Number(activeTaxTable[item][1]) * percent(item);
      } else {
        sum +=
          (salary - Number(activeTaxTable[item][0])) * percent(item) +
          Number(activeTaxTable[item][3]);
      }
    }
  });
  return sum;
};

// Out of pocket money: how much would've been added to your pocket without retirement contribution
// (Income - Tax balance before contribution) - (Income - Tax balance after contribution - contribution)
