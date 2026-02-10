import { useMemo, useState } from "react";

export default function LocateIP() {
  const [ipaddress, setIpAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!ipaddress.trim()) {
      setErr("Please enter an IP Address.");
      return;
    }
    try {
      setErr("");
      setCity("");
      setCountry("");
      setLoading(true);

      const res = await fetch(`https://ipinfo.io/${ipaddress}/geo`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCity(data.city);
      setCountry(data.country);
    } catch (e) {
      setErr("Location not found. Try again.");
    } finally {
      setLoading(false);
    }
  };


    return (
    <div className="currency-card" aria-busy={loading}>
      <h3>Enter an IP address</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="ipaddress"></label>
        <input
          id="ipaddress"
          type="text"
          value={ipaddress}
          onChange={(e) => setIpAddress(e.target.value)}
          autoComplete="off"
          placeholder="e.g., 165.10.17.39"
        />
        <button className="submitWidth" type="submit" disabled={loading || !ipaddress.trim()}>
          {loading ? "Predicting..." : "Submit"}
        </button>
      </form>
      {err && <p role="alert" className="error">{err}</p>}
      {city && <p className="rate">Location: {city} - {country}</p>}
    </div>
  );
};