# Currency Converter Application

This is a React-based currency converter application that allows users to convert amounts from one currency to another. It uses real-time exchange rate data and is designed with a clean user interface.

## Deployment

The application is deployed on Firebase and can be accessed at:
[Currency Converter](https://currecnyconvertor.web.app/)

---

## Author

**Abhinav Ranjan**

---

## Features

- Real-time exchange rate fetching using a public API.
- Select currencies and their corresponding country flags.
- Intuitive interface with "From" and "To" fields for currency conversion.
- Displays the conversion result with up to three decimal places.
- Fully responsive design.

---

## Project Structure

```
├── public/
│   └── index.html       # Entry point for the application
├── src/
│   ├── Components/
│   │   └── UIComponent.js   # User interface component for the app
│   ├── utils/
│   │   ├── countrylist.js   # Country and currency mapping
│   │   └── useCurrencyConverter.js # Custom hook for currency conversion
│   ├── app.css          # Styles for the application
│   └── App.js           # Main entry file for React
├── package.json         # Project metadata and dependencies
└── .parcelrc            # Parcel configuration
```

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd currencyconverter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:1234` to view the app.

---

## Usage

1. Enter the amount to convert in the input field.
2. Select the "From" and "To" currencies using the dropdown menus.
3. Click the "Get The Exchange Rate" button to calculate the conversion.
4. The result will be displayed below the button.

---

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **FontAwesome**: For icons used in the UI.
- **Parcel**: Bundler for React application.
- **Firebase**: Deployment platform.
- **FlagsAPI**: For fetching country flags dynamically.

---

## Dependencies

- `@fortawesome/fontawesome-svg-core`
- `@fortawesome/free-solid-svg-icons`
- `@fortawesome/react-fontawesome`
- `react`
- `react-dom`
- `parcel`

---

## API Integration

The app fetches exchange rate data from the following API:

```
https://latest.currency-api.pages.dev/v1/currencies/{fromCurrency}.json
```

The rates are dynamically updated based on the selected currencies.

---

## Deployment on Firebase

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

---

## License

This project is licensed under the ISC License.
