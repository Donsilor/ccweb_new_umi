import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

function Trend({ flag, children }) {
  return (
    <div style={styleWrapper}>
      <span style={flag === 'up' ? styleUp : styleDown}>{children}</span>
      {flag === 'up' ? <CaretUpOutlined style={styleUp} /> : <CaretDownOutlined style={styleDown} />}
    </div>
  );
}

export default Trend;

const styleWrapper = {
  display: 'inline-block',
};
const styleUp = { fontSize: 14, color: 'red' };
const styleDown = { fontSize: 14, color: 'green' };
