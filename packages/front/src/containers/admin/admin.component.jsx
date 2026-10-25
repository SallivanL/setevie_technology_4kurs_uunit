import { Space, Typography } from '@bru-public/oc-ui';
import { Form } from 'packages/front/src/components/form/index.js';
import './admin.scss';
import { AdminAtom, AdminLeftWrapperAtom, AdminRightWrapperAtom, AdminUserAtom } from './admin.atoms.jsx';
import { InfoBox } from 'packages/front/src/components/info-box/index.js';

const users = [
  { id: 1, name: 'user1' },
  { id: 2, name: 'user2' },
  { id: 3, name: 'user3' },
  { id: 4, name: 'user4' },
];

export const Admin = () => {
  return (
    <AdminAtom>
      <AdminLeftWrapperAtom>
        <Space.Y gap={'4'}>
          <InfoBox text={'Выберите пользователя для настройки прав'} />
          <Space.Y gap={'1'}>
            {users.map((user) => (
              <AdminUserAtom>{user.name}</AdminUserAtom>
            ))}
          </Space.Y>
        </Space.Y>
      </AdminLeftWrapperAtom>
      <AdminRightWrapperAtom>
        <Form>
          <Space.Y gap={'3'}>
            <Form.Switch color="success" withBg name="hasBlocked" label={<span>Заблокирован</span>} />
            <Form.Select
              name="email_protocol"
              required
              label="Тариф"
              options={[
                { label: 'Бесплатный', value: '1' },
                { label: 'Plus', value: '2' },
                { label: 'Pro', value: '3' },
              ]}
              labelPath="label"
              valuePath="value"
              defaultValue={'imap'}
            />
          </Space.Y>
        </Form>
      </AdminRightWrapperAtom>
    </AdminAtom>
  );
};
