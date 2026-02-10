import "./App.css";
import { useState } from "react";

const currencies = [
  { code: "ARS", name: "Argentine Peso" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "BCH", name: "Bitcoin Cash" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BNB", name: "Binance Coin" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "BTC", name: "Bitcoin" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CYP", name: "Cypriot Pound" },
  { code: "CZK", name: "Czech Republic Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "DOGE", name: "Dogecoin" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "EEK", name: "Estonian Kroon" },
  { code: "ETH", name: "Ethereum" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "GRD", name: "Greek Drachma" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli New Sheqel" },
  { code: "INR", name: "Indian Rupee" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KRW", name: "South Korean Won" },
  { code: "LTC", name: "Litecoin" },
  { code: "LTL", name: "Lithuanian Litas" },
  { code: "LVL", name: "Latvian Lats" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "MTL", name: "Maltese Lira" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "SIT", name: "Slovenian Tolar" },
  { code: "SKK", name: "Slovak Koruna" },
  { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "USD", name: "United States Dollar" },
  { code: "XRP", name: "Ripple" },
  { code: "ZAR", name: "South African Rand" },
];

// Keeping this for possible future use (e.g. mapping ISO → full country name)
const countries = [
  { iso: "ZW", name: "Zimbabwe" },
  { iso: "ZM", name: "Zambia" },
  { iso: "ZA", name: "South Africa" },
  { iso: "YT", name: "Mayotte" },
  { iso: "YE", name: "Yemen" },
  { iso: "XK", name: "Kosovo" },
  { iso: "WS", name: "Samoa" },
  { iso: "WF", name: "Wallis &amp; Futuna" },
  { iso: "VU", name: "Vanuatu" },
  { iso: "VN", name: "Vietnam" },
  { iso: "VI", name: "U.S. Virgin Islands" },
  { iso: "VG", name: "British Virgin Islands" },
  { iso: "VE", name: "Venezuela" },
  { iso: "VC", name: "St. Vincent &amp; Grenadines" },
  { iso: "VA", name: "Vatican City" },
  { iso: "UZ", name: "Uzbekistan" },
  { iso: "UY", name: "Uruguay" },
  { iso: "US", name: "United States" },
  { iso: "UM", name: "U.S. Outlying Islands" },
  { iso: "UG", name: "Uganda" },
  { iso: "UA", name: "Ukraine" },
  { iso: "TZ", name: "Tanzania" },
  { iso: "TW", name: "Taiwan" },
  { iso: "TV", name: "Tuvalu" },
  { iso: "TT", name: "Trinidad &amp; Tobago" },
  { iso: "TR", name: "Türkiye" },
  { iso: "TO", name: "Tonga" },
  { iso: "TN", name: "Tunisia" },
  { iso: "TM", name: "Turkmenistan" },
  { iso: "TL", name: "Timor-Leste" },
  { iso: "TK", name: "Tokelau" },
  { iso: "TJ", name: "Tajikistan" },
  { iso: "TH", name: "Thailand" },
  { iso: "TG", name: "Togo" },
  { iso: "TF", name: "French Southern Territories" },
  { iso: "TD", name: "Chad" },
  { iso: "TC", name: "Turks &amp; Caicos Islands" },
  { iso: "SZ", name: "Eswatini" },
  { iso: "SY", name: "Syria" },
  { iso: "SX", name: "Sint Maarten" },
  { iso: "SV", name: "El Salvador" },
  { iso: "ST", name: "São Tomé &amp; Príncipe" },
  { iso: "SS", name: "South Sudan" },
  { iso: "SR", name: "Suriname" },
  { iso: "SO", name: "Somalia" },
  { iso: "SN", name: "Senegal" },
  { iso: "SM", name: "San Marino" },
  { iso: "SL", name: "Sierra Leone" },
  { iso: "SK", name: "Slovakia" },
  { iso: "SJ", name: "Svalbard &amp; Jan Mayen" },
  { iso: "SI", name: "Slovenia" },
  { iso: "SH", name: "St. Helena" },
  { iso: "SG", name: "Singapore" },
  { iso: "SE", name: "Sweden" },
  { iso: "SD", name: "Sudan" },
  { iso: "SC", name: "Seychelles" },
  { iso: "SB", name: "Solomon Islands" },
  { iso: "SA", name: "Saudi Arabia" },
  { iso: "RW", name: "Rwanda" },
  { iso: "RU", name: "Russia" },
  { iso: "RS", name: "Serbia" },
  { iso: "RO", name: "Romania" },
  { iso: "RE", name: "Réunion" },
  { iso: "QA", name: "Qatar" },
  { iso: "PY", name: "Paraguay" },
  { iso: "PW", name: "Palau" },
  { iso: "PT", name: "Portugal" },
  { iso: "PS", name: "Palestinian Territories" },
  { iso: "PR", name: "Puerto Rico" },
  { iso: "PN", name: "Pitcairn Islands" },
  { iso: "PM", name: "St. Pierre &amp; Miquelon" },
  { iso: "PL", name: "Poland" },
  { iso: "PK", name: "Pakistan" },
  { iso: "PH", name: "Philippines" },
  { iso: "PG", name: "Papua New Guinea" },
  { iso: "PF", name: "French Polynesia" },
  { iso: "PE", name: "Peru" },
  { iso: "PA", name: "Panama" },
  { iso: "OM", name: "Oman" },
  { iso: "NZ", name: "New Zealand" },
  { iso: "NU", name: "Niue" },
  { iso: "NR", name: "Nauru" },
  { iso: "NP", name: "Nepal" },
  { iso: "NO", name: "Norway" },
  { iso: "NL", name: "Netherlands" },
  { iso: "NI", name: "Nicaragua" },
  { iso: "NG", name: "Nigeria" },
  { iso: "NF", name: "Norfolk Island" },
  { iso: "NE", name: "Niger" },
  { iso: "NC", name: "New Caledonia" },
  { iso: "NA", name: "Namibia" },
  { iso: "MZ", name: "Mozambique" },
  { iso: "MY", name: "Malaysia" },
  { iso: "MX", name: "Mexico" },
  { iso: "MW", name: "Malawi" },
  { iso: "MV", name: "Maldives" },
  { iso: "MU", name: "Mauritius" },
  { iso: "MT", name: "Malta" },
  { iso: "MS", name: "Montserrat" },
  { iso: "MR", name: "Mauritania" },
  { iso: "MQ", name: "Martinique" },
  { iso: "MP", name: "Northern Mariana Islands" },
  { iso: "MO", name: "Macao SAR China" },
  { iso: "MN", name: "Mongolia" },
  { iso: "MM", name: "Myanmar (Burma)" },
  { iso: "ML", name: "Mali" },
  { iso: "MK", name: "North Macedonia" },
  { iso: "MH", name: "Marshall Islands" },
  { iso: "MG", name: "Madagascar" },
  { iso: "MF", name: "St. Martin" },
  { iso: "ME", name: "Montenegro" },
  { iso: "MD", name: "Moldova" },
  { iso: "MC", name: "Monaco" },
  { iso: "MA", name: "Morocco" },
  { iso: "LY", name: "Libya" },
  { iso: "LV", name: "Latvia" },
  { iso: "LU", name: "Luxembourg" },
  { iso: "LT", name: "Lithuania" },
  { iso: "LS", name: "Lesotho" },
  { iso: "LR", name: "Liberia" },
  { iso: "LK", name: "Sri Lanka" },
  { iso: "LI", name: "Liechtenstein" },
  { iso: "LC", name: "St. Lucia" },
  { iso: "LB", name: "Lebanon" },
  { iso: "LA", name: "Laos" },
  { iso: "KZ", name: "Kazakhstan" },
  { iso: "KY", name: "Cayman Islands" },
  { iso: "KW", name: "Kuwait" },
  { iso: "KR", name: "South Korea" },
  { iso: "KP", name: "North Korea" },
  { iso: "KN", name: "St. Kitts &amp; Nevis" },
  { iso: "KM", name: "Comoros" },
  { iso: "KI", name: "Kiribati" },
  { iso: "KH", name: "Cambodia" },
  { iso: "KG", name: "Kyrgyzstan" },
  { iso: "KE", name: "Kenya" },
  { iso: "JP", name: "Japan" },
  { iso: "JO", name: "Jordan" },
  { iso: "JM", name: "Jamaica" },
  { iso: "JE", name: "Jersey" },
  { iso: "IT", name: "Italy" },
  { iso: "IS", name: "Iceland" },
  { iso: "IR", name: "Iran" },
  { iso: "IQ", name: "Iraq" },
  { iso: "IO", name: "British Indian Ocean Territory" },
  { iso: "IN", name: "India" },
  { iso: "IM", name: "Isle of Man" },
  { iso: "IL", name: "Israel" },
  { iso: "IE", name: "Ireland" },
  { iso: "ID", name: "Indonesia" },
  { iso: "IC", name: "Canary Islands" },
  { iso: "HU", name: "Hungary" },
  { iso: "HT", name: "Haiti" },
  { iso: "HR", name: "Croatia" },
  { iso: "HN", name: "Honduras" },
  { iso: "HM", name: "Heard &amp; McDonald Islands" },
  { iso: "HK", name: "Hong Kong SAR China" },
  { iso: "GY", name: "Guyana" },
  { iso: "GW", name: "Guinea-Bissau" },
  { iso: "GU", name: "Guam" },
  { iso: "GT", name: "Guatemala" },
  { iso: "GS", name: "South Georgia &amp; South Sandwich Islands" },
  { iso: "GR", name: "Greece" },
  { iso: "GQ", name: "Equatorial Guinea" },
  { iso: "GP", name: "Guadeloupe" },
  { iso: "GN", name: "Guinea" },
  { iso: "GM", name: "Gambia" },
  { iso: "GL", name: "Greenland" },
  { iso: "GI", name: "Gibraltar" },
  { iso: "GH", name: "Ghana" },
  { iso: "GG", name: "Guernsey" },
  { iso: "GF", name: "French Guiana" },
  { iso: "GE", name: "Georgia" },
  { iso: "GD", name: "Grenada" },
  { iso: "GB", name: "United Kingdom" },
  { iso: "GA", name: "Gabon" },
  { iso: "FR", name: "France" },
  { iso: "FO", name: "Faroe Islands" },
  { iso: "FM", name: "Micronesia" },
  { iso: "FK", name: "Falkland Islands" },
  { iso: "FJ", name: "Fiji" },
  { iso: "FI", name: "Finland" },
  { iso: "ET", name: "Ethiopia" },
  { iso: "ES", name: "Spain" },
  { iso: "ER", name: "Eritrea" },
  { iso: "EH", name: "Western Sahara" },
  { iso: "EG", name: "Egypt" },
  { iso: "EE", name: "Estonia" },
  { iso: "EC", name: "Ecuador" },
  { iso: "EA", name: "Ceuta &amp; Melilla" },
  { iso: "DZ", name: "Algeria" },
  { iso: "DO", name: "Dominican Republic" },
  { iso: "DM", name: "Dominica" },
  { iso: "DK", name: "Denmark" },
  { iso: "DJ", name: "Djibouti" },
  { iso: "DE", name: "Germany" },
  { iso: "CZ", name: "Czechia" },
  { iso: "CY", name: "Cyprus" },
  { iso: "CX", name: "Christmas Island" },
  { iso: "CW", name: "Curaçao" },
  { iso: "CV", name: "Cape Verde" },
  { iso: "CU", name: "Cuba" },
  { iso: "CR", name: "Costa Rica" },
  { iso: "CQ", name: "Sark" },
  { iso: "CO", name: "Colombia" },
  { iso: "CN", name: "China" },
  { iso: "CM", name: "Cameroon" },
  { iso: "CL", name: "Chile" },
  { iso: "CK", name: "Cook Islands" },
  { iso: "CI", name: "Côte d’Ivoire" },
  { iso: "CH", name: "Switzerland" },
  { iso: "CG", name: "Congo - Brazzaville" },
  { iso: "CF", name: "Central African Republic" },
  { iso: "CD", name: "Congo - Kinshasa" },
  { iso: "CC", name: "Cocos (Keeling) Islands" },
  { iso: "CA", name: "Canada" },
  { iso: "BZ", name: "Belize" },
  { iso: "BY", name: "Belarus" },
  { iso: "BW", name: "Botswana" },
  { iso: "BV", name: "Bouvet Island" },
  { iso: "BT", name: "Bhutan" },
  { iso: "BS", name: "Bahamas" },
  { iso: "BR", name: "Brazil" },
  { iso: "BQ", name: "Caribbean Netherlands" },
  { iso: "BO", name: "Bolivia" },
  { iso: "BN", name: "Brunei" },
  { iso: "BM", name: "Bermuda" },
  { iso: "BL", name: "St. Barthélemy" },
  { iso: "BJ", name: "Benin" },
  { iso: "BI", name: "Burundi" },
  { iso: "BH", name: "Bahrain" },
  { iso: "BG", name: "Bulgaria" },
  { iso: "BF", name: "Burkina Faso" },
  { iso: "BE", name: "Belgium" },
  { iso: "BD", name: "Bangladesh" },
  { iso: "BB", name: "Barbados" },
  { iso: "BA", name: "Bosnia &amp; Herzegovina" },
  { iso: "AZ", name: "Azerbaijan" },
  { iso: "AX", name: "Åland Islands" },
  { iso: "AW", name: "Aruba" },
  { iso: "AU", name: "Australia" },
  { iso: "AT", name: "Austria" },
  { iso: "AS", name: "American Samoa" },
  { iso: "AR", name: "Argentina" },
  { iso: "AO", name: "Angola" },
  { iso: "AM", name: "Armenia" },
  { iso: "AL", name: "Albania" },
  { iso: "AI", name: "Anguilla" },
  { iso: "AG", name: "Antigua &amp; Barbuda" },
  { iso: "AF", name: "Afghanistan" },
  { iso: "AE", name: "United Arab Emirates" },
  { iso: "AD", name: "Andorra" },
];

function App() {
  const [loading, setLoading] = useState(false);

  const [catImage, setCatImage] = useState(null);
  const [dogImage, setDogImage] = useState("");

  const [base, setBase] = useState("");
  const [target, setTarget] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [showCurrency, setShowCurrency] = useState(false);

  const [joke, setJoke] = useState({ setup: "", punchline: "" });

  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  const API_KEY = "41e73974aced4481bc2fcd8141f736e6";

  const randomCatImage = async () => {
    try {
      setDogImage("");
      setShowCurrency(false);
      setJoke({ setup: "", punchline: "" });
      setShowNameInput(false);
      setLoading(true);

      const response = await fetch("https://cataas.com/cat");
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setCatImage(imageUrl);
    } catch (error) {
      console.error("Error fetching cat image", error);
    } finally {
      setLoading(false);
    }
  };

  const randomDogImage = async () => {
    try {
      setCatImage("");
      setShowCurrency(false);
      setJoke({ setup: "", punchline: "" });
      setShowNameInput(false);
      setLoading(true);

      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image", error);
    } finally {
      setLoading(false);
    }
  };

  const randomJoke = async () => {
    try {
      setCatImage("");
      setShowCurrency(false);
      setDogImage("");
      setJoke({ setup: "", punchline: "" });
      setShowNameInput(false);
      setLoading(true);

      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();

      setJoke({ setup: data.setup, punchline: "" });

      setTimeout(() => {
        setJoke({ setup: data.setup, punchline: data.punchline });
      }, 1500);
    } catch (error) {
      console.error("Error fetching joke", error);
    } finally {
      setLoading(false);
    }
  };

  const currencyExchangeRate = () => {
    setCatImage("");
    setDogImage("");
    setJoke({ setup: "", punchline: "" });
    setShowNameInput(false);
    setShowCurrency(true);
    setBase("");
    setTarget("");
    setExchangeRate(null);
  };

  const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://exchange-rates.abstractapi.com/v1/live/?api_key=${API_KEY}&base=${baseCurrency}&target=${targetCurrency}`
      );
      const data = await response.json();

      setExchangeRate(data.exchange_rates[targetCurrency]);
    } catch (error) {
      console.error("Error fetching exchange rate", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBaseChange = (e) => {
    const value = e.target.value;
    setBase(value);

    if (value && target) {
      fetchExchangeRate(value, target);
    }
  };

  const handleTargetChange = (e) => {
    const value = e.target.value;
    setTarget(value);

    if (base && value) {
      fetchExchangeRate(base, value);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const resetUI = () => {
    setCatImage("");
    setDogImage("");
    setShowCurrency(false);
    setJoke({ setup: "", punchline: "" });
    setCountry("");
  };

  const guessCountry = async () => {
    try {
      setCatImage("");
      setShowCurrency(false);
      setDogImage("");
      setJoke({ setup: "", punchline: "" });
      setLoading(true);

      if (!name.trim()) {
        console.warn("Name is empty, cannot guess country.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.nationalize.io/?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (data.country && data.country.length > 0) {
        setCountry(data.country[0].country_id);
      } else {
        setCountry("");
        console.warn("No country prediction found for this name.");
      }
    } catch (error) {
      console.error("Error guessing country", error);
    } finally {
      setLoading(false);
    }
  };

  // Optional: map ISO code to full country name if available
  const guessedCountryObj = countries.find((c) => c.iso === country);
  const guessedCountryName = guessedCountryObj
    ? guessedCountryObj.name
    : country;

  return (
    <>
      <div className="title">
        <h1>API Apps</h1>
      </div>

      <div className="container">
        <div className="card1">
          <button onClick={randomCatImage} className="cat">
            Random Cat Image
          </button>
          <button onClick={randomDogImage}>Random Dog Image</button>
          <button onClick={currencyExchangeRate} className="currency">
            Currency Exchange Rate
          </button>
          <button onClick={randomJoke} className="joke">
            Joke
          </button>
          <button
            onClick={() => {
              resetUI();
              setShowNameInput(true);
              setCountry("");
              setName("");
            }}
            className="country">
            Guess the Country
          </button>
        </div>

        <div className="card2">
          {catImage && <img src={catImage} alt="Cat" />}

          {dogImage && <img src={dogImage} alt="Dog" />}

          {showCurrency && (
            <div className="currency-card">
              <h3>Exchange Rate</h3>

              <select value={base} onChange={handleBaseChange}>
                <option value="">Select Base Currency</option>
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>

              <select value={target} onChange={handleTargetChange}>
                <option value="">Select Target Currency</option>
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>

              {exchangeRate && (
                <p className="rate">
                  1 {base} = {exchangeRate} {target}
                </p>
              )}
            </div>
          )}

          {joke.setup && (
            <div className="joke-box">
              <p className="joke-setup">{joke.setup}</p>
              {joke.punchline && (
                <p className="joke-punchline">{joke.punchline}</p>
              )}
            </div>
          )}

          {showNameInput && (
            <div className="currency-card">
              <h3>Enter a Name</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  guessCountry();     // prediction runs here only
                }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
                <button className="submitWidth" type="submit">Submit</button>
              </form>

              {country && (
                <p className="rate">
                  Predicted country: {guessedCountryName} ({country})
                </p>
              )}
            </div>
          )}

          {loading && <p>Loading...</p>}
        </div>
      </div>
    </>
  );
}

export default App;