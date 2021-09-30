function cpfMask(e) {
  let { value } = e.currentTarget;

  if (value.length <= 14) {
    value = value
      .replace(/\D/gu, '')
      .replace(/(?<frist>\d{3})(?<second>\d)/u, '$1.$2')
      .replace(/(?<frist>\d{3})(?<second>\d)/u, '$1.$2')
      .replace(/(?<frist>\d{3})(?<second>\d{1,2})/u, '$1-$2');

    e.currentTarget.value = value;

    return e;
  }
}

export default cpfMask;
