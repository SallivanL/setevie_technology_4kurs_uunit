import { Outlet } from 'react-router-dom';
import { LayoutAtom, LayoutContainerAtom } from './layout.atoms.jsx';
import './layout.css';

export const ErrorLayout = () => {
  return (
    <LayoutAtom>
      <LayoutContainerAtom>
        <Outlet />
      </LayoutContainerAtom>
    </LayoutAtom>
  );
};
