import React from 'react';

const ErrorAlert = ({ message, onDismiss }) => (
  <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-3xl text-red-700 shadow-lg fade-in">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        <span className="font-medium">{message}</span>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-500 hover:text-red-700">×</button>
      )}
    </div>
  </div>
);

export default ErrorAlert;