import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';

const Leaderboard: React.FC = () => {
  const leaderboard = useSelector((state: RootState) => state.realTimeQuiz.leaderboard);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Leaderboard</h2>
      <ol className="divide-y divide-gray-200 dark:divide-gray-700">
        {leaderboard.length === 0 ? (
          <li className="text-center text-gray-500 dark:text-gray-400">No scores yet.</li>
        ) : (
          leaderboard.map((user: { id: string; name: string; score: number }, idx: number) => (
            <li key={user.id} className="flex items-center justify-between py-2">
              <span className="font-medium text-gray-800 dark:text-gray-200">{idx + 1}. {user.name}</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{user.score}</span>
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

export default Leaderboard;
