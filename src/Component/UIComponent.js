import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import countryList from "../utils/contrylist";

const UIComponent = ({
  amountVal,
  result,
  fromvar,
  tovar,
  handleAmountChange,
  handleChangeFrom,
  handleChangeTo,
  calculateExchangeRate,
}) => {
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
        />

        <div id='select-container'>
          <div className='from-container'>
            <p>From</p>
            <select
              name='from'
              onChange={handleChangeFrom}
              value={`${fromvar.currencyCode},${fromvar.countryCode}`}
            >
              {Object.entries(countryList).map(
                ([currencyCode, countryCode]) => (
                  <option
                    key={currencyCode}
                    value={`${currencyCode},${countryCode}`}
                  >
                    {currencyCode}
                  </option>
                )
              )}
            </select>
            <img
              src={`https://flagsapi.com/${fromvar.countryCode}/shiny/64.png`}
              alt='From Country Flag'
            />
          </div>
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ color: "#c0c59b", fontSize: "50px" }}
          />
          <div className='from-container'>
            <p>To</p>
            <select
              name='to'
              onChange={handleChangeTo}
              value={`${tovar.currencyCode},${tovar.countryCode}`}
            >
              {Object.entries(countryList).map(
                ([currencyCode, countryCode]) => (
                  <option
                    key={currencyCode}
                    value={`${currencyCode},${countryCode}`}
                  >
                    {currencyCode}
                  </option>
                )
              )}
            </select>
            <img
              src={`https://flagsapi.com/${tovar.countryCode}/shiny/64.png`}
              alt='To Country Flag'
            />
          </div>
        </div>
        <button id='bttn' onClick={calculateExchangeRate}>
          Get The Exchange Rate
        </button>
        <div id='result'>
          <p>
            {result} {tovar.currencyCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UIComponent;
