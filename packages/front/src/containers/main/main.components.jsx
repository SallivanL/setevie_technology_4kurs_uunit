import { MainAtom, MainPaperAtom } from './main.atoms.jsx';
import './main.css';

export const Main = ({ children }) => {
  return (
    <MainAtom>
      <MainPaperAtom>{children}</MainPaperAtom>
    </MainAtom>
  );
};
