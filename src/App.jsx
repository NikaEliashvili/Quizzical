import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";

function App() {
  const [page, setPage] = React.useState(0);
  const [quizPref, setQuizPref] = React.useState({
    amount: 10,
    category: "",
    difficulty: "",
  });
  function findPage(page) {
    setPage(page);
  }
  function changeQuizPrefs(newPref) {
    console.log("Changed");
    setQuizPref(newPref);
  }
  return (
    <>
      {page === 0 && (
        <StartPage findPage={findPage} changeQuizPrefs={changeQuizPrefs} />
      )}
      {page === 1 && <QuizPage findPage={findPage} quizPref={quizPref} />}
    </>
  );
}

export default App;
