import { useEffect, useState } from "react";

export default function Game() {
    const [squares, setSquares] = useState(
        new Array(10).fill({
            value: 0,
            index: -1,
            isClicked: false,
        })
    );

    useEffect(handleRoll, []);

    function handleSquareClick(event, index) {
        event.target.className = !squares[index].isClicked
            ? "square isClicked"
            : "square";

        setSquares((prevSquares) => {
            let newArr = [];
            for (let i = 0; i < 10; i++) {
                if (i === index) {
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
        console.log(squares);
        setSquares((prevSquares) => {
            let newArr = [];
            for (let i = 0; i < 10; i++) {
                let r = Math.ceil(Math.random() * 6);
                if (!prevSquares[i].isClicked) {
                    newArr.push({ ...prevSquares[i], value: r, index: i });
                } else {
                    newArr.push({ ...prevSquares[i], index: i });
                }
            }
            return newArr;
        });
    }

    let displaySquares = squares.map((square) => (
        <Square
            value={square.value}
            index={square.index}
            handleSquareClick={handleSquareClick}
        />
    ));

    return (
        <>
            <div className="squares-container">{displaySquares}</div>
            <br></br>
            <button onClick={handleRoll} className="roll">
                Roll
            </button>
        </>
    );
}

function Square(props) {
    return (
        <>
            <button
                className="square"
                value={props.value}
                index={props.index}
                onClick={(event) => props.handleSquareClick(event, props.index)}
            >
                {props.value}
            </button>
        </>
    );
}
