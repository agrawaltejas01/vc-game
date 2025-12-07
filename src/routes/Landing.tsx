import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            VC Deal Judgment Game
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Test your investment instincts. Play through 6 realistic startup scenarios and discover your investor archetype.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-semibold text-gray-900">What to expect:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">
                  <strong>Quick intake:</strong> Share your investment preferences (2 minutes)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">
                  <strong>Real scenarios:</strong> Evaluate 5-6 realistic deals with tensions and trade-offs
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">
                  <strong>Instinctive responses:</strong> Record your gut reactions via text or audio
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">
                  <strong>Your archetype:</strong> Discover how you really make decisions (15 minutes total)
                </span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/intake')}
            className="btn-primary w-full text-lg py-4"
          >
            Start Game
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Built to help VCs understand their decision-making patterns
        </p>
      </div>
    </div>
  );
}
