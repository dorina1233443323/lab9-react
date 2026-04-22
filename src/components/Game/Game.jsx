import { useEffect, useState } from "react";
import { useQuiz, useQuizDispatch } from "../../context/QuizContext";
import { QuestionCard } from "../QuestionCard";
import { Timer } from "../Timer";

export function Game() {
  const state = useQuiz();
  const dispatch = useQuizDispatch();

  const [streak, setStreak] = useState(0)
  const currQuestion = state.sessionQuestions[state.currentQuestion];

  useEffect(() => {
    const f = async () => setStreak(state.currStreak);
    f();
    if (state.currentQuestion >= state.sessionQuestions.length) {
    dispatch({ type: "GO_TO_RESULT" });
  }
  }, [state.currStreak, dispatch, state.currentQuestion, state.sessionQuestions.length])

  if(!currQuestion) return null;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-4 dark:bg-neutral-900 transition-colors duration-300">
      <div className="mb-4 w-full max-w-2xl flex justify-between items-end px-2">
        <div>
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400">
            Întrebarea {state.currentQuestion + 1}{" "}
            <span className="text-neutral-400 text-sm dark:text-neutral-500">
              / {state.sessionQuestions.length}
            </span>
          </h2>
        </div>
        <div className="flex gap-1">
          {state.quizInitialData.startTime !== 0 && (
            <Timer
              key={currQuestion.id}
              time={state.quizInitialData.startTime}
              question={currQuestion}
            ></Timer>
          )}
          {streak > 1 && (
            <div
              className={`w-fit h-auto p-0.5 p-r-1 flex justify-center items-center cursor-default text-xl font-bold rounded-sm bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border border-transparent dark:border-orange-800/50 transition-all`}
            >
              <p>&#128293;{streak}</p>
            </div>
          )}
        </div>
      </div>
      <QuestionCard
        key={currQuestion.id}
        question={currQuestion}
      ></QuestionCard>
    </div>
  );
}

export default Game;
