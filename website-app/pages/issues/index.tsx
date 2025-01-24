import GitHubIssues from '@/components/GitHubIssues'

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-black dark:text-white text-3xl font-bold mb-8">Issues of LiteWebAgentTreeSearch Repository</h1>
        <GitHubIssues />
      </div>
    </div>
  );
};

export default Home;