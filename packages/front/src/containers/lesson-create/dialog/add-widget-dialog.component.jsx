import { Dialog } from '@/components/dialog/index.js';
import { Form } from '@/components/form/index.js';
import { Space, Typography } from '@bru-public/oc-ui';

export const AddWidgetDialog = ({ closeDialog = () => {}, onAddWidget = () => {} }) => {
  const handleSubmit = (widget) => {
    onAddWidget(widget);
    closeDialog();
  };

  return (
    <Dialog onClose={closeDialog}>
      <Form
        className={'w-full p-3!'}
        onSubmit={handleSubmit}
        initialValues={{
          type: 'text',
          name: '',
          description: '',
        }}
      >
        <Space.Y gap="6">
          <Typography.Title2>Добавление виджета</Typography.Title2>

          <Space.Y gap="4">
            <Form.Input name="name" label="Название" />

            <Form.Input multiline placeholder={'Введите содержимое урока'} rows={10} name="description" label="Содержимое" />
          </Space.Y>

          <Form.Submit type="primary" label="Добавить" />
        </Space.Y>
      </Form>
    </Dialog>
  );
};
