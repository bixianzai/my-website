import avatar from "../assets/avatar-placeholder.svg";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-12">
          关于我
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left: Photo */}
          <div className="flex-shrink-0">
            <img
              src={avatar}
              alt="个人照片"
              className="w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Right: Bio */}
          <div className="flex flex-col gap-6 text-left">
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              我是一名全栈开发者，热衷于用代码创造有价值的产品。从大学时期写下第一行
              HTML 开始，我就迷上了将创意转化为数字体验的过程。过去五年间，我专注于
              React 和 Node.js 技术栈，积累了从原型到上线的完整经验。
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              我相信好的软件不只是能运行——它应该是可维护的、优雅的、对用户友好的。
              在日常工作中，我注重代码质量、测试覆盖和团队协作流程，擅长在快速迭代
              和工程严谨之间找到平衡。开源社区是我成长的重要土壤，我也积极参与其中。
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              工作之外，我喜欢探索新技术、写技术博客、以及在社区活动中分享经验。
              如果你正在寻找一个对技术有热情、对产品有追求的合作伙伴，欢迎找我聊聊。
            </p>

            {/* Brand tag */}
            <div className="mt-2">
              <span className="inline-block px-4 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-600 rounded-full">
                麻豆传媒
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
