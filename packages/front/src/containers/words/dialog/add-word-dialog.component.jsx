import { Dialog } from 'packages/front/src/components/dialog/index.js';
import { Space, Typography } from '@bru-public/oc-ui';
import { Form } from 'packages/front/src/components/form/index.js';
import { useCreateWordsWithCache } from 'packages/front/src/domains/words/words.hook.js';
import { englishOnly, russianOnly } from './validators.helper.js';

export const AddWordDialog = ({ closeDialog = () => {} }) => {
  const { createWordAsync } = useCreateWordsWithCache();

  const handleCreateWord = async (word) => {
    await createWordAsync(word);
    closeDialog();
  };

  return (
    <Dialog onClose={closeDialog}>
      <Form className={'w-full p-3!'} onSubmit={handleCreateWord} initialValues={{ id: -1 }}>
        <Space.Y gap={'6'}>
          <Typography.Title2>Добавьте новое слово</Typography.Title2>
          <Space.Y gap={'4'}>
            <Form.Input validate={englishOnly()} name={'english'} label={'Слово на английском'} />
            <Form.Input validate={russianOnly()} name={'russian'} label={'Перевод на русском'} />
          </Space.Y>
          <Form.Submit type="primary" label={'Добавить'} />
        </Space.Y>
      </Form>
    </Dialog>
  );
};
