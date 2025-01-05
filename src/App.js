import React from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import UIComponent from "./Component/UIComponent";
import useCurrencyConverter from "./utils/useCurrencyConverter";

const AppLayout = () => {
  const {
    amountVal,
    result,
    fromvar,
    tovar,
    handleAmountChange,
    handleChangeFrom,
    handleChangeTo,
    calculateExchangeRate,
  } = useCurrencyConverter(
    { currencyCode: "INR", countryCode: "IN" },
    { currencyCode: "USD", countryCode: "US" }
  );

  return (
    <UIComponent
      amountVal={amountVal}
      result={result}
      fromvar={fromvar}
      tovar={tovar}
      handleAmountChange={handleAmountChange}
      handleChangeFrom={handleChangeFrom}
      handleChangeTo={handleChangeTo}
      calculateExchangeRate={calculateExchangeRate}
    />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
