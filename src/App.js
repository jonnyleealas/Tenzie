import React from "react";
import Dice from "./dice";
import "./styles.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Sound from "./sounds/splooge.wav"
import yaySound from "./sounds/yay_z.wav"

export default function App() {
  
  const [tenzies, setTenzies] = React.useState(false);
  const [startOver, setStartOver] = React.useState(false);
  const createNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  };

  const randomDice = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(createNewDice());
    }
    return newArray;
  };

  const [dice, setDice] = React.useState(randomDice());

  const handleWinSound = () => {
    new Audio(yaySound).play()
  }

  React.useEffect(() => {
    let obj = {};

    dice.forEach((die) => {
      if (die.isHeld === true) {
        obj["count"] = obj["count"] + 1 || 1;
        obj[die.value] = obj[die.value] + 1 || 1;
      }

      if (obj[die.value] === 10) {
        setTenzies(true);
        handleWinSound()
      }

      if (obj.count === 10 && obj[die.value] !== 10) {
        setStartOver((startOver) => !startOver);
        alert("start over");
      }
    });
  }, [dice]);


   

  const squares = dice.map((die) => {
    return (
      <Dice
        key={die.id}
        number={die.value}
        isHeld={die.isHeld}
        hold={() => hold(die.id)}
        slooge={() => hanldeSlooge()}
      />
    );
  });

  const handleRoll = () => {
    setDice(
      dice.map((die) => {
        return die.isHeld ? die : createNewDice();
      })
    );
  };

  const hold = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        console.log("dice", die);
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );

    const hanldeSlooge = () => {
      new Audio(Sound).play()
    }
    hanldeSlooge()
  };

  const newGame = () => {
    setTenzies(!tenzies);
    setDice(randomDice());
  };

  const handleStartOver = () => {
    setStartOver(!startOver);
    setDice(randomDice);
  };
  return (
    <main>
      {startOver && <button onClick={handleStartOver}>Start Over</button>}
      {tenzies && <Confetti />}
      {tenzies && <button onClick={newGame}>new game</button>}
      <div className="diceContainer">{squares}</div>
      <button onClick={handleRoll}>roll</button>
    </main>
  );
}
