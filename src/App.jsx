import { MainForm } from "./components/MainForm";
import { Game } from "./components/Game";
import { QuizProvider } from "./context/QuizContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from "react";
import { questions } from "./data/questions.json";
import { useQuiz, useQuizDispatch } from "./context/QuizContext";
import { ResultPage } from "./components/ResultPage/ResultPage";
import { Navbar } from "./components/Navbar";

function Component() {
  const state = useQuiz();
  const currPage = state.currStep;
  const dispatch = useQuizDispatch();

  useEffect(() => {
    dispatch({ type: "SET_QUESTIONS", questions: questions });
  }, [dispatch]);

  switch(currPage){
    case 'setup':
      return <MainForm/>
    case 'game': 
      return <Game/>
    case 'results':
      return <ResultPage/>
  }
}

function AppPage () {
  return(
    <QuizProvider>
        <Navbar></Navbar>
        <Component></Component>
    </QuizProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppPage/>
    </ThemeProvider>
  );
}

export default App;
