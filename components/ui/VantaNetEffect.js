"use client";
import { useEffect } from "react";
import Script from "next/script";

const VantaNetEffect = ({ containerId }) => {
  useEffect(() => {
    const loadVanta = () => {
      if (window.VANTA) {
        window.VANTA.NET({
          el: `#${containerId}`,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x000000, 
          color: 0x00ff00, 
          waveOpacity: 0.7, 
        });
      }
    };

    if (typeof window !== "undefined" && window.VANTA) {
      loadVanta();
    } else {
      const interval = setInterval(() => {
        if (window.VANTA) {
          clearInterval(interval);
          loadVanta();
        }
      }, 100);
    }

    return () => {
      if (window.VANTA && window.VANTA.current) window.VANTA.current.destroy();
    };
  }, [containerId]);

  return (
    <>
      {/* Add scripts for Three.js and Vanta */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js"
        strategy="afterInteractive"
      />
      
      <div
        id={containerId}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, 
        }}
      />
      
   
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9))",
          zIndex: -1, 
        }}
      />
    </>
  );
};

export default VantaNetEffect;
