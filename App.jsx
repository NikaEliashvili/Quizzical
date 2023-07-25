import React from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";

function App() {
  const [page, setPage] = React.useState(0);
  function findPage(page) {
    setPage(page);
  }
  return (
    <>
      {page === 0 && <StartPage findPage={findPage} />}
      {page === 1 && <QuizPage findPage={findPage} />}
    </>
  );
}

export default App;
