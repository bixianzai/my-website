import img01 from "../assets/projects/placeholder-01.svg";
import img02 from "../assets/projects/placeholder-02.svg";
import img03 from "../assets/projects/placeholder-03.svg";
import img04 from "../assets/projects/placeholder-04.svg";

interface Project {
  image: string;
  title: string;
  description: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    image: img01,
    title: "E-Commerce Platform",
    description:
      "A full-stack online store built with React and Node.js, featuring real-time inventory management and Stripe payment integration.",
    githubUrl: "https://github.com/alexchen/ecommerce-platform",
  },
  {
    image: img02,
    title: "Weather Dashboard",
    description:
      "Interactive weather visualization app using OpenWeather API with 7-day forecasts, radar maps, and severe weather alerts.",
    githubUrl: "https://github.com/alexchen/weather-dashboard",
  },
  {
    image: img03,
    title: "Task Manager API",
    description:
      "RESTful API service for task management with JWT authentication, role-based access control, and PostgreSQL backend.",
    githubUrl: "https://github.com/alexchen/task-manager-api",
  },
  {
    image: img04,
    title: "Markdown Note Editor",
    description:
      "A browser-based Markdown editor with live preview, syntax highlighting, file export, and local storage persistence.",
    githubUrl: "https://github.com/alexchen/markdown-editor",
  },
];

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="py-24 px-6 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-12">
          项目
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Project screenshot */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
