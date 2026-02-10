import { useEffect, useState } from "react";

export default function RandomDog() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchDog = async (signal) => {
    try {
      setErr("");
      setLoading(true);
      const res = await fetch("https://dog.ceo/api/breeds/image/random", { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setImg(data.message);
    } catch (e) {
      if (e.name !== "AbortError") setErr("Failed to load dog image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();
    fetchDog(ctrl.signal);
    return () => ctrl.abort();
  }, []);

  return (
    <div aria-busy={loading}>
      <div className="row">
        <button onClick={() => fetchDog()} disabled={loading}>
          {loading ? "Loading..." : "New Dog"}
        </button>
      </div>
      {err && <p role="alert" className="error">{err}</p>}
      {img && <img src={img} alt="A random dog" />}
    </div>
  );
}