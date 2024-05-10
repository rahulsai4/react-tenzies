import "./App.css";
import Game from "./Game";

function App() {
    return (
        <div className="App">
            <div className="container">
                <h1 className="container-title">Tenzies</h1>
                <p className="container-text">
                    roll until all dice are the same. click each die to freeze
                    it at its current value between rolls
                </p>
                <Game />
            </div>
        </div>
    );
}

export default App;
