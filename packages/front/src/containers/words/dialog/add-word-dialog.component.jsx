import { Dialog } from '@/components/dialog/index.js';
import { Space, Typography } from '@bru-public/oc-ui';
import { Form } from '@/components/form/index.js';
import { useCreateWordsWithCache } from '@/domains/words/words.hook.js';
import { useGetWordTeachers } from '@/domains/words/words.queries.hooks.js';
import { useGetWordStudents } from '@/domains/words/words.queries.hooks.js';
import { englishOnly, russianOnly } from './validators.helper.js';

export const AddWordDialog = ({ closeDialog = () => {} }) => {
  const { createWordAsync } = useCreateWordsWithCache();
  const { data: teachers = [] } = useGetWordTeachers();
  const { data: students = [] } = useGetWordStudents();

  const handleCreateWord = async (word) => {
    const data = { ...word };
    if (teachers.length === 1 && !data.teacher_id) data.teacher_id = teachers[0].id;
    if (data.student_id === '') data.student_id = null;
    await createWordAsync(data);
    closeDialog();
  };

  return (
    <Dialog onClose={closeDialog}>
      <Form className={'w-full p-3!'} onSubmit={handleCreateWord} initialValues={{ id: -1 }}>
        <Space.Y gap={'6'}>
          <Typography.Title2>Добавьте новое слово</Typography.Title2>
          <Space.Y gap={'4'}>
            {teachers.length > 1 && (
              <Form.Select
                name="teacher_id"
                required
                label="Учитель"
                options={teachers.map((teacher) => ({ label: teacher.email, value: teacher.id }))}
                labelPath="label"
                valuePath="value"
              />
            )}
            {students.length > 0 && (
              <Form.Select
                name="student_id"
                label="Ученик (необязательно)"
                options={[{ label: 'Общий словарь', value: '' }, ...students.map((student) => ({ label: student.email, value: student.id }))]}
                labelPath="label"
                valuePath="value"
              />
            )}
            <Form.Input validate={englishOnly()} name={'english'} label={'Слово на английском'} />
            <Form.Input validate={russianOnly()} name={'russian'} label={'Перевод на русском'} />
          </Space.Y>
          <Form.Submit type="primary" label={'Добавить'} />
        </Space.Y>
      </Form>
    </Dialog>
  );
};
