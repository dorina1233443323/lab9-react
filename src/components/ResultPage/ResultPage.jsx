import { useCallback, useMemo } from "react";
import { useQuiz, useQuizDispatch } from "../../context/QuizContext";
import {CategoryBox} from "../CategoryBox/CategoryBox";
import { CorrectBox } from "../CorrectBox";
import { WrongBox } from "../WrongBox";

export function ResultPage() {
    const state = useQuiz();
    const dispatch = useQuizDispatch();

    const filterAnswers = useMemo(() => {
        return state.answers.filter(answer => {
            const matchType = state.activeFilters.type === 'all' ? true : state.activeFilters.type === 'correct' ? answer.isCorrect : !answer.isCorrect;
            const matchesCategory = state.activeFilters.category === 'Toate' ? true : answer.category === state.activeFilters.category;
            return matchType && matchesCategory
        })
    }, [state.answers, state.activeFilters])

    const setFilter = useCallback((type, value) => {
        dispatch({type:'SET_FILTERS', filters: {[type]: value}})
    }, [dispatch])
    
    const scores = useMemo(() => {
        return JSON.parse(localStorage.getItem('scores')) || [];
    }, [])

    const sortedScores = useMemo(() => {
        return [...scores].sort((a, b) => (b.correct / b.total) - (a.correct / a.total));
    }, [scores]);

    const btnClass = "flex-1 py-0.5 px-4 rounded-lg font-semibold transition-all bg-neutral-200 text-neutral-900 hover:bg-neutral-400 border border-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700"
    const activeBtnClass = "ring-2 ring-blue-500 bg-neutral-400 dark:bg-neutral-600";
    
    const tdClass = "p-3 text-sm font-bold text-neutral-900 dark:text-white"
    const thClass = "p-3 text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400"
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-4 dark:bg-neutral-900 transition-colors duration-300">
            <div className="w-full max-w-2xl p-8 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col gap-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
                <div>
                    <h1 className="text-4xl text-black-950 font-['Times_New_Roman'] font-bold dark:text-white">Rezultate</h1>
                    <p className="text-m text-neutral-600 font-['Times_New_Roman'] font-medium dark:text-neutral-400">Felicitari, <span className="font-bold dark:text-neutral-200">{state.quizInitialData.userName}</span>!</p>
                </div>
                

                <div className=" flex flex-col items-center justify-center bg-blue-100 w-30 h-30 rounded-full py-8 px-4 border border-blue-700 dark:bg-blue-900/30 dark:border-blue-500">
                    <p className="text-4xl font-black text-blue-700 dark:text-blue-400">
                        {state.answers.filter(answer => answer.isCorrect).length}/{state.answers.length}
                    </p>
                    <p className="text-m font-medium text-neutral-500 dark:text-neutral-400 py-1">
                        {(state.answers.filter(answer => answer.isCorrect).length /state.answers.length * 100).toFixed(2)}%
                    </p>
                </div>
                
                {state.maxStreak > 1 && (
                    <div>
                        <h3 className="text-m text-neutral-600 font-['Times_New_Roman'] font-medium dark:text-neutral-400" >Serie maxima: &#128293;<span className="font-bold dark:text-neutral-200">{state.maxStreak} </span> răspunsuri corecte consecutive</h3>
                    </div>
                )}
                
                <h2 className="text-l font-bold text-neutral-900 mt-2 px-1 dark:text-neutral-100">Pe categorii</h2>
                <div className="flex gap-1.5">
                    {state.categoryAnswers.map((cat, index) => (
                        <CategoryBox key={index} category={cat}></CategoryBox>
                    ))}
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                    <h2 className="text-l font-bold text-neutral-900 dark:text-neutral-100">Detalii răspunsuri</h2>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setFilter('type', 'all')} className={`${btnClass} ${state.activeFilters.type === 'all' ? activeBtnClass:''}`}>Toate</button>
                        <button onClick={() => setFilter('type', 'correct')} className={`${btnClass} ${state.activeFilters.type === 'correct' ? activeBtnClass:''}`}>Corecte</button>
                        <button onClick={() => setFilter('type', 'wrong')} className={`${btnClass} ${state.activeFilters.type === 'wrong' ? activeBtnClass:''}`}>Gresite</button>
                        <select value={state.activeFilters.category} onChange={(e) =>setFilter('category', e.target.value)} className={btnClass} name="" id="">
                            <option>Toate categoriile</option>
                            {state.categoryAnswers.map((cat, index) => (
                                <option key={index} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2">
                    {filterAnswers.length > 0 ? (filterAnswers.map((answer, index) => ( answer.isCorrect ? (<CorrectBox key={index} answer={answer} />) : (<WrongBox key={index} answer={answer} />)))) 
                    : (<p className="text-center text-neutral-500 italic py-4">Niciun răspuns pentru filtrele selectate.</p>)}
                </div>

                <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-700">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 font-['Times_New_Roman']">Istoricul scorurilor</h3>
                    <table className="w-full text-left border-collapse bg-white dark:bg-neutral-800">
                        <tr>
                            <th className={thClass}>#</th>
                            <th className={thClass}>Utilizator</th>
                            <th className={thClass}>Cel mai bun scor</th>
                            <th className={thClass}>Data</th>
                        </tr>
                        {sortedScores.map((score, index) => (
                            <tr key={index}>
                                <td className={tdClass}>{index + 1}</td>
                                <td className={tdClass}>{score.userName}</td>
                                <td className={tdClass}>{score.correct}/{score.total}</td>
                                <td className={tdClass}>{score.date}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <button onClick={() => dispatch({type:'START_OVER'})} className="w-full px-4 py-2 rounded-lg bg-blue-800 text-white font-['Times_New_Roman'] font-bold cursor-pointer">Incearca din nou</button>
            </div>
        </div>
    )
}

export default ResultPage;