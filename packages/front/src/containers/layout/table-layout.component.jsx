import { Outlet } from 'react-router-dom';
import { Header } from 'packages/front/src/containers/header/index.js';
import { LayoutAtom, LayoutContainerAtom, LayoutHeaderAtom, LayoutMainContentAtom } from './layout.atoms.jsx';
import './layout.css';

export const TableLayout = () => {
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
