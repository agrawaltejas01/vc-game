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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/dealwars-logo.png"
              alt="DealWars Logo"
              className="w-auto h-32 md:h-40 object-contain"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xl text-gray-700 max-w-xl mx-auto">
              Only conviction survives~
            </p>

          </div>
          <p className="text-2xl text-gray-700 max-w-xl mx-auto">
            Every deal is a battle of instincts!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 space-y-6">
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-black">Your mission has three steps:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl font-bold">✓</span>
                <span className="text-gray-700">
                  Calibrate your core criteria
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl font-bold">✓</span>
                <span className="text-gray-700">
                  Engage with live deal scenarios
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl font-bold">✓</span>
                <span className="text-gray-700">
                  Reveal your evolving decision vector
                </span>
              </li>
              
            </ul>
            <h3 className="text-lg font-bold text-black">Get ready to confront your true investment instincts</h3>
          </div>

          <button
            onClick={() => navigate('/intake')}
            className="btn-primary w-full text-lg py-4 shadow-btn"
          >
            Let's Start!
          </button>
        </div>
        <p className="text-mr-3 text-gray-500">
          Five scenarios. One truth: how you actually make investment decisions.
        </p>
      </div>
    </div>
  );
}
