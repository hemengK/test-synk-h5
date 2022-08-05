export const ThousandNum = (num, fixed: number | undefined) => {
  if (!num) {
    num = 0;
  }
  if (fixed !== undefined) {
    num = Number(num).toFixed(fixed);
  }
  let [_i, _f] = num.toString().split('.');
  return _i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (_f ? '.' + _f : '');
};

export const GetDefaultLang = () => {
  const userAgent = navigator.userAgent;
  let regex = new RegExp(`Language/(.+?) `, 'g');
  let result;
  while ((result = regex.exec(userAgent)) != null) {
    if (result.length > 1) {
      return result[1];
    }
  }
  return navigator.language || '';
};
