import { Outlet } from 'react-router-dom';
import { LayoutAtom, LayoutContainerAtom, LayoutHeaderAtom, LayoutMainContentAtom } from './layout.atoms.jsx';
import './layout.css';
import { Header } from 'packages/front/src/containers/header/index.js';

export const EmptyLayout = () => {
  return (
    <LayoutAtom>
      <LayoutContainerAtom>
        <LayoutHeaderAtom>
          <Header />
        </LayoutHeaderAtom>
        <LayoutMainContentAtom>
          <Outlet />
        </LayoutMainContentAtom>
      </LayoutContainerAtom>
    </LayoutAtom>
  );
};
