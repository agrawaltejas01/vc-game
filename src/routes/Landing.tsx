import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

export function Landing() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-black">
            Pitch or Pass
          </h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-700 max-w-xl mx-auto">
              One deal at a time. No overthinking.
            </p>

          </div>
          <p className="text-2xl text-gray-700 max-w-xl mx-auto">
            Your investment instincts - revealed!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8 space-y-6">
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-black">You will do three things:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl font-bold">✓</span>
                <span className="text-gray-700">
                  Set your core criteria
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl font-bold">✓</span>
                <span className="text-gray-700">
                  React to a live deal
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl font-bold">✓</span>
                <span className="text-gray-700">
                  See your dynamic decision vector
                </span>
              </li>
              
            </ul>
            <h3 className="text-lg font-bold text-black">Get your personal pattern of how you actually invest.</h3>
          </div>

          <button
            onClick={() => navigate('/intake')}
            className="btn-primary w-full text-lg py-4"
          >
            Let's Start
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Feels like stepping into a partner meeting, but slightly relaxed.
        </p>
        <p className="text-sm text-gray-500">
          Response to every scenario uncovers how you decide where to invest. Together 5 scenarios reveal what your decisions actually show.
        </p>
      </div>
    </div>
  );
}
