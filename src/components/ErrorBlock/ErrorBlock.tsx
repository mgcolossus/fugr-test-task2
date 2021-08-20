import React from 'react';

export const ErrorBlock: React.FC = ({children}) => {
  return (
    <div className="error-block">
      {children}
    </div>
  )
}
