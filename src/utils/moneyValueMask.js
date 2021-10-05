function moneyMask(e) {
  let { value } = e.currentTarget;

  value = value.replace(/[^0-9]./g, '');

  e.currentTarget.value = value;

  return e;
}

export default moneyMask;
