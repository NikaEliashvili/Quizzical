import React from "react";

export default function StartPage(props) {
  return (
    <div className="pageone">
      <img className="imageOne" src="../../images/blobs-blue.svg" />
      <img className="imageSecond" src="../../images/blobs-yellow.svg" />
      <div className="pageone-header">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
      </div>
      <button onClick={() => props.findPage(1)} className="btn">
        Start Quiz
      </button>
    </div>
  );
}
