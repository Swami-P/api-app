import { useMemo, useState } from "react";
import currencies from "../data/currencies";

export default function ExchangeRate() {
  const [base, setBase] = useState("");
  const [target, setTarget] = useState("");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const canFetch = !!base && !!target && base !== target;

  const format = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "decimal",
        maximumFractionDigits: 6,
      }),
    []
  );

  const API_KEY = import.meta.env.VITE_ABSTRACT_API_KEY;

  const fetchRate = async () => {
    if (!canFetch) return;

    if (!API_KEY) {
      setErr("Missing API key. Set VITE_ABSTRACT_API_KEY in your .env file.");
      return;
    }

    try {
      setErr("");
      setLoading(true);

      const url = `https://exchange-rates.abstractapi.com/v1/live/?api_key=${API_KEY}&base=${base}&target=${target}`;
      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}${text ? `: ${text}` : ""}`);
      }

      const data = await res.json();

      // Defensive read — AbstractAPI returns { exchange_rates: { [code]: number }, ... }
      const value = data?.exchange_rates?.[target];
      if (!Number.isFinite(value)) {
        throw new Error("Missing rate in response");
      }

      setRate(value);
    } catch (e) {
      setRate(null);
      setErr("Failed to fetch exchange rate. Try again.");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="currency-card" aria-busy={loading}>
      <h3>Exchange Rate</h3>

      <div className="row">
        <label>
          <select value={base} onChange={(e) => setBase(e.target.value)}>
            <option value="">Select Base Currency</option>
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">Select Target Currency</option>
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </label>

        <button onClick={fetchRate} disabled={!canFetch || loading}>
          {loading ? "Loading..." : "Get Rate"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRate(null);
            setBase(target);
            setTarget(base);
          }}
          disabled={!base || !target || loading}
        >
          Swap
        </button>
      </div>

      {err && (
        <p role="alert" className="error">
          {err}
        </p>
      )}

      {rate != null && (
        <p className="rate">
          1 {base} = {format.format(rate)} {target}
        </p>
      )}

      {!rate && !err && !loading && (
        <p>Choose base &amp; target, then click “Get Rate”.</p>
      )}
    </div>
  );
}