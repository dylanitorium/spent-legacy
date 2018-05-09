import React from 'react';

const Flexed = ({ children, style }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>
    {children}
  </div>
);

export default Flexed;
