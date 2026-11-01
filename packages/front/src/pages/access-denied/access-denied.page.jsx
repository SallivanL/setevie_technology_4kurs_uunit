import { Space } from '@bru-public/oc-ui';
import { LockIcon } from '@/components/icons/index.js';
import {
  AccessDenied,
  AccessDeniedIconAtom,
  AccessDeniedPaper,
  AccessDeniedSubtitleAtom,
  AccessDeniedTitleAtom,
} from './access-denied.atoms.jsx';
import './access-denied.scss';

export const AccessDeniedPage = () => {
  return (
    <AccessDenied>
      <AccessDeniedPaper>
        <AccessDeniedIconAtom type="info">
          <LockIcon />
        </AccessDeniedIconAtom>
        <Space.Y gap="2">
          <AccessDeniedTitleAtom>Нет доступа</AccessDeniedTitleAtom>
          <AccessDeniedSubtitleAtom>Обратитесь к администратору</AccessDeniedSubtitleAtom>
        </Space.Y>
      </AccessDeniedPaper>
    </AccessDenied>
  );
};
