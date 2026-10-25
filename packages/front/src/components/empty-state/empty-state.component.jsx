import { PlusMainIcon } from '../icons/index.js';
import { EmptyStateAtom, EmptyStateIconAtom, EmptyStateSubtitleAtom, EmptyStateTitleAtom } from './empty-state.atoms.jsx';
import './empty-state.css';

export const EmptyState = ({ title, subtitle }) => {
  return (
    <EmptyStateAtom>
      <EmptyStateIconAtom>
        <PlusMainIcon />
      </EmptyStateIconAtom>
      <EmptyStateTitleAtom>{title}</EmptyStateTitleAtom>
      <EmptyStateSubtitleAtom>{subtitle}</EmptyStateSubtitleAtom>
    </EmptyStateAtom>
  );
};
