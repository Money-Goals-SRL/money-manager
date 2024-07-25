export type CashFlow = {
	date: Date;
	value: number;
};

export type CompoundInterestData = {
	capital: number;
	rate: number;
	frequency: string;
	years: number;
	months: number;
	days: number;
};

export type CompoundInterestResult = {
	initial: number;
	rate: number;
	frequency: string;
	years: number;
	months: number;
	days: number;
	final: number;
	interest: number;
};

export type MortgageData = {
	principal: number;
	rate: number;
	frequency: string;
	years: number;
	repaidPrincipal: number;
};

export type MortgageResult = {
	payment: number;
	principal: number;
	totalAmount: number;
	totalInterest: number;
	interestPercentage: number;
	cagr: number;
	paymentsArr: number[];
	interestArr: number[];
	totalInterestArr: number[];
	principalArr: number[];
	principalArrAux: number[];
	outstandingDebtArr: number[];
	frequency: string;
};

export type RentalData = {
	buyPrice: number;
	tax: number;
	agency: number;
	otherCosts: number;
	downPayment: number;
	rate: number;
	frequency: string;
	years: number;
	incomeTax: number;
	grossIncome: number;
	propertyTax: number;
	appreciation: number;
};

export type RentalResult = {
	totalInitialCost: number;
	realEstateValue: number;
	inFlow: number;
	outFlow: number;
	netCashflow: number;
	homeValueArr: number[];
	equityArr: number[];
	currentYieldArr: number[];
	paymentsArr: number[];
	interestArr: number[];
	principalArr: number[];
	outstandingDebtArr: number[];
	totalAmount: number;
	payment: number;
	totalInterest: number;
	interestPercentage: number;
	principal: number;
	cagr: number;
	frequency: string;
};

export type SalaryData = {
	grossYearlyIncome: number;
	paymentsPerYear: number;
	regionalTax: number;
	comunalTax: number;
};

export type SalaryResults = {
	grossYearlyIncome: number;
	pension: number;
	taxes: number;
	netYearlyIncome: number;
	grossMonthlyIncome: number;
	netMonthlyIncome: number;
	deduction: number;
	totalNetYearlyIncome: number;
	netMargin: number;
};
