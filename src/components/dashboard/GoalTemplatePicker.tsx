import { GOAL_TEMPLATES, type GoalTemplate } from '../../data/goalTemplates'

interface Props { addedTemplateIds: string[]; onAdd: (tpl: GoalTemplate) => void }

export default function GoalTemplatePicker({ addedTemplateIds, onAdd }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">目标模板</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {GOAL_TEMPLATES.map((tpl) => {
          const added = addedTemplateIds.includes(tpl.id)
          return (
            <div key={tpl.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{tpl.title}</p>
                <span className="text-xs text-gray-400 dark:text-gray-500">{tpl.category}</span>
              </div>
              <button type="button" onClick={() => !added && onAdd(tpl)} disabled={added}
                className={`ml-2 shrink-0 px-3 py-1 text-xs rounded-full transition-colors ${added ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 cursor-default' : 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/50'}`}>
                {added ? '已添加' : '+ 添加'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
