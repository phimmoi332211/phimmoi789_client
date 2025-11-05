"use client";

import React from "react";

interface WrapperWithSlideProps {
  children: React.ReactNode;
}


export default function WrapperWithSlide({ children }: WrapperWithSlideProps) {
  return (
    <div className="wrapper-w-slide">
      {children}
    </div>
  );
} 