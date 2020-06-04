import React from 'react';

export function ContentContainer({ children }) {
  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      style={{ height: 'calc(100% - 65px)' }}
    >
      {children}
    </div>
  );
}
