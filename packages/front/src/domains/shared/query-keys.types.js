export const lessonsKeys = {
  list: ['lessons'],
  lesson: (id) => ['lesson', Number(id)],
};

export const wordsKeys = {
  words: (studentId) => ['words', Number(studentId)],
  teachers: ['word-teachers'],
  students: ['word-students'],
  word: (id) => ['word', Number(id)],
};

export const usersKeys = {
  students: ['users', 'students'],
};
