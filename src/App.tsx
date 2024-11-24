import "./App.css";
import Background from "./Background";
import Foreground from "./Foreground";

function App() {
  return (
    <div className="w-full h-screen bg-zinc-800">
      <main>
        <Background />
        <Foreground />
      </main>
    </div>
  );
}

export default App;
