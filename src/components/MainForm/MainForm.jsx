import { category } from "../../data/questions.json";
import { timeLimit } from "../../data/questions.json";
import { useQuiz, useQuizDispatch } from "../../context/QuizContext";
import { useState } from "react";

export function MainForm() {
    const state = useQuiz();
    const dispatch = useQuizDispatch();


    const inputClasses = `
    w-full px-4 py-2 
    border border-neutral-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent 
    transition-all duration-200 bg-white shadow-sm
    dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:focus:ring-blue-500
    `;
    const labelClasses = "text-sm text-black-950/70 font-sans font-bold mb-1 ml-1 dark:text-neutral-400";
   
    function validationFail() {
        const value = state.quizInitialData.userName;
        return !value || value.toString().trim() === "" 
    }

    const[submitted, setSubmitted] = useState(false);
    function handleSubmit(){
        setSubmitted(true);
        if(!validationFail())dispatch({type: 'START_GAME'});
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-4 dark:bg-neutral-900">
            <div className="w-full max-w-2xl p-8 rounded-2xl border border-neutral-200 bg-gray-50 flex flex-col gap-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                <h1 className="text-4xl text-black-950 font-['Times_New_Roman'] font-bold dark:text-white">Quiz App</h1>
                <p className="text-m text-neutral-600 font-['Times_New_Roman'] font-medium dark:text-neutral-400">Testează-ți cunoștințele!</p>
                <div>
                    <label className={labelClasses}>Numele tău</label>
                    <input value={state.quizInitialData.userName} onChange={(e) => dispatch({type:"SET_USERNAME", userName:e.target.value})} className={inputClasses} type="text" /> 
                    {submitted && validationFail() && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
                        Field required
                        </p>
                    )}

                    <label htmlFor="categorie" className={labelClasses}>Categorie</label>
                    <select value={state.quizInitialData.category} onChange={(e) => dispatch({type:'SET_CATEGORY', category:e.target.value})} name="categorie" id="categorie" className={inputClasses}>
                        {category.map((c) => (
                            <option key={c.id} value={c.name}> {c.name}</option>
                        ))}
                    </select>

                    <label className={labelClasses}>Număr de întrebări</label>
                    <select value={state.quizInitialData.questionsNumber} onChange={(e) =>  dispatch({type:'SET_NUMBER', number:Number(e.target.value)})} name="numar" id="numar" className={inputClasses}>
                        {category.find((c) =>  c.name === state.quizInitialData['category'])
                        ?.questionSelesct.map((n, index) => (
                                <option key={index} value={n}>{n}</option>
                            ))
                        }
                    </select>

                    <label className={labelClasses}>Timp limită per întrebare</label>
                    <select value={state.quizInitialData.startTime} onChange={(e) => dispatch({type:'SET_TIME', time:Number(e.target.value)})} name="time" id="time" className={inputClasses}>
                        {timeLimit.map((t) => (
                            <option key={t.id} value={t.id}> {t.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={() => {
                    handleSubmit(); 
                    console.log(state)}} className="w-full px-4 py-2 rounded-lg bg-blue-800 text-white font-['Times_New_Roman'] font-bold cursor-pointer">Incepe Quiz-ul</button>
            </div>
        </div>
    )
}

export default MainForm;