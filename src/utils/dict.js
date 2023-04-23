import _ from 'lodash';

const DictClass = (function () {
  let dict = null;
  return function () {
    if (dict) {
      return dict;
    }
    return (dict = this);
  };
})();

DictClass.prototype.init = async function () {
  const { data } = await httpCommonClient.post('/warning/v1.0/warning/basicData/dic/all', {});
  if (_.isNil(data) || data.code !== 200 || _.isNull(data.data)) {
    return;
  }
  return (this.dict = data.data);
};

DictClass.prototype.getCode = function (category) {
  try {
    return this.dict.filter((item) => item.categoryCode === category);
  } catch (error) {
    return [];
  }
};

DictClass.prototype.tranCode = function (code) {
  try {
    const item = this.dict.find((item) => item.code === code);
    return item.name;
  } catch (error) {
    return '';
  }
};

const Dict = new DictClass();
export default Dict;

export function getCode(code) {
  return Dict.getCode(code);
}

export function tranCode(code) {
  return Dict.tranCode(code);
}

export function optionsArr() {
  const options = [];
  Dict.getCode('remark_situation').map((item) => {
    options.push({
      name: item.name,
      code: item.code,
      children: Dict.getCode(item.code),
    });
  });
  return options;
}
