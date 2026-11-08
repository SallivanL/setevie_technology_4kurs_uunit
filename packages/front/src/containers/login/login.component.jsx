import { Space, Typography } from '@bru-public/oc-ui';
import { LoginAtom, LoginPaper } from './login.atoms.jsx';
import './login.css';
import { Form } from '@/components/form/index.js';
import { apiService } from '@/api/api.service.js';
import { setUserData } from '@/store/index.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '@/containers/user/index.js';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({ email_address: emailAddress, password }) => {
    const result = await apiService.post('/auth/login', { email_address: emailAddress, password });
    apiService.setAccessToken(result.access_token);
    await dispatch(setUserData(result.user));

    // navigate('/list-lesson');
  };

  return (
    <LoginAtom>
      <LoginPaper>
        <Form key="form-key" onSubmit={handleLogin}>
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
