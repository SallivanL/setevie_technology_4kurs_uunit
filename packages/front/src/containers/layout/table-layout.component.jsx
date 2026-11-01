import { Outlet } from 'react-router-dom';
import { Header } from '@/containers/header/index.js';
import { LayoutAtom, LayoutContainerAtom, LayoutHeaderAtom, LayoutMainContentAtom } from './layout.atoms.jsx';
import './layout.css';
import { LayoutGrid } from './layout-grid.component.jsx';

export const TableLayout = () => {
  return (
    <LayoutAtom>
      <LayoutContainerAtom>
        <LayoutGrid />

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
