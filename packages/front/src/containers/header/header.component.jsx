import { Button } from '@bru-public/oc-ui';
import { useDialogs } from 'react-dialogs-container';
import { HeaderAtom, HeaderLogoutAtom, HeaderNavItemsAtom, HeaderPaper, HeaderWrapAtom } from './header.atoms.jsx';
import './header.css';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUserType } from '@/containers/user/index.js';

const navigationRoutes = [
  { route: '/list-lesson', label: 'Уроки' },
  { route: '/create-lesson', label: 'Создание уроков' },
  { route: '/words', label: 'Словарь' },
];

export const Header = () => {
  const userType = useUserType();

  return (
    <HeaderAtom>
      <HeaderPaper>
        <HeaderWrapAtom>
          {userType && (
            <HeaderNavItemsAtom>
              {navigationRoutes.map((item) => (
                <Link key={item.route} to={item.route}>
                  <Button label={item.label} />
                </Link>
              ))}
            </HeaderNavItemsAtom>
          )}

          <Link to="/login">
            <HeaderLogoutAtom>
              <LogoutIcon />
            </HeaderLogoutAtom>
          </Link>
        </HeaderWrapAtom>
      </HeaderPaper>
    </HeaderAtom>
  );
};
