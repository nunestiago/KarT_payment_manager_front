function cepMask(e) {
  let { value } = e.currentTarget;

  if (value.length <= 10) {
    value = value
      .replace(/\D/gu, '')
      .replace(/(?<frist>\d{2})(?<second>\d{1,2})/u, '$1-$2')
      .replace(/(?<frist>\d{3})(?<second>\d{1,2})/u, '$1.$2');

    e.currentTarget.value = value;

    return e;
  }
}
export default cepMask;
