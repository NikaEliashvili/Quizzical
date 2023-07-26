import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import AnswerElements from "./AnswerElements";

export default function QuizPage(props) {
  const [quizData, setQuizData] = useState([]);
  const [buttonPlayAgain, setButtonPlayAgain] = useState(false);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState({});
  const { amount, difficulty, category } = props.quizPref;
  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        // Shuffle the correct answers only once when the data is fetched
        const shuffledData = data.results.map((question) => {
          question.question = decode(question.question);
          question.correct_answer = decode(question.correct_answer);
          question.incorrect_answer = decode(question.incorrect_answer);
          const allAnswers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          const shuffledAnswers = shuffleArray(allAnswers);
          return {
            ...question,
            shuffledAnswers,
          };
        });
        setQuizData(shuffledData);
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    if (!buttonPlayAgain) {
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  }

  function shuffleArray(array) {
    // Shuffle the array only if it's not already shuffled
    if (!array.isShuffled) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      array.isShuffled = true;
    }
    return array;
  }

  function checkAnswers() {
    if (buttonPlayAgain) {
      props.findPage(0);
    } else {
      const feedback = quizData.map((question) => {
        const isCorrect =
          question.correct_answer === formData[question.question];
        return isCorrect ? "correct" : "incorrect";
      });
      setShowFeedback(true);

      const correctCount = quizData.filter((question) => {
        return question.correct_answer === formData[question.question];
      }).length;
      setCountCorrectAnswers(correctCount);
    }
    setButtonPlayAgain((prevBool) => !prevBool);
  }

  const createQuizElements = quizData.map((question) => {
    const createAnswerElements = question.shuffledAnswers.map((ans) => {
      ans = decode(ans);
      const isCorrectAnswer = question.correct_answer === ans;
      const uniqueKey = nanoid();

      return (
        <AnswerElements
          key={`answer_${uniqueKey}`}
          question={question}
          ans={ans}
          formData={formData}
          isCorrectAnswer={isCorrectAnswer}
          showFeedback={showFeedback}
          handleChange={handleChange}
        />
      );
    });

    return (
      <div key={`question_${nanoid()}`} className="question-box">
        <div className="question">
          <h1>{question.question}</h1>
        </div>
        <div className="answers">{createAnswerElements}</div>
        <hr />
      </div>
    );
  });

  return (
    <div key={nanoid()}>
      <img className="imageOne" src="../../images/blobs-blue.svg" />
      <img className="imageSecond" src="../../images/blobs-yellow.svg" />
      <section className="quizz-sec">{createQuizElements}</section>

      {buttonPlayAgain && (
        <p className="scores">
          You scored {countCorrectAnswers}/{quizData.length} correct answers
        </p>
      )}
      <button onClick={checkAnswers} className="btn">
        {buttonPlayAgain ? "Play Again" : "Check Answers"}
      </button>
    </div>
  );
}
