function cepMask(e) {
  let { value } = e.currentTarget;

  if (value.length <= 9) {
    value = value
      .replace(/\D/gu, '')
      .replace(/(?<frist>\d{5})(?<second>\d{1,2})/u, '$1-$2');

    e.currentTarget.value = value;

    return e;
  }
}
export default cepMask;
