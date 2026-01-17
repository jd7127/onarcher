'use client';

import { useState } from 'react';
import { ArrowRight, Building2, Users } from 'lucide-react';

interface LandingPageProps {
  onStart: (userType: 'broker' | 'customer') => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            On<span className="text-blue-600">Archer</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            SBA Loan Pre-Qualification in Minutes
          </p>
          <p className="text-lg text-gray-500">
            Powered by ARCHI - Automated Risk, Cashflow & Human-in-the-loop Intelligence
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Get Pre-Qualified for Your SBA Loan
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Chat with ARCHI</h3>
              <p className="text-gray-600 text-sm">Conversational AI guides you through the process</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Analysis</h3>
              <p className="text-gray-600 text-sm">AI-powered underwriting in real-time</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Bank Match</h3>
              <p className="text-gray-600 text-sm">Automatically matched with SBA lenders</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            How are you applying today?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => onStart('broker')}
              className="group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-8 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Users className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">I'm a Broker</h4>
              <p className="text-gray-600 mb-4">
                Helping a client get SBA financing
              </p>
              <div className="flex items-center justify-center text-blue-600 font-semibold">
                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => onStart('customer')}
              className="group bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-500 rounded-xl p-8 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Building2 className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">I'm a Business Owner</h4>
              <p className="text-gray-600 mb-4">
                Seeking SBA financing for my business
              </p>
              <div className="flex items-center justify-center text-green-600 font-semibold">
                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="mb-4">✓ No commitment required  •  ✓ Secure & confidential  •  ✓ Fast pre-qualification</p>
        </div>
      </div>
    </div>
  );
}
