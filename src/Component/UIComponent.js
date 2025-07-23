import React, { memo, useMemo } from "react";
import countryList from "../utils/contrylist";

const UIComponent = memo(({
  amountVal,
  result,
  fromvar,
  tovar,
  loading,
  handleAmountChange,
  handleChangeFrom,
  handleChangeTo,
  calculateExchangeRate,
}) => {
  // Memoize country options to prevent recreation on every render
  const countryOptions = useMemo(() => {
    return Object.entries(countryList).map(([currencyCode, countryCode]) => (
      <option
        key={currencyCode}
        value={`${currencyCode},${countryCode}`}
      >
        {currencyCode}
      </option>
    ));
  }, []);

  return (
    <div id='body'>
      <h1>Currency Converter</h1>
      <div className='container'>
        <h3>Enter The Amount:</h3>
        <input
          type='text'
          id='search-input'
          name='searchInput'
          placeholder='Enter the amount'
          value={amountVal}
          onChange={handleAmountChange}
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
        />

        <div id='select-container'>
          <div className='from-container'>
            <p>From</p>
            <select
              name='from'
              onChange={handleChangeFrom}
              value={`${fromvar.currencyCode},${fromvar.countryCode}`}
            >
              {countryOptions}
            </select>
            <img
              src={`https://flagsapi.com/${fromvar.countryCode}/shiny/64.png`}
              alt='From Country Flag'
              loading="lazy"
              width="64"
              height="48"
            />
          </div>
          <div className="arrow-icon">
            →
          </div>
          <div className='from-container'>
            <p>To</p>
            <select
              name='to'
              onChange={handleChangeTo}
              value={`${tovar.currencyCode},${tovar.countryCode}`}
            >
              {countryOptions}
            </select>
            <img
              src={`https://flagsapi.com/${tovar.countryCode}/shiny/64.png`}
              alt='To Country Flag'
              loading="lazy"
              width="64"
              height="48"
            />
          </div>
        </div>
        <button id='bttn' onClick={calculateExchangeRate} disabled={loading}>
          {loading ? 'Loading...' : 'Get The Exchange Rate'}
        </button>
        <div id='result'>
          <p>
            {result} {tovar.currencyCode}
          </p>
        </div>
      </div>
    </div>
  );
});

UIComponent.displayName = 'UIComponent';

export default UIComponent;
