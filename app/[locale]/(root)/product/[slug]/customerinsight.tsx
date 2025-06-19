'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faStar,
    faTshirt,
    faAward,
    faLeaf,
    faDollarSign,
    faShoppingBag
} from '@fortawesome/free-solid-svg-icons';

const CustomerExperienceInsights: React.FC = () => {
    const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0, 0]);

    useEffect(() => {
        const targetValues = [95, 96, 91, 94, 87];
        const timeout = setTimeout(() => {
            setAnimatedValues(targetValues);
        }, 100); // Delay animation slightly after mount
        return () => clearTimeout(timeout);
    }, []);

    const data = [
        { label: 'Quality', value: 95, color: 'bg-[#22c55e]' },
        { label: 'Look', value: 96, color: 'bg-[#fbbf24]' },
        { label: 'Comfort', value: 91, color: 'bg-[#fb923c]' },
        { label: 'Fabric', value: 94, color: 'bg-[#a855f7]' },
        { label: 'Value', value: 87, color: 'bg-[#1e40af]' }
    ];

    return (
        <div className="bg-gray-50 p-6 font-sans">
            <div className="mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold text-gray-900">Customer Experience Insights</h1>
                    <p className="text-gray-600">Product Attribute Ratings (in %)</p>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <div className="absolute left-0 -top-7 h-36 flex flex-col justify-between text-sm text-gray-500 -ml-2 z-10">
                            <span>100</span>
                            <span>80</span>
                            <span>60</span>
                            <span>40</span>
                            <span>20</span>
                            <span>0</span>
                        </div>
                        <div className="ml-8 pl-4 border-l border-gray-300">
                            <div className="flex items-end justify-between h-36 relative z-0 px-8 perspective-[800px]">
                                {data.map((item, index) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-col items-center transform transition-transform duration-1000 ease-out hover:-translate-y-2"
                                        style={{
                                            transform: 'rotateX(10deg) rotateY(-10deg)',
                                            height: '100%',
                                        }}
                                    >
                                        <div
                                            className={`w-12 relative rounded-t ${item.color} origin-bottom group transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl`}
                                            style={{
                                                height: `${(animatedValues[index] / 100) * 160}px`,
                                                transitionDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                                                {animatedValues[index]}%
                                            </div>
                                            <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-10 transform rotate-x-[75deg] origin-top"></div>
                                        </div>
                                        <span className="text-xs text-gray-600 mt-3 text-center">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mt-4 text-sm text-gray-600">Attributes</div>
                    </div>
                </div>

                <div className="border-t p-4 mb-4 bg-yellow-50 rounded-lg">
                    <div className="text-center mb-2">
                        <div className="flex items-center justify-center mb-2">
                            <span className="text-3xl font-bold text-orange-600 mr-3">93%</span>
                            <span className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                                TRUSTABLE PRODUCT
                            </span>
                        </div>
                        <p className="text-gray-700 font-semibold">Average Customer Satisfaction Score</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                        <div className="text-center">
                            <div className="text-xl font-bold text-[#fbbf24]">96%</div>
                            <div className="text-sm text-gray-600">Look (Highest)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-[#22c55e]">95%</div>
                            <div className="text-sm text-gray-600">Quality</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-[#a855f7]">94%</div>
                            <div className="text-sm text-gray-600">Fabric Quality</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-[#1e40af]">87%</div>
                            <div className="text-sm text-gray-600">Value (Lowest)</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-orange-500 mr-2" />
                        <span className="text-gray-700 font-medium">
                            Outstanding ratings across all attributes - a truly trustable product customers love!
                        </span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-2 space-x-1">
                            <FontAwesomeIcon icon={faShoppingBag} className="text-orange-500 text-xl" />
                            <FontAwesomeIcon icon={faShoppingBag} className="text-red-500 text-xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Fast facts before you buy</h2>
                    </div>
                    <div className="space-y-4">
                        <Fact icon={faStar} color="text-yellow-500" label="Top Hits" description="96% of customers praise the look, quality (95%), and fabric (94%) — ideal for office wear and cooler days." />
                        <Fact icon={faTshirt} color="text-green-500" label="Comfort" description="91% find the shirt comfortable and perfect for daily wear." />
                        <Fact icon={faAward} color="text-blue-500" label="Quality" description="95% are impressed with the overall build quality and durability." />
                        <Fact icon={faLeaf} color="text-purple-500" label="Fabric" description="94% love the premium fabric quality and texture." />
                        <Fact icon={faDollarSign} color="text-green-600" label="Value" description="87% feel the premium quality fully justifies the price point." />
                    </div>
                </div>
            </div>
        </div>
    );
};

type FactProps = {
    icon: any;
    color: string;
    label: string;
    description: string;
};

const Fact: React.FC<FactProps> = ({ icon, color, label, description }) => (
    <div className="flex items-start">
        <FontAwesomeIcon icon={icon} className={`${color} text-lg mr-3 mt-1`} />
        <div>
            <span className="font-semibold">{label}:</span>{' '}
            <span className="text-gray-700">{description}</span>
        </div>
    </div>
);

export default CustomerExperienceInsights;
