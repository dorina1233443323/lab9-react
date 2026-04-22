import { useCallback, useState } from "react";
import { useQuizDispatch } from "../../context/QuizContext";


export function QuestionCard({question}) {
    const dispatch = useQuizDispatch();
    const [selected, setSelected] = useState(null);

    const cardClass = "w-full max-w-2xl p-8 rounded-2xl border border-neutral-200 bg-gray-50 flex flex-col gap-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800";
    const optionClass = `
        w-full px-6 py-3 text-left
        border border-neutral-200 rounded-lg 
        hover:border-neutral-400
        transition-all duration-200 shadow-sm
        font-sans font-medium text-black-950
        dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:bg-neutral-800/50
    `;

    const handleClick = useCallback((answer) => {
        setSelected(answer);
        const isCorrect = answer === question.answer;
        setTimeout(() => {
            const userAns = {
                id: question.id,
                question: question.question,
                correct: question.answer,
                category: question.category,
                selected: answer,
                isCorrect: isCorrect
            }
            dispatch({type:"NEXT", answer:userAns})
        }, 500)

    }, [dispatch, question])

    function setClass(answer){
    if (!selected) return optionClass;
    if(answer === question.answer) return optionClass + " bg-green-500 border-green-600 text-white hover:border-green-400 dark:bg-green-600 dark:border-green-500 dark:text-white";
    if(answer === selected && answer !== question.answer) return optionClass + " bg-red-500 border-red-600 text-white hover:border-red-400 dark:bg-red-600 dark:border-red-500";
    else return optionClass
    }

    return(
        <div className={cardClass}>
            <div className="flex justify-between items-center border-b border-neutral-200 pb-4 dark:border-neutral-700">
                <span className="px-3 py-1 bg-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                    {question.category}
                </span>
                <span className={`text-xs font-bold uppercase ${
                    question.difficulty === 'Greu' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                    {question.difficulty}
                </span>
            </div>
            <h1 className="text-2xl text-black-950 dark:text-white font-['Times_New_Roman'] font-bold leading-tight">{question.question}</h1>
            <div className="flex flex-col gap-3">
                {question.options.map((option, index) => (
                    <button key={index} onClick={() => handleClick(option)} className={setClass(option)}>
                        <span className="mr-3 text-neutral-400 dark:text-neutral-500 font-mono">{index + 1}.</span>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )

}

export default QuestionCard;  