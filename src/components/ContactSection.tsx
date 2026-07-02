export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">联系我</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">如果你对我的项目感兴趣，或者想一起合作，欢迎通过以下方式联系我。</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a href="mailto:bixianzai2025@163.com" className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]">
            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">bixianzai2025@163.com</span>
          </a>
          <a href="https://github.com/bixianzai" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]">
            <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">github.com/bixianzai</span>
          </a>
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">中国 · 成都</span>
          </div>
        </div>
      </div>
    </section>
  )
}
