import { useEffect, useState } from "react";
import { useQuizDispatch } from "../../context/QuizContext";

export function Timer({time, question}) {
    const [timeLeft, setTimeLeft] = useState(time);
    const dispatch = useQuizDispatch();

    useEffect(() => {
        if(timeLeft <= 0){
            dispatch({type:'NEXT', answer:{
                id: question.id,
                question: question.question,
                correct: question.correct,
                category: question.category,
                selected: 'Nu s-a selectat',
                isCorrect: false}})
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000)

        return () => clearInterval(timerId);
    }, [timeLeft, dispatch, question])

    return(
        <div className={`w-fit h-auto p-0.5 p-r-1 flex justify-center items-center cursor-default text-xl font-bold rounded-sm ${timeLeft > 5 ? `bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50` : `bg-red-300 text-red-800 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800/50`}`}>
            <p>&#128336;{timeLeft}s</p>
        </div>
    )
}

export default Timer;