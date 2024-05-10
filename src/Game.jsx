import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function Square(props) {
    const styles = props.isClicked
        ? { backgroundColor: "#59e391" }
        : { backgroundColor: "white" };

    return (
        <>
            <button
                value={props.value}
                onClick={props.handleSquareClick}
                style={styles}
                className="square"
            >
                {props.value}
            </button>
        </>
    );
}

export default function Game() {
    const [squares, setSquares] = useState(randomSquares);
    const [gameOver, setGameOver] = useState(false);

    function randomSquares() {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                value: Math.ceil(Math.random() * 6),
                isClicked: false,
                id: nanoid(),
            });
        }
        return arr;
    }

    function checkGameOver() {
        let ans = true;
        let first = squares[0].value;
        let newArr = squares.filter((square) => {
            return square.value === first;
        });
        return newArr.length === squares.length;
    }
    useEffect(() => {
        setGameOver(checkGameOver());
    }, [squares]);

    function handleSquareClick(id) {
        setSquares((prevSquares) => {
            let newArr = [];
            for (let i = 0; i < 10; i++) {
                if (prevSquares[i].id === id) {
                    newArr.push({
                        ...prevSquares[i],
                        isClicked: !prevSquares[i].isClicked,
                    });
                } else {
                    newArr.push(prevSquares[i]);
                }
            }
            return newArr;
        });
    }

    function handleRoll() {
        if (gameOver) {
            setSquares(randomSquares);
        } else {
            setSquares((prevSquares) => {
                const random = randomSquares();
                const arr = [];
                for (let i = 0; i < 10; i++) {
                    if (prevSquares[i].isClicked === true) {
                        arr.push(prevSquares[i]);
                        continue;
                    }
                    arr.push(random[i]);
                }
                return arr;
            });
        }
    }

    let displaySquares = squares.map((square) => (
        <Square
            value={square.value}
            isClicked={square.isClicked}
            key={square.id}
            handleSquareClick={() => handleSquareClick(square.id)}
        />
    ));

    return (
        <>
            {gameOver && <Confetti />}
            <div className="squares-container">{displaySquares}</div>
            <br></br>
            <button onClick={handleRoll} className="roll">
                {gameOver ? "Restart" : "Roll"}
            </button>
        </>
    );
}
