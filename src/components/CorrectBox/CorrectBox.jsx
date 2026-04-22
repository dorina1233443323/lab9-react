export function CorrectBox({answer}) {
    return (
        <div className="w-full p-5 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-3 transition-all hover:border-green-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-green-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-['Times_New_Roman'] leading-tight">{answer.question}</h3>
            <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800/30">{answer.selected}</h4>
        </div>
    )
}

export default CorrectBox;