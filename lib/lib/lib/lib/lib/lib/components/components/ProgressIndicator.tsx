'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index < currentStep 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : index === currentStep
                  ? 'bg-white border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                index < steps.length - 1
                  ? index < currentStep
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                  : 'hidden'
              }`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          {steps.map((step, index) => (
            <span key={index} className={`flex-1 text-center ${index === currentStep ? 'font-semibold text-blue-600' : ''}`}>
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
