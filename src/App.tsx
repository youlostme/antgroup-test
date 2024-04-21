import "./styles.css";
import "antd/dist/antd.css";
import { Cards } from "./test-card";
import { CardsGrid } from "./test-card-grid";
import { TimeFilters } from "./test-time";
import "./test-clone";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div style={{ marginBottom: 24 }}>
        test-card
        <Cards
          cards={[{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }]}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        test-card-grid
        <CardsGrid
          cards={[{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }]}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        test-time
        <TimeFilters />
      </div>
    </div>
  );
}
