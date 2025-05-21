
import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Check, ChevronRight, BarChart3, PieChart, LayoutDashboard, Shield, Zap, LineChart, Users } from 'lucide-react';

interface DashboardScreenshotProps {
  className?: string;
}

export function DashboardScreenshot({ className = "" }: DashboardScreenshotProps) {
  return (
    <div className={`dashboard-screenshot-wrapper relative ${className}`}>
      {/* Main screenshot container with proper styling */}
      <div className="relative w-full h-full shadow-xl rounded-[16px] rounded-tr-[0px] overflow-hidden border border-white/10">
        {/* Dashboard UI recreation */}
        <div className="absolute inset-0 bg-white flex flex-col">
          {/* Top navigation */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
            <div className="flex space-x-8 text-sm text-gray-600">
              <span className="text-gray-800">Overview</span>
              <span>IT Plans</span>
              <span>Records</span>
              <span>Recent Activity</span>
              <span>Assessment</span>
            </div>
            <div className="ml-auto flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="text-xs">JS</span>
              </div>
            </div>
          </div>
          
          {/* Business Accelerator Content */}
          <div className="flex-grow bg-blue-600 p-4 text-white">
            {/* Header */}
            <div className="mb-4 flex items-center">
              <div className="bg-blue-700/50 px-2 py-1 rounded text-xs mr-3">
                Business Accelerator
              </div>
              <div className="bg-blue-700/50 px-2 py-1 rounded text-xs">
                IT Management
              </div>
              <button className="ml-auto bg-white/10 rounded-full p-1">
                <span className="sr-only">Close</span>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Main title */}
            <h2 className="text-xl mb-1">Transform your IT into a business accelerator</h2>
            <p className="text-white/80 text-xs mb-4">
              IThealth helps you leverage IT as a strategic advantage through comprehensive planning, efficient operations, proactive security, and innovative business acceleration.
            </p>
            
            {/* Main content grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Left column */}
              <div className="space-y-4">
                {/* Staffing Card */}
                <div className="bg-white rounded-lg p-3 text-gray-800">
                  <div className="flex items-center mb-2">
                    <Users size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Staffing</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Optimize your team's capabilities with targeted learning paths
                  </p>
                </div>
                
                {/* Security Card */}
                <div className="bg-white rounded-lg p-3 text-gray-800">
                  <div className="flex items-center mb-2">
                    <Shield size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Security</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Proactively protect your digital infrastructure
                  </p>
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-4">
                {/* Operations Card */}
                <div className="bg-white rounded-lg p-3 text-gray-800">
                  <div className="flex items-center mb-2">
                    <Zap size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Operations</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Align IT systems with your business objectives
                  </p>
                </div>
                
                {/* ROI Card */}
                <div className="bg-white rounded-lg p-3 text-gray-800">
                  <div className="flex items-center mb-2">
                    <BarChart3 size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">ROI</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Average savings of R74,500 per year with IThealth plans
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats section */}
            <div className="flex text-white mb-4">
              <div className="flex-1">
                <div className="text-xs text-white/80">Average ROI</div>
                <div className="text-xl">318%</div>
                <div className="text-xs text-white/80">Implementation Time</div>
                <div className="text-sm">4-8 weeks</div>
                <div className="text-xs text-white/80">Annual Savings</div>
                <div className="text-sm">R78,000+</div>
              </div>
              
              {/* Progress chart */}
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 rounded-full border-8 border-blue-500/30"></div>
                <div className="absolute inset-0 rounded-full border-8 border-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs">Progress</div>
                    <div className="text-lg font-medium">58%</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer tabs */}
            <div className="flex border-b border-white/20 mb-3">
              <div className="px-4 py-1 border-b-2 border-white text-sm">Operate</div>
              <div className="px-4 py-1 text-white/70 text-sm">Secure</div>
              <div className="px-4 py-1 text-white/70 text-sm">Streamline</div>
              <div className="px-4 py-1 text-white/70 text-sm">Accelerate</div>
            </div>
            
            {/* CTA Button */}
            <button className="bg-white text-blue-600 w-full py-2 rounded flex items-center justify-center text-sm">
              Start Your Acceleration
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        {/* Screen glare effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent z-10 pointer-events-none"></div>
        
        {/* Browser frame details */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900/80 rounded-t-[16px] flex items-center px-3 z-20">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto bg-gray-700/80 rounded-full px-4 py-0.5 text-gray-300 text-[9px]">
            app.ithealth.co.za
          </div>
        </div>
      </div>
      
      {/* Floating dot accent */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full blur-xl opacity-30 z-0"></div>
      
      {/* Shadow effect */}
      <div className="absolute -bottom-6 left-4 right-4 h-12 bg-blue-900/30 blur-xl rounded-full z-0"></div>
    </div>
  );
}
