export const userTypes = Object.freeze({
  teacher: 1,
  student: 2,
  admin: 3,
});

export const userTypeNames = Object.freeze({
  [userTypes.teacher]: 'Учитель',
  [userTypes.student]: 'Ученик',
  [userTypes.admin]: 'Администратор',
});
