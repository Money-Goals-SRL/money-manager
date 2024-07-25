export type Echelon = {
	constant?: number;
	minVal: number;
	maxVal: number;
	percentage: number;
};

export type RegionalTax = {
	region: string;
	code: string;
	echelons: Echelon[];
};

export const irpefEchelons: Echelon[] = [
	{
		minVal: 0,
		maxVal: 28000,
		percentage: 23,
	},
	{
		minVal: 28000,
		maxVal: 50000,
		percentage: 35,
	},
	{
		minVal: 50000,
		maxVal: Number.MAX_SAFE_INTEGER,
		percentage: 43,
	},
];

export const deductionEchelons: Echelon[] = [
	{
        constant: 1955,
		minVal: 0,
		maxVal: 15000,
		percentage: 23,
	},
	{
        constant: 1910,
		minVal: 15000,
		maxVal: 28000,
		percentage: 35,
	},	{
		minVal: 28000,
		maxVal: 50000,
		percentage: 35,
	},
	{
		minVal: 50000,
		maxVal: Number.MAX_SAFE_INTEGER,
		percentage: 0,
	},
];

export const comunalEchelons: Echelon[] = [
	{
		minVal: 0,
		maxVal: Number.MAX_SAFE_INTEGER,
		percentage: 0.8,
	},
];

export const regionData: RegionalTax[] = [
	{
		region: "Abruzzo",
		code: "01",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Basilicata",
		code: "02",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.23,
			},
		],
	},
	{
		region: "Bolzano",
		code: "03",
		echelons: [
			{
				minVal: 0,
				maxVal: 50000,
				percentage: 1.23,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Calabria",
		code: "04",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Campania",
		code: "05",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.73,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 2.96,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 3.2,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 3.33,
			},
		],
	},
	{
		region: "Emilia-Romagna",
		code: "06",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.33,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.93,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 2.03,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 2.27,
			},
		],
	},
	{
		region: "Friuli Venezia Giulia",
		code: "07",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 0.7,
			},
			{
				minVal: 15000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.23,
			},
		],
	},
	{
		region: "Lazio",
		code: "08",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.73,
			},
			{
				minVal: 15000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 3.33,
			},
		],
	},
	{
		region: "Liguria",
		code: "09",
		echelons: [
			{
				minVal: 0,
				maxVal: 28000,
				percentage: 1.23,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 3.18,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 3.23,
			},
		],
	},
	{
		region: "Lombardia",
		code: "10",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.23,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.58,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 1.72,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Marche",
		code: "11",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.23,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.53,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 1.7,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Molise",
		code: "12",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.73,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.93,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 3.33,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 3.33,
			},
		],
	},
	{
		region: "Piemonte",
		code: "13",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.62,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 2.13,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 2.75,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 3.33,
			},
		],
	},
	{
		region: "Puglia",
		code: "14",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.33,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.43,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 1.63,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.85,
			},
		],
	},
	{
		region: "Sardegna",
		code: "15",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.23,
			},
		],
	},
	{
		region: "Sicilia",
		code: "16",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Toscana",
		code: "17",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.42,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.43,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 3.32,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 3.33,
			},
		],
	},
	{
		region: "Trento",
		code: "18",
		echelons: [
			{
				minVal: 0,
				maxVal: 50000,
				percentage: 1.23,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.73,
			},
		],
	},
	{
		region: "Umbria",
		code: "19",
		echelons: [
			{
				minVal: 0,
				maxVal: 15000,
				percentage: 1.23,
			},
			{
				minVal: 15000,
				maxVal: 28000,
				percentage: 1.62,
			},
			{
				minVal: 28000,
				maxVal: 50000,
				percentage: 1.67,
			},
			{
				minVal: 50000,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.83,
			},
		],
	},
	{
		region: "Valle d'Aosta",
		code: "20",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.23,
			},
		],
	},
	{
		region: "Veneto",
		code: "21",
		echelons: [
			{
				minVal: 0,
				maxVal: Number.MAX_SAFE_INTEGER,
				percentage: 1.23,
			},
		],
	},
];

export default regionData;
