import { useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import io, { Socket } from "socket.io-client";
import isPartOfSOS from "./GameLogic";
type InputValue = { value: string; disabled: boolean };

type InputArray = Array<Array<InputValue>>;

type AppProps = {
  numPlayers: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

export default function Game({ numPlayers, socket }: AppProps): JSX.Element {
  const arr: InputArray = Array.from({ length: 10 }, () =>
    Array(10).fill({ value: "", disabled: false })
  );
  const [selectedInput, setSelectedInput] = useState<[number, number] | null>(
    null
  );
  const [inputArray, setInputArray] = useState<InputArray>(arr);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [playerDisplayText, setPlayerDisplayText] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [player1score, setPlayer1score] = useState<number>(0);
  const [player2score, setPlayer2score] = useState<number>(0);

  useEffect(() => {
    socket.on("getArray", (data) => {
      console.log("from use", data);
      setInputArray(data);
    });

    socket.on("updatedPlayer1Score", (data) => {
      console.log(data, "from ui 1");
      setPlayer1score(data);
    });

    socket.on("updatedPlayer2Score", (data) => {
      console.log(data, "from ui 2");
      setPlayer2score(data);
    });

    socket.on("currentPlayerStatuschanged", (data) => {
      setCurrentPlayer(data);
    });
  }, [socket]);

  useEffect(() => {
    switch (currentPlayer) {
      case 1:
        setPlayerDisplayText("Player 1's turn");
        break;
      case 2:
        setPlayerDisplayText("Player 2's turn");
        break;
      case 3:
        setPlayerDisplayText("Player 3's turn");
        break;
      // Add more cases as needed for additional players
      default:
        setPlayerDisplayText("");
        break;
    }
  }, [currentPlayer]);

  const handleClick = (itemIndex: number, index: number): void => {
    if (!arr[itemIndex][index].disabled) {
      setSelectedInput([itemIndex, index]);
    }
  };

  const handleSButtonClick = (): void => {
    if (selectedInput !== null) {
      const [itemIndex, index] = selectedInput;
      const currentInputValue = inputArray[itemIndex][index].value;
      if (currentInputValue !== "S" && currentInputValue !== "O") {
        setInputArray((prevInputArray) => {
          const updatedArray = [...prevInputArray];
          updatedArray[itemIndex][index] = { value: "S", disabled: true };
          socket.emit("arrayChanged", updatedArray);
          return updatedArray;
        });
        setCurrentPlayer((prevPlayer) => {
          socket.emit("currentplayerstatus", (prevPlayer % numPlayers) + 1);
          return (prevPlayer % numPlayers) + 1;
        });
      }
    }
  };

  const handleOButtonClick = (): void => {
    if (selectedInput !== null) {
      const [itemIndex, index] = selectedInput;
      const currentInputValue = inputArray[itemIndex][index].value;
      if (currentInputValue !== "S" && currentInputValue !== "O") {
        setInputArray((prevInputArray) => {
          const updatedArray = [...prevInputArray];
          updatedArray[itemIndex][index] = { value: "O", disabled: true };
          socket.emit("arrayChanged", updatedArray);
          return updatedArray;
        });
        setCurrentPlayer((prevPlayer) => {
          socket.emit("currentplayerstatus", (prevPlayer % numPlayers) + 1);
          return (prevPlayer % numPlayers) + 1;
        });
      }
    }
  };

  const sosDone = (): void => {
    if (selectedInput !== null) {
      const [itemIndex, index] = selectedInput;
      // const currentInputValue = inputArray[itemIndex][index].value;
      console.log(itemIndex, index, "from done");

      console.log(inputArray);
      let ans = isPartOfSOS(inputArray, itemIndex, index);
      console.log(ans);
      console.log(currentPlayer, "current player");
      if (ans) {
        if (currentPlayer === 1) {
          setPlayer2score((prev) => prev + 1);
          socket.emit("playerScore2", player2score + 1);
        } else {
          setPlayer1score((prev) => prev + 1);
          socket.emit("playerScore1", player1score + 1);
        }
      }
    }
    setShowToast(true);

    setSelectedInput(null);
  };
  return (
    <div className="App">
      <h1
        style={{
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "0rem",
          color: "#0fe7ff",
          textShadow: "1px 1px 1px #CCC",
        }}
      >
        SOS
      </h1>
      <div
        style={{
          marginBottom: "0",
          fontSize: "1.2rem",
          color: "#0fe7ff",
          textShadow: "1px 1px 1px #EEE",
        }}
      >
        Current Player:{" "}
        <span
          style={{
            fontWeight: "bold",
            color: "#0fe7ff",
            textShadow: "1px 1px 1px #CCC",
          }}
        >
          {currentPlayer}
        </span>
      </div>
      <div
        style={{
          marginBottom: "0",
          fontSize: "1.2rem",
          color: "#0fe7ff",
          textShadow: "1px 1px 1px #EEE",
        }}
      >
        {playerDisplayText}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <div
          style={{
            marginBottom: "0",
            fontSize: "1.8rem",
            color: "black",
          }}
        >
          Player 1 : {player1score}
        </div>
        <div
          style={{
            marginBottom: "0",
            fontSize: "1.8rem",
            color: "black",
            // textShadow: "1px 1px 1px #EEE",
          }}
        >
          Player 2 : {player2score}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${arr.length},1fr)`,
          margin: "0 auto",
          width: `${arr.length * 40}px`,
          height: `${arr.length * 40}px`,
          gap: "0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {arr.map((item, itemIndex) => {
          return item.map((el, index) => {
            const isSelected =
              selectedInput !== null &&
              selectedInput[0] === itemIndex &&
              selectedInput[1] === index;
            return (
              <input
                key={`${itemIndex}-${index}`}
                style={{
                  border: "1px solid gray",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  width: "30px",
                  height: "30px",
                  margin: "0",
                  textAlign: "center",
                  backgroundColor: isSelected ? "yellow" : "white",
                  cursor: "pointer",
                }}
                value={el.value || inputArray[itemIndex][index].value}
                onClick={() => handleClick(itemIndex, index)}
                readOnly={el.disabled}
              />
            );
          });
        })}
      </div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            border: "2px solid #0A75BC",
            color: "#0A75BC",
            borderRadius: "0.25rem",
            padding: "0.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 6px rgba(10, 117, 188, 0.5)",
            transition: "all 0.2s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={handleSButtonClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(10, 117, 188, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 6px rgba(10, 117, 188, 0.5)";
          }}
        >
          <span
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            S
          </span>
          <span
            style={{
              position: "absolute",
              top: "0",
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "#0A75BC",
              zIndex: 0,
              transition: "all 0.2s ease",
            }}
          ></span>
        </button>

        <button
          style={{
            backgroundColor: "white",
            border: "2px solid #0A75BC",
            color: "#0A75BC",
            borderRadius: "0.25rem",
            padding: "0.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 6px rgba(10, 117, 188, 0.5)",
            transition: "all 0.2s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={handleOButtonClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(10, 117, 188, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 6px rgba(10, 117, 188, 0.5)";
          }}
        >
          <span
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            O
          </span>
          <span
            style={{
              position: "absolute",
              top: "0",
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "#0A75BC",
              zIndex: 0,
              transition: "all 0.2s ease",
            }}
          ></span>
        </button>

        <button
          style={{
            backgroundColor: "white",
            border: "2px solid #0A75BC",
            color: "#0A75BC",
            borderRadius: "0.25rem",
            padding: "0.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 6px rgba(10, 117, 188, 0.5)",
            transition: "all 0.2s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={sosDone}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(10, 117, 188, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 6px rgba(10, 117, 188, 0.5)";
          }}
        >
          <span
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            Done
          </span>
          <span
            style={{
              position: "absolute",
              top: "0",
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "#0A75BC",
              zIndex: 0,
              transition: "all 0.2s ease",
            }}
          ></span>
        </button>
        {/* {showToast && <Toast message="Hello, World!" type="success" />} */}
      </div>
    </div>
  );
}

interface Props {
  message: string;
  type?: "success" | "warning" | "error" | "info";
}

const Toast: React.FC<Props> = ({ message, type = "info" }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`${
            type === "success"
              ? "bg-green-500"
              : type === "warning"
              ? "bg-yellow-500"
              : type === "error"
              ? "bg-red-500"
              : "bg-gray-500"
          } fixed top-0 right-0 m-8 p-4 rounded-md shadow-lg text-white z-50`}
        >
          <p className="font-bold">{type.toUpperCase()}</p>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};
