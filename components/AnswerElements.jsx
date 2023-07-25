import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// New AnswerElement component
export default function AnswerElements(props) {
  const { question, ans, formData, showFeedback, handleChange } = props;
  const [feedbackClass, setFeedbackClass] = useState("");
  useEffect(() => {
    if (showFeedback && formData[question.question] === ans) {
      const isCorrect = question.correct_answer === formData[question.question];
      setFeedbackClass(isCorrect ? "correct" : "incorrect");
    } else if (showFeedback && formData[question.question] !== ans) {
      const findCorrect = question.correct_answer === ans;
      setFeedbackClass(findCorrect ? "correct" : "incorrect");
    }
  }, [formData, question, showFeedback, ans]);

  const uniqueKey = nanoid();
  return (
    <section
      key={`div_${uniqueKey}`}
      className={`answers-div ${showFeedback ? feedbackClass : ""}`}
    >
      <input
        key={`input_${uniqueKey}`}
        id={`input_${uniqueKey}`}
        className="input-radio"
        type="radio"
        name={question.question}
        value={ans}
        checked={formData[question.question] === ans}
        onChange={(event) => handleChange(event)}
      />
      <label
        htmlFor={`input_${uniqueKey}`}
        className={`${
          showFeedback && formData[question.question] === ans
            ? feedbackClass
            : formData[question.question] !== ans &&
              question.correct_answer === ans
            ? feedbackClass
            : ""
        }`}
      >
        {ans}
      </label>
    </section>
  );
}
