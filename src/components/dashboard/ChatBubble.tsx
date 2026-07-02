import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${isUser ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'}`}>
        {isUser ? '我' : 'AI'}
      </div>
      <div className={`relative max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser ? 'bg-purple-500 text-white rounded-tr-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-md'}`}>
        <div className="prose prose-sm dark:prose-invert max-w-none [&_pre]:bg-gray-800 [&_pre]:text-gray-100 [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:overflow-x-auto [&_code]:text-purple-500 [&_code]:bg-gray-100 dark:[&_code]:bg-gray-800 [&_code]:px-1 [&_code]:rounded [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
