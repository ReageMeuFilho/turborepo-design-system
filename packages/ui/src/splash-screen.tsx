"use client";

import React from "react";
import "./splash-screen.css";
// Import SVGs for Storybook
import logo from "./stories/assets/logo.svg";
import loadingIcon from "./stories/assets/loading-icon.svg";
import signalIcon from "./stories/assets/signal-icon.svg";
import wifiIcon from "./stories/assets/wifi-icon.svg";
import batteryIcon from "./stories/assets/battery-icon.svg";

export interface SplashScreenProps {
  /**
   * The current time to display in the status bar (default: "9:41")
   */
  time?: string;
  /**
   * Whether to show the loading indicator (default: true)
   */
  showLoading?: boolean;
  /**
   * Custom className for additional styling
   */
  className?: string;
  /**
   * Optional image URLs to override default imports (useful for Next.js)
   */
  images?: {
    logo?: string;
    loadingIcon?: string;
    signalIcon?: string;
    wifiIcon?: string;
    batteryIcon?: string;
  };
}

export const SplashScreen = ({
  time = "9:41",
  showLoading = true,
  className = "",
  images,
}: SplashScreenProps) => {
  // Use provided images, or imported SVGs (Storybook), or fall back to public paths (Next.js)
  const logoSrc = images?.logo || logo || "/splash-assets/logo.svg";
  const loadingIconSrc = images?.loadingIcon || loadingIcon || "/splash-assets/loading-icon.svg";
  const signalIconSrc = images?.signalIcon || signalIcon || "/splash-assets/signal-icon.svg";
  const wifiIconSrc = images?.wifiIcon || wifiIcon || "/splash-assets/wifi-icon.svg";
  const batteryIconSrc = images?.batteryIcon || batteryIcon || "/splash-assets/battery-icon.svg";
  return (
    <div
      className={`bg-black relative flex flex-col ${className}`}
      style={{ 
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0
      }}
      data-name="1_Dark_splash screen"
    >
      {/* Status Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6"
        data-name="Type=Status Bar, Theme=Light, Component=Top Bar"
      >
        {/* Time */}
        <div className="flex items-center">
          <span className="text-white text-base font-semibold leading-none tracking-[0.2px] font-['Urbanist',sans-serif]">
            {time}
          </span>
        </div>

        {/* Status Icons */}
        <div className="flex items-center gap-2">
          {/* Signal Icon */}
          <div className="w-[18px] h-[10px] flex items-center justify-center">
            <img
              src={signalIconSrc}
              alt="Signal"
              className="w-full h-full object-contain"
            />
          </div>

          {/* WiFi Icon */}
          <div className="w-[15.272px] h-[10.965px] flex items-center justify-center">
            <img
              src={wifiIconSrc}
              alt="WiFi"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Battery Icon */}
          <div className="w-[26.978px] h-[13px] flex items-center justify-center">
            <img
              src={batteryIconSrc}
              alt="Battery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="w-40 h-40 flex items-center justify-center shrink-0">
          <img
            src={logoSrc}
            alt="Cinemax Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* App Name */}
        <h1 className="text-white text-[40px] font-bold leading-[1.6] text-center whitespace-nowrap font-['Urbanist',sans-serif]">
          Cinemax
        </h1>
      </div>

      {/* Loading Indicator - Bottom */}
      {showLoading && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90px] h-[90px] flex items-center justify-center overflow-hidden">
          <img
            src={loadingIconSrc}
            alt="Loading"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

