import { Button } from '@bru-public/oc-ui';
import { useDialogs } from 'react-dialogs-container';
import { HeaderAtom, HeaderLogoutAtom, HeaderNavItemsAtom, HeaderPaper, HeaderWrapAtom } from './header.atoms.jsx';
import './header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUserType } from '@/containers/user/index.js';
import { userTypes } from '@/domains/user/user.types.js';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/index.js';
import { hasRole } from '@/utils/index.js';

const navigationRoutes = [
  { route: '/list-lesson', label: 'Уроки', roles: [userTypes.teacher, userTypes.student] },
  { route: '/create-lesson', label: 'Создание уроков', roles: [userTypes.teacher] },
  { route: '/words', label: 'Словарь', roles: [userTypes.teacher, userTypes.student] },
];

export const Header = () => {
  const userType = useUserType();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleExit = () => {
    if (userType === userTypes.teacher && location.pathname !== '/select-student') {
      navigate('select-student');
      return;
    }
    dispatch(logout);
    navigate('/login');
  };

  return (
    <HeaderAtom>
      <HeaderPaper>
        <HeaderWrapAtom>
          {userType && (
            <HeaderNavItemsAtom>
              {navigationRoutes
                .filter((item) => hasRole(userType, item.roles))
                .map((item, index) => (
                  <Link key={item.route} to={item.route}>
                    <Button label={item.label} sx={{ width: index !== 1 ? '185px' : '282px' }} />
                  </Link>
                ))}
            </HeaderNavItemsAtom>
          )}

          <div onClick={handleExit}>
            <HeaderLogoutAtom sx={{ width: '88px' }}>
              <LogoutIcon />
            </HeaderLogoutAtom>
          </div>
        </HeaderWrapAtom>
      </HeaderPaper>
    </HeaderAtom>
  );
};
