// Source: NerdWallet https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets

export const tax_table_2020 = {
  single_deduction: 12400,
  married_deduction: 24800,
  marriedFilingSeparately_deduction: 12400,
  headOfHousehold_deduction: 18650,
  // federalTaxRate: [lowestAmount, highestAmount, rate (in decimal), taxDue]
  single: {
    "10": [0, 9875, 0.1, 0],
    "12": [9876, 40125, 0.12, 987.5],
    "22": [40126, 85525, 0.22, 4617.5],
    "24": [85526, 163300, 0.24, 14605.5],
    "32": [163301, 207350, 0.32, 33271.5],
    "35": [207351, 518400, 0.35, 47367.5],
    "37": [518401, "Infinity", 0.37, 156235]
  },
  headOfHousehold: {
    "10": [0, 14100, 0.1, 0],
    "12": [14101, 53700, 0.12, 1410],
    "22": [53701, 85500, 0.22, 6612],
    "24": [85501, 163300, 0.24, 13158],
    "32": [163301, 207350, 0.32, 31830],
    "35": [207351, 518400, 0.35, 45926],
    "37": [518401, "Infinity", 0.37, 154793.5]
  },
  married: {
    "10": [0, 19750, 0.1, 0],
    "12": [19751, 80250, 0.12, 1975],
    "22": [80251, 171050, 0.22, 9235],
    "24": [171051, 326600, 0.24, 29211],
    "32": [326601, 414700, 0.32, 66543],
    "35": [414701, 622050, 0.35, 94732],
    "37": [622051, "Infinity", 0.37, 167307.5]
  },
  marriedFilingSeparately: {
    "10": [0, 9875, 0.1, 0],
    "12": [9876, 40125, 0.12, 987.5],
    "22": [40126, 85525, 0.22, 4617.5],
    "24": [85526, 163300, 0.24, 14605.5],
    "32": [163301, 207350, 0.32, 33271.5],
    "35": [207351, 311025, 0.35, 47367.5],
    "37": [311026, "Infinity", 0.37, 83653.75]
  }
};

export const tax_table_2021 = {
  single_deduction: 12400,
  married_deduction: 24800,
  marriedFilingSeparately_deduction: 12400,
  headOfHousehold_deduction: 18650,
  // federalTaxRate: [lowestAmount, highestAmount, rate (in decimal), taxDue]
  single_tax_bracket: {
    "10": [0, 9950, 0.1, 0],
    "12": [9951, 40525, 0.12, 995],
    "22": [40526, 86375, 0.22, 4664],
    "24": [86376, 164925, 0.24, 14751],
    "32": [164926, 209425, 0.32, 33603],
    "35": [209426, 523600, 0.35, 47843],
    "37": [523601, Infinity, 0.37, 157804.25]
  },
  head_of_household_tax_bracket: {
    "10": [0, 14200, 0.1, 0],
    "12": [14201, 54200, 0.12, 1420],
    "22": [54201, 86350, 0.22, 6220],
    "24": [86351, 164900, 0.24, 13293],
    "32": [164901, 209400, 0.32, 32145],
    "35": [209401, 523600, 0.35, 46385],
    "37": [523601, Infinity, 0.37, 156355]
  },
  married_tax_bracket: {
    "10": [0, 19900, 0.1, 0],
    "12": [19901, 81050, 0.12, 1990],
    "22": [81051, 172750, 0.22, 9328],
    "24": [172751, 329850, 0.24, 29502],
    "32": [329851, 418850, 0.32, 67206],
    "35": [418851, 628300, 0.35, 95686],
    "37": [628301, Infinity, 0.37, 168993.5]
  },
  married_filing_separately_tax_bracket: {
    "10": [0, 9950, 0.1, 0],
    "12": [9951, 40525, 0.12, 995],
    "22": [40526, 86375, 0.22, 4664],
    "24": [86376, 164925, 0.24, 14751],
    "32": [164926, 209425, 0.32, 33603],
    "35": [209426, 314150, 0.35, 47843],
    "37": [314151, Infinity, 0.37, 84496.75]
  }
};

export const progressiveTax = userInput => {
  const { tax_filing_status, salary } = userInput;
  const percent = value => Number(value) / 100;
  const activeTaxTable = tax_table_2020[tax_filing_status];
  let sum = 0;
  Object.keys(activeTaxTable).forEach(item => {
    if (
      Number(salary) > activeTaxTable[item][0] &&
      (Number(salary) < activeTaxTable[item][1] ||
        activeTaxTable[item][1] === "Infinity")
    ) {
      if (activeTaxTable[item][0] == 0) {
        sum += Number(activeTaxTable[item][1]) * percent(item);
      } else {
        sum +=
          (Number(salary) - Number(activeTaxTable[item][0])) * percent(item);
      }
    }
  });
};
