import React from 'react';

const Dot: React.FC<{ active: boolean }> = ({ active }) => {
  const style: React.CSSProperties = {
    backgroundColor: active ? '#00AB55' : '#637381',
    color: active ? '#00AB55' : '#637381',
    transform: active ? 'scale(2)' : '',
    borderRadius: '50%',
  };

  return <span className="block h-1  w-1 transition-transform duration-200" style={style} />;
};

export default Dot;
