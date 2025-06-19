'use client';
import React, { useRef, useState } from 'react';

export default function Returninsight() {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className="bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">

              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 ">Customer Return Insights</h1>
                <p className="text-gray-600">Product Return Attributes Ratings (in %)</p>
              </div>

              <div className="mb-6">
                <div className="relative h-[200px] mt-[20px] mb-0">
                  <div className="absolute left-0 top-0 h-[160] w-[40px] flex justify-between flex-col pt-[10px] pb-0">
                    <div className="text-xs text-gray-500">2%</div>
                    <div className="text-xs text-gray-500">1.5%</div>
                    <div className="text-xs text-gray-500">1%</div>
                    <div className="text-xs text-gray-500">0.5%</div>
                    <div className="text-xs text-gray-500">0%</div>
                  </div>

                  <div className="ml-[50px] h-[160px] relative border border-l-[2px] border-[#e5e7eb] border-b-[2px]">
                    <div className="flex h-[100%] items-end pt-0 pb-[20px] gap-[15px]">
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-green-500" style={{ height: "112px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-blue-500" style={{ height: "72px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-yellow-500" style={{ height: "40px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-orange-500" style={{ height: "24px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-purple-500" style={{ height: "16px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-blue-800" style={{ height: "16px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-teal-500" style={{ height: "24px" }}></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-[100%] border rounded-[4px 4px 0px 0px] min-h-[2px] bg-green-300" style={{ height: "8px" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-[50px] flex pt-0 pb-[5px] gap-[8px]">
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Too small</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Color mismatch</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Material issue</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Arrived late</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Wrong item sent</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Defective item</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Changed mind</div>
                  <div className="flex-1 text-center text-[11px] text-[#6b7280] transform -rotate-45 origin-center h-[10px] flex items-center justify-center">Item not as described</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="text-center mb-2">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-orange-600">3.9%</span>
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">LOW RETURN RATE</span>
                  </div>
                  <p className="text-gray-700 font-semibold">Overall Return Rate (out of 12,000+ orders)</p>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-2">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-500">1.4%</div>
                    <div className="text-sm text-gray-600">Too small</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-500">0.9%</div>
                    <div className="text-sm text-gray-600">Color mismatch</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-500">0.5%</div>
                    <div className="text-sm text-gray-600">Material issue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-500">1.1%</div>
                    <div className="text-sm text-gray-600">Other reasons</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-orange-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Normal for online retail - 96.1% of customers keep their orders</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Return Rate Classification</h3>
                  </div>

                  <div className="">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className='w-[120px]'>
                            <div className="font-semibold text-gray-900">&lt; 2.5%</div>
                            <div className="text-[10px] text-gray-600">Excellent retention, trusted product</div>
                          </div>
                          <div className="text-[10px] text-blue-600 font-medium text-right">Rarely Returned</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className='w-[120px]'>
                            <div className="font-semibold text-gray-900">2.5% - 5%</div>
                            <div className="text-[10px] text-gray-600">Normal for online products, still trustworthy</div>
                          </div>
                          <div className="text-[10px] text-blue-600 font-medium text-right">Low Return Rate</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className='w-[120px]'>
                            <div className="font-semibold text-gray-900">5% - 10%</div>
                            <div className="text-[10px] text-gray-600">Moderate returns, needs attention</div>
                          </div>
                          <div className="text-[10px] text-blue-600 font-medium text-right">Medium Return Rate</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className='w-[120px]'>
                            <div className="font-semibold text-gray-900">&gt; 10%</div>
                            <div className="text-[10px] text-gray-600">High returns, requires immediate action</div>
                          </div>
                          <div className="text-[10px] text-blue-600 font-medium text-right">High Return Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Key Return Insights</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                      <div>
                        <span className="font-semibold text-blue-600">Size Accuracy:</span>
                        <span className="text-gray-700"> Size issues account for 1.4% of returns - our detailed size guide helps 98.6% of customers get the perfect fit.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div>
                        <span className="font-semibold text-yellow-600">Quality Control:</span>
                        <span className="text-gray-700"> Only 0.2% defective items and 0.1% description mismatches ensure 99.7% product accuracy.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )}