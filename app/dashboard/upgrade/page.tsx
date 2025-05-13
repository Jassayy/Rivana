"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

const PricingPage = () => {
     const [isAnnual, setIsAnnual] = useState(true);

     const plans = [
          {
               name: "Free",
               description: "Try our basic features",
               monthlyPrice: 0,
               annualPrice: 0,
               features: [
                    "5 content generations per month",
                    "Basic AI models",
                    "Moderate support (6-7 days)",
               ],
               notIncluded: [
                    "Advanced AI models",
                    "Templates",
                    "Priority support",
                    "API access",
               ],
               cta: "Get Started Free",
               highlighted: false,
          },
          {
               name: "Pro",
               description: "Perfect for professionals",
               monthlyPrice: 29,
               annualPrice: 299,
               features: [
                    "100 content generations per month",
                    "Advanced AI models",
                    "Priority support (1-2 days)",
                    "10 templates",
                    "API access",
               ],
               notIncluded: [
                    "Unlimited generations",
                    "Unlimited templates",
                    "24/7 support",
               ],
               cta: "Start Free Trial",
               highlighted: true,
          },
          {
               name: "Enterprise",
               description: "For serious content creators",
               monthlyPrice: 79,
               annualPrice: 799,
               features: [
                    "Unlimited content generations",
                    "Advanced AI models",
                    "Unlimited templates",
                    "24/7 priority support",
                    "Dedicated account manager",
                    "Custom integrations",
                    "Team collaboration tools",
               ],
               notIncluded: [],
               cta: "Contact Sales",
               highlighted: false,
          },
     ];

     return (
          <div className="bg-gray-50 py-12 px-4 min-h-screen">
               <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                         <h1 className="text-4xl font-bold text-gray-900 mb-4">
                              Rivana paid plans pricing
                         </h1>
                         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                              Choose the perfect plan that fits you the best and
                              not make a hole in your pocket.
                         </p>

                         {/* Billing Toggle */}
                         <div className="mt-8 flex items-center justify-center">
                              <span
                                   className={`mr-4 text-sm ${
                                        isAnnual
                                             ? "text-gray-500"
                                             : "text-gray-900 font-medium"
                                   }`}
                              >
                                   Monthly
                              </span>
                              <button
                                   onClick={() => setIsAnnual(!isAnnual)}
                                   className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200"
                              >
                                   <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                                             isAnnual
                                                  ? "translate-x-7"
                                                  : "translate-x-1"
                                        }`}
                                   />
                              </button>
                              <span
                                   className={`ml-4 text-sm ${
                                        isAnnual
                                             ? "text-gray-900 font-medium"
                                             : "text-gray-500"
                                   }`}
                              >
                                   Annual{" "}
                                   <span className="text-green-500 font-medium">
                                        (Save 15%)
                                   </span>
                              </span>
                         </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                         {plans.map((plan, index) => (
                              <div
                                   key={index}
                                   className={`rounded-lg overflow-hidden shadow-lg ${
                                        plan.highlighted
                                             ? "ring-2 ring-blue-500 bg-white transform md:-translate-y-4"
                                             : "bg-white"
                                   }`}
                              >
                                   {plan.highlighted && (
                                        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                                             Most Popular
                                        </div>
                                   )}
                                   <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900">
                                             {plan.name}
                                        </h3>
                                        <p className="text-gray-500 mt-1">
                                             {plan.description}
                                        </p>
                                        <div className="mt-6 flex items-baseline">
                                             <span className="text-4xl font-extrabold text-gray-900">
                                                  $
                                                  {isAnnual
                                                       ? plan.annualPrice
                                                       : plan.monthlyPrice}
                                             </span>
                                             <span className="ml-1 text-xl font-medium text-gray-500">
                                                  /{isAnnual ? "year" : "month"}
                                             </span>
                                        </div>
                                        <button
                                             className={`mt-6 w-full py-3 px-4 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                                  plan.highlighted
                                                       ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                                                       : "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500"
                                             }`}
                                        >
                                             {plan.cta}
                                        </button>
                                   </div>

                                   <div className="border-t border-gray-200 px-6 py-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-4">
                                             What's included:
                                        </h4>
                                        <ul className="space-y-3">
                                             {plan.features.map(
                                                  (feature, i) => (
                                                       <li
                                                            key={i}
                                                            className="flex text-sm"
                                                       >
                                                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                                            <span className="text-gray-600">
                                                                 {feature}
                                                            </span>
                                                       </li>
                                                  )
                                             )}
                                             {plan.notIncluded.map(
                                                  (feature, i) => (
                                                       <li
                                                            key={i}
                                                            className="flex text-sm"
                                                       >
                                                            <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                                                            <span className="text-gray-400">
                                                                 {feature}
                                                            </span>
                                                       </li>
                                                  )
                                             )}
                                        </ul>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20 max-w-3xl mx-auto">
                         <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                              Frequently Asked Questions
                         </h2>
                         <div className="space-y-6">
                              <div>
                                   <h3 className="text-lg font-medium text-gray-900">
                                        What counts as a content generation?
                                   </h3>
                                   <p className="mt-2 text-gray-600">
                                        Each time you create an AI-generated
                                        piece of content (article, social post,
                                        email, etc.), it counts as one
                                        generation, regardless of length.
                                   </p>
                              </div>
                              <div>
                                   <h3 className="text-lg font-medium text-gray-900">
                                        What's the difference between basic and
                                        advanced AI models?
                                   </h3>
                                   <p className="mt-2 text-gray-600">
                                        Basic models handle simple content
                                        generation tasks, while advanced models
                                        offer higher quality output, better
                                        topic understanding, and more creative
                                        results.
                                   </p>
                              </div>
                              <div>
                                   <h3 className="text-lg font-medium text-gray-900">
                                        How do templates work?
                                   </h3>
                                   <p className="mt-2 text-gray-600">
                                        Templates allow you to save your
                                        favorite prompts and settings for quick
                                        reuse, saving time and ensuring
                                        consistent results.
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 bg-blue-600 rounded-lg text-center px-6 py-12">
                         <h2 className="text-2xl font-bold text-white mb-4">
                              Ready to generate amazing content?
                         </h2>
                         <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                              Join thousands of creators who are elevating their
                              content with our AI platform.
                         </p>
                         <div className="flex justify-center space-x-4">
                              <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium">
                                   Get Started Free
                              </button>
                              <button className="border border-white text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium">
                                   Contact Sales
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default PricingPage;
