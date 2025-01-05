import React from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import countryList from "./contrylist";
const AppLayout = () => {
  const [result, setResult] = useState("0");
  const [amountVal, setAmountVal] = useState("");
  const [rate, setRate] = useState("");
  const [fromvar, setFromvar] = useState({
    currencyCode: "INR",
    countryCode: "IN",
  });
  const [tovar, setToVar] = useState({
    currencyCode: "USD",
    countryCode: "US",
  });

  const handleChangeFrom = (e) => {
    const [currencyCode, countryCode] = e.target.value.split(",");
    setFromvar({ currencyCode, countryCode });
    console.log("hanle on change");
    console.log(fromvar);
  };
  const handleChangeTo = (e) => {
    console.log("to to change called ");
    const [currencyCode, countryCode] = e.target.value.split(",");
    setToVar({ currencyCode, countryCode });
    console.log(tovar);
  };

  const inputAmtUpdate = (e) => {
    setAmountVal(e.target.value);
  };
  useEffect(() => {
    console.log("useeffect called");
    fetchApi();
  }, [fromvar, tovar]);
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
  const exchangeRate = async () => {
    setResult(parseFloat(amountVal * rate).toFixed(3));
  };
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
          onChange={inputAmtUpdate}
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
            />
          </div>
        </div>
        <button id='bttn' onClick={exchangeRate}>
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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
