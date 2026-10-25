export const formatPhone = (phone) => {
  let digits = phone.replace(/^8/, '7').replace(/[^\d]+/, '');
  if (digits.length < 11) {
    return phone;
  }

  // Домашний?
  if (digits.slice(0, 2) === '74') {
    // Для белгородских (и похожих) домашних возвращаем нормальное форматирование
    // Для остальных пытаемся
    return digits.slice(0, 3) === '747'
      ? digits.replace(/^(\d)(\d+)(\d\d)(\d\d)(\d\d)$/, '+$1 ($2) $3‒$4‒$5')
      : digits.replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1 ($2) $3‒$4‒$5');
  }

  // Для русских мобильных возвращаем нормальное форматирование
  // Для остальных пытаемся
  return digits.slice(0, 2) === '79'
    ? digits.replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1 ($2) $3‒$4‒$5')
    : digits.replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1$2 $3‒$4‒$5');
};
