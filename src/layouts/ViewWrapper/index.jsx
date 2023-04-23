import React from 'react';

function WrapperCreator(wrapperName) {
  function WrapperName(props) {
    const { className } = props;
    return <div className={`${wrapperName}${className ? ' ' + className : ''}`}>{props.children}</div>;
  }
  WrapperName.displayName = wrapperName;
  return WrapperName;
}

const ViewWrapper = WrapperCreator('ViewWrapper');
const FormArea = WrapperCreator('FormArea');
const ContentArea = WrapperCreator('ContentArea');
const OperArea = WrapperCreator('OperArea');

export { ViewWrapper, FormArea, OperArea, ContentArea };
