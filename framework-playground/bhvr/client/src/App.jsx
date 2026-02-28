import { useEffect, useState } from "react";
import { API_URL } from "@app/shared";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((json) => setData(json.status));
  }, []);

  return (
    <div>
      <h1>server status: {data ? data : "loading..."}</h1>
    </div>
  );
}

export default App;
