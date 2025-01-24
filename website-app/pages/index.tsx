import { Terminal, Brain, Code, LineChart } from 'lucide-react';

const Home = () => {
  const skills = [
    { icon: <Brain className="w-8 h-8" />, title: "AI/ML", description: "Deep Learning & Neural Networks" },
    { icon: <Code className="w-8 h-8" />, title: "Full Stack", description: "Web Development Journey" },
    { icon: <Terminal className="w-8 h-8" />, title: "Engineering", description: "System Architecture" },
    { icon: <LineChart className="w-8 h-8" />, title: "Analytics", description: "Data-Driven Insights" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            Welcome to TataKKKL&apos;s Website
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            I&apos;m a tenured AI scientist and machine learning engineer on a two-week
            journey (Jan 17 - Feb 2) to deeply explore full-stack development.
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
            Welcome to my playground!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;