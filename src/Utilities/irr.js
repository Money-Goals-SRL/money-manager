function IRR(cashflow) {
  // cashflow: array of objects of type {
  //     date: "yyyy-mm-gg",
  //     value: amount
  // }

  var upperbound = 100;
  var lowerbound = -100;
  var tolerance = 0.0001;

  var irr;
  var NPV;

  do {
    const date0 = new Date(cashflow[0].date);
    NPV = 0;
    irr = (upperbound + lowerbound) / 2;
    for (var i = 0; i < cashflow.length; i++) {
      var cf = cashflow[i].value;
      var date = new Date(cashflow[i].date);
      var t = (date - date0) / (1000 * 60 * 60 * 24) / 365;
      NPV += cf / Math.pow(1 + irr, t);
    }
    if (NPV > 0) {
      lowerbound = irr;
    } else if (NPV < 0) {
      upperbound = irr;
    }
  } while (Math.abs(NPV) > tolerance);

  return irr;
}

export default IRR;
