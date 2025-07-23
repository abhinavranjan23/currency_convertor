import React, { memo, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import UIComponent from "./Component/UIComponent";
import useCurrencyConverter from "./utils/useCurrencyConverter";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Currency Converter Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          color: '#d32f2f',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#deb887',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = memo(() => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div>Loading Currency Converter...</div>
  </div>
));

const AppLayout = memo(() => {
  const {
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
  } = useCurrencyConverter(
    { currencyCode: "INR", countryCode: "IN" },
    { currencyCode: "USD", countryCode: "US" }
  );

  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#d32f2f',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2>Currency API Error</h2>
        <p>{error}</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <UIComponent
      amountVal={amountVal}
      result={result}
      fromvar={fromvar}
      tovar={tovar}
      loading={loading}
      handleAmountChange={handleAmountChange}
      handleChangeFrom={handleChangeFrom}
      handleChangeTo={handleChangeTo}
      calculateExchangeRate={calculateExchangeRate}
    />
  );
});

AppLayout.displayName = 'AppLayout';

const App = memo(() => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <AppLayout />
    </Suspense>
  </ErrorBoundary>
));

App.displayName = 'App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
