import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen,
  faLaptop,
  faShieldAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

type Option = {
  id: string;
  title: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
};

const returnOptions: Option[] = [
  {
    id: 'unbox',
    title: 'Unbox in Front of Delivery Person',
    description: 'Decide instantly if you want to return.',
    icon: faBoxOpen,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500'
  },
  {
    id: 'verify',
    title: 'Verify Your Product on Delivery',
    description: 'Upload unboxing video after delivery to avail return.',
    icon: faLaptop,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500'
  },
  {
    id: 'no-evidence',
    title: 'No Evidence, No Return',
    description: 'Returns accepted only if non-defective.',
    icon: faShieldAlt,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500'
  }
];

const ReturnOptionsForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      alert(`You selected: ${selectedOption}`);
    } else {
      alert('Please select an option before continuing.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-white px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Return Option</h1>

          {/* Horizontal Option Scroll */}
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {returnOptions.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <div
                  key={option.id}
                  className={`flex-shrink-0 w-80 p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>Select</span>
                        <div
                          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                            isSelected ? 'border-orange-500' : 'border-gray-400'
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={`text-xs ${
                              isSelected ? 'text-orange-500' : 'text-gray-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-16 h-16 rounded-lg flex items-center justify-center ${option.iconBg}`}
                    >
                      <FontAwesomeIcon icon={option.icon} className={`${option.iconColor} text-2xl`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="bg-gray-900 px-6 py-4">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReturnOptionsForm;
