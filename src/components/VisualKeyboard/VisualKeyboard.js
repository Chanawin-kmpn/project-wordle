import React from "react";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function getStatusByLetter(validatedGuesses) {
  const statusObj = {};
  const allLetters = validatedGuesses.flat();
  console.log(allLetters);

  allLetters.forEach(({ letter, status }) => {
    const currentStatus = statusObj[letter];

    if (currentStatus === undefined) {
      //ถ้าหากว่ายังไม่มีสถานะของตัวอักษรนั้นก็ให้เพิ่มสถานะนั้นเข้าไป
      statusObj[letter] = status;
      return;
    }

    // กำหนดลำดับความสำคัญของข้อผิดพลาด
    const STATUS_RANKS = {
      correct: 1,
      misplaced: 2,
      incorrect: 3,
    };

    const currentStatusRank = STATUS_RANKS[currentStatus]; //สถานะของเดิม
    const newStatusRank = STATUS_RANKS[status]; //สถานะของใหม่

    if (newStatusRank < currentStatusRank) {
      statusObj[letter] = status;
    }
    console.log(statusObj);
  });
  return statusObj;
}
function VisualKeyboard({ validatedGuesses }) {
  const statusByLetter = getStatusByLetter(validatedGuesses);
  return (
    <div className="keyboard">
      {ROWS.map((row, index) => (
        <div key={index} className="keyboard-row">
          {row.map((letter) => (
            <div
              key={letter}
              className={`letter ${statusByLetter[letter] || ""}`}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default VisualKeyboard;
