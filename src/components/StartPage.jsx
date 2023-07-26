import { React, useState } from "react";

export default function StartPage(props) {
  const [formData, setFormData] = useState({
    amount: 10,
    category: "",
    difficulty: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  console.log(formData);
  return (
    <div className="pageone">
      <img className="imageOne" src="../../images/blobs-blue.svg" />
      <img className="imageSecond" src="../../images/blobs-yellow.svg" />
      <div className="pageone-header">
        <h1>Quizzical</h1>
        <p>Set Up Preferencies For Quiz</p>
      </div>
      <section className="form">
        <div className="input-field">
          <label htmlFor="num">Choose amount of questions:</label>
          <input
            id="num"
            type="number"
            className="input-number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min={1}
            max={50}
          />
        </div>
        <div>
          <label htmlFor="categories">Choose Categories:</label>
          <select
            id="categories"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty">Choose Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </section>
      <button
        onClick={() => {
          props.findPage(1);
          props.changeQuizPrefs(formData);
        }}
        className="btn"
      >
        Start Quiz
      </button>
    </div>
  );
}
