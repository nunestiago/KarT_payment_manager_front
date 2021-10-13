function showPhone(e) {
  let value = e;

  value = value
    .replace(/\D/gu, '')
    .replace(/(?<frist>\d{2})(?<second>\d)/u, '($1) $2')
    .replace(/(?<second>\d{4})(?<third>\d)/u, '$1-$2')
    .replace(/(?<second>\d{4})-(?<third>\d)(?<fourth>\d{4})/u, '$1$2-$3')
    .replace(/(?<final>-\d{4})\d+?$/u, '$1');

  return value;
}

export default showPhone;
