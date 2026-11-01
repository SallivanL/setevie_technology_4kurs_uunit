import { Space, Typography } from '@bru-public/oc-ui';
import { LoginAtom, LoginPaper } from './login.atoms.jsx';
import './login.css';
import { Form } from '@/components/form/index.js';

export const Login = () => {
  return (
    <LoginAtom>
      <LoginPaper>
        <Form key="form-key">
          <Space.Y gap={4}>
            <Space.Y gap={3}>
              <Form.Input name="email_address" required type={'email'} label="E-mail" placeholder="email@yandex.ru" />
              <Form.Input name="password" required type={'password'} label="Пароль" placeholder="email@yandex.ru" />
            </Space.Y>
            <Form.Submit type={'primary'} className={'w-full'}>
              <Typography.Body2>Войти</Typography.Body2>
            </Form.Submit>
          </Space.Y>
        </Form>
      </LoginPaper>
    </LoginAtom>
  );
};
