// useCurrencyConverter.js - Custom Hook
import { useState, useEffect, useCallback, useMemo } from "react";

const useCurrencyConverter = (initialFrom, initialTo) => {
  const [amountVal, setAmountVal] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState("0");
  const [fromvar, setFromvar] = useState(initialFrom);
  const [tovar, setTovar] = useState(initialTo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce API calls to avoid excessive requests
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchApi = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://latest.currency-api.pages.dev/v1/currencies/${fromvar.currencyCode.toLowerCase()}.json`,
          { signal: abortController.signal }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        const fetchedRate =
          json?.[fromvar.currencyCode.toLowerCase()]?.[
            tovar.currencyCode.toLowerCase()
          ];
        
        if (fetchedRate !== undefined) {
          setRate(fetchedRate);
        } else {
          throw new Error('Exchange rate not found');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error('Currency API error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls by 300ms
    const timeoutId = setTimeout(fetchApi, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [fromvar.currencyCode, tovar.currencyCode]);

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    // Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setAmountVal(value);
    }
  }, []);

  const handleChangeFrom = useCallback((e) => {
    const [currencyCode, countryCode] = e.target.value.split(",");
    setFromvar({ currencyCode, countryCode });
  }, []);

  const handleChangeTo = useCallback((e) => {
    const [currencyCode, countryCode] = e.target.value.split(",");
    setTovar({ currencyCode, countryCode });
  }, []);

  const calculateExchangeRate = useCallback(() => {
    if (rate && amountVal) {
      const calculatedResult = parseFloat(amountVal * rate).toFixed(3);
      setResult(calculatedResult);
    }
  }, [amountVal, rate]);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    amountVal,
    result,
    fromvar,
    tovar,
    loading,
    error,
    handleAmountChange,
    handleChangeFrom,
    handleChangeTo,
    calculateExchangeRate,
  }), [
    amountVal,
    result,
    fromvar,
    tovar,
    loading,
    error,
    handleAmountChange,
    handleChangeFrom,
    handleChangeTo,
    calculateExchangeRate,
  ]);
};

export default useCurrencyConverter;
