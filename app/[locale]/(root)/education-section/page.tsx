import React from 'react';

export default function CustomerTrustPage() {
  const groupedFeatures = [
    {
      titles: ['Visual Authenticity Validation', 'Inventory & Shipping Verification'],
      descriptions: [
        `We use AI models to analyze seller-uploaded images and verify them against product descriptions and brand visuals. Products that pass are marked with a 'Visually Verified' badge.`,
        `At fulfillment centers or seller hubs, timestamped photos and invoice checks ensure that items shipped match expectations. AI flags discrepancies before they reach the buyer.`
      ],
      image: '/images/visual-authenticity.png',
      bgColor: 'bg-gray-900',
      textColor: 'text-white',
      reverse: false
    },
    {
      titles: ['Anti-Fraud Customer Measures'],
      descriptions: [
        `Customers are empowered to confirm deliveries, record unboxings, or return instantly at doorstep. These checks reduce frauds like item-not-received and wardrobing.`
      ],
      image: '/images/fraud.png',
      bgColor: 'bg-blue-900',
      textColor: 'text-white',
      reverse: true
    },
    {
      titles: ['Review Authenticity & Visual Feedback'],
      descriptions: [
        `LLMs analyze text patterns, reviewer behavior, and timing anomalies to flag fake or AI-generated reviews. Customers are encouraged to upload genuine product images and unboxing videos, helping others visualize reality. Only authentic content remains.`
      ],
      image: '/images/review-authenticity.gif',
      bgColor: 'bg-yellow-200',
      textColor: 'text-gray-900',
      reverse: false
    },
    {
      titles: ['Seller & Product Trust Scoring'],
      descriptions: [
        `Sellers are scored based on return rates, complaints, and repeat customers, while products are rated by review consistency, return reasons, and satisfaction. For example, "96% said this matched the description" gives real insights to shoppers.`
      ],
      image: '/images/seller-score.jpg',
      bgColor: 'bg-rose-100',
      textColor: 'text-gray-900',
      reverse: true
    }
  ];

  const faqs = [
    {
      question: 'How is a product verified as authentic?',
      answer: 'Products are verified through image analysis, invoice matching, packaging check, and supplier source validation using AI tools.'
    },
    {
      question: 'What does the Seller Trust Score mean?',
      answer: 'It summarizes the seller’s credibility using complaint rates, return ratios, repeat customers, and resolution efficiency.'
    },
    {
      question: 'How do we ensure review authenticity?',
      answer: 'Reviews are filtered by language models to detect fake patterns and reviewers with suspicious behavior or return activity.'
    },
    {
      question: 'Can customers influence product trust data?',
      answer: 'Yes, by uploading images, unboxing videos, or marking accuracy, customers contribute directly to the visual and trust score of products.'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Amazon Customer Trust</h1>
          <nav className="space-x-6 text-sm text-gray-600 font-medium">
            <a href="" className="hover:text-violet-600 transition">Counterfeit Prevention</a>
            <a href="" className="hover:text-violet-600 transition">Review Integrity</a>
            <a href="" className="hover:text-violet-600 transition">Seller Reliability</a>
          </nav>
        </div>
      </header>

      <section className="py-20 pb-6 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
         <img 
  src="/images/heading3.png" 
  alt="Amazon Trust Banner"
  className="w-full object-contain"
/>


        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {groupedFeatures.map((group, index) => (
          <div
            key={index}
            className={`flex flex-col ${group.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-0 rounded-3xl overflow-hidden ${group.bgColor}`}
          >
            <div className="w-full lg:w-1/2 h-full">
              <img
                src={group.image}
                alt={group.titles.join(', ')}
               className="w-full max-w-md h-auto object-contain mx-auto"
              />
            </div>
            <div className={`p-10 lg:w-1/2 space-y-6 ${group.textColor}`}> 
              <div>
                <h3 className="text-2xl font-extrabold mb-3">
                  {group.titles[0].includes('Visual Authenticity') && 'Authenticity isn’t optional — it’s our standard'}
                  {group.titles[0].includes('Anti-Fraud') && 'Every Order is Watched and Every Fraud Attempt is stopped'}
                  {group.titles[0].includes('Review Authenticity') && 'Real Reviews, Real Peace of Mind'}
                  {group.titles[0].includes('Seller') && 'Trust That Tracks — Seller & Product Scoring Reinvented'}
                </h3>
              </div>
              {group.titles.map((title, i) => (
                <div key={i}>
                  <h4 className="text-lg font-semibold mb-2">{title}</h4>
                  <p className="text-sm leading-relaxed">{group.descriptions[i]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-violet-100 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h3 className="text-3xl font-bold text-violet-800 mb-2">Frequently Asked Questions</h3>
          <p className="text-violet-700">Clear answers to common concerns about our trust and verification mechanisms.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow rounded-xl p-5 text-left">
              <h4 className="text-lg font-semibold text-violet-800 mb-2">{faq.question}</h4>
              <p className="text-sm text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-blue-950 text-white text-sm py-6 text-center">
        &copy; 2025 Amazon Customer Trust. All rights reserved.
      </footer>
    </div>
  );
}
