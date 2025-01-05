// useCurrencyConverter.js - Custom Hook
import { useState, useEffect } from "react";

const useCurrencyConverter = (initialFrom, initialTo) => {
  const [amountVal, setAmountVal] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState("0");
  const [fromvar, setFromvar] = useState(initialFrom);
  const [tovar, setTovar] = useState(initialTo);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${fromvar.currencyCode.toLowerCase()}.json`
      );
      const json = await data.json();
      const fetchedRate =
        json?.[fromvar.currencyCode.toLowerCase()]?.[
          tovar.currencyCode.toLowerCase()
        ];
      setRate(fetchedRate);
    };
    fetchApi();
  }, [fromvar, tovar]);

  const handleAmountChange = (e) => setAmountVal(e.target.value);

  const handleChangeFrom = (e) => {
    const [currencyCode, countryCode] = e.target.value.split(",");
    setFromvar({ currencyCode, countryCode });
  };

  const handleChangeTo = (e) => {
    const [currencyCode, countryCode] = e.target.value.split(",");
    setTovar({ currencyCode, countryCode });
  };

  const calculateExchangeRate = () => {
    setResult(parseFloat(amountVal * rate).toFixed(3));
  };

  return {
    amountVal,
    result,
    fromvar,
    tovar,
    handleAmountChange,
    handleChangeFrom,
    handleChangeTo,
    calculateExchangeRate,
  };
};

export default useCurrencyConverter;
