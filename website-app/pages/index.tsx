import { Terminal, Brain, Code, LineChart, ExternalLink } from 'lucide-react';

const Home = () => {
  const skills = [
    { icon: <Brain className="w-8 h-8" />, title: "AI/ML", description: "Deep Learning & Neural Networks" },
    { icon: <Code className="w-8 h-8" />, title: "Full Stack", description: "Web Development & System Design" },
    { icon: <Terminal className="w-8 h-8" />, title: "Engineering", description: "Building Scalable Solutions" },
    { icon: <LineChart className="w-8 h-8" />, title: "Analytics", description: "Data Analysis & Insights" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            Welcome to TataKKKL&apos;s Playground
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            AI scientist and ML engineer exploring full-stack development
            (Jan 17 - Feb 2) to expand my technical capabilities.
            <a 
              href="https://danqingz.github.io/blog/2025/01/20/full-stack.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-2 text-blue-500 hover:text-blue-600"
            >
              Read more <ExternalLink className="w-5 h-5 ml-1" />
            </a>
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learning full-stack development enhances my ability to build and debug 
            efficiently, combining AI capabilities with hands-on development 
            to create meaningful projects independently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg
                        transform transition-all duration-300 hover:scale-105"
            >
              <div className="text-blue-500 dark:text-blue-400 mb-4">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Welcome to my project space
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;