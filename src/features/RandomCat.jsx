import { useEffect, useState } from "react";

export default function RandomCat() {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchCat = async (signal) => {
    try {
      setErr("");
      setLoading(true);
      const res = await fetch("https://cataas.com/cat", { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImgUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (e) {
      if (e.name !== "AbortError") setErr("Failed to load cat image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();
    fetchCat(ctrl.signal);
    return () => {
      ctrl.abort();
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div aria-busy={loading}>
      <div className="row">
        <button onClick={() => fetchCat()} disabled={loading}>
          {loading ? "Loading..." : "New Cat"}
        </button>
      </div>
      {err && <p role="alert" className="error">{err}</p>}
      {imgUrl && <img src={imgUrl} alt="A random cat" />}
    </div>
  );
}