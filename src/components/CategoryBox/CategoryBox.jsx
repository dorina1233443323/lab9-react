export function CategoryBox({category}) {
    return (
        <div className="flex-1 py-0.5 px-4 rounded-lg font-semibold transition-all bg-neutral-200 text-neutral-900 border border-neutral-300 dark:text-neutral-50 dark:bg-neutral-800 dark:border-neutral-900">
            <h3>{category.name}</h3>
            <h2>{category.corect}/{category.total}</h2>
            <h3>{(Number(category.corect)/Number(category.total)*100).toFixed()}%</h3>
        </div>
    )
}

export default CategoryBox;