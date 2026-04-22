export function WrongBox({answer}) {
    return (
        <div className="w-full p-5 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-4 transition-all hover:border-red-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-red-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-['Times_New_Roman'] leading-tight">{answer.question}</h3>
            <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-100 dark:border-red-800/30">Răspunsul tău: {answer.selected}</h4>
            <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800/30">Răspunsul corect: {answer.correct}</h4>
        </div>
    )
}

export default WrongBox;