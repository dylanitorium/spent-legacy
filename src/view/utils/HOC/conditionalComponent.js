import React from 'react';

const conditionalComponent = WrappedComponent => {
  const conditionalComponentInternal = (props) => {
    const { visible, ...passThroughProps } = props;
    const isVisible = typeof visible === 'function' ? visible() : visible;
    return isVisible ? <WrappedComponent {...passThroughProps} /> : null;
  };

  return conditionalComponentInternal;
}

export default conditionalComponent;
