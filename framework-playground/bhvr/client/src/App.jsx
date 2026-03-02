import { useEffect, useState } from "react";
import { API_URL } from "@app/shared";
import "./App.css";
import { Button } from "@/components/ui/button";

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
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="destructive" size="lg">
          large red button
        </Button>
        <Button variant="link" size="lg">
          large link button
        </Button>
        <Button>basic button</Button>
        <Button variant="outline">outline button</Button>
      </div>
    </div>
  );
}

export default App;
