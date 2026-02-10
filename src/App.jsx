import { useState } from "react";
import RandomCat from "./features/RandomCat";
import RandomDog from "./features/RandomDog";
import ExchangeRate from "./features/ExchangeRate";
import Joke from "./features/Joke";
import CountryGuess from "./features/CountryGuess";
import LocateIP from "./features/LocateIP";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState(null); 

  return (
    <>
      <div className="title">
        <h1>API Apps</h1>
      </div>

      <div className="container">
        <div className="card1">
          <button onClick={() => setMode("cat")} className="cat">Random Cat Image</button>
          <button onClick={() => setMode("dog")} className="dog">Random Dog Image</button>
          <button onClick={() => setMode("currency")} className="currency">Currency Exchange Rate</button>
          <button onClick={() => setMode("joke")} className="joke">Joke</button>
          <button onClick={() => setMode("country")} className="country">Guess the Country by Name</button>
          <button onClick={() => setMode("ipaddress")} className="ipaddress">Location by IP Address</button>
        </div>

        <div className="card2">
          {mode === "cat" && <RandomCat />}
          {mode === "dog" && <RandomDog />}
          {mode === "currency" && <ExchangeRate />}
          {mode === "joke" && <Joke />}
          {mode === "country" && <CountryGuess />}
          {mode === "ipaddress" && <LocateIP />}
          {!mode && <p>Pick an option to get started.</p>}
        </div>
      </div>
    </>
  );
}