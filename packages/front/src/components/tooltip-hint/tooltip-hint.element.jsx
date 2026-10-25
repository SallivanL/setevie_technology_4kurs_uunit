import { InfoIcon } from 'packages/front/src/components/icons/index.js';
import { TooltipHintAtom, TooltipHintIconAtom, TooltipHintTitleAtom } from './tooltip-hint.atoms.jsx';
import './tooltip-hint.css';

export const TooltipHint = ({ text, icon = <InfoIcon />, position = 'top', children, ...props }) => {
  return (
    <TooltipHintAtom
      title={<TooltipHintTitleAtom>{text}</TooltipHintTitleAtom>}
      placement={position}
      arrow
      disableInteractive
      {...props}
    >
      {children ?? <TooltipHintIconAtom>{icon}</TooltipHintIconAtom>}
    </TooltipHintAtom>
  );
};
