import { CheckGravityIcon, StatusCircleExclamationIcon } from '../icons/index.js';
import {
  ConnectionStatusAtom,
  ConnectionStatusIconAtom,
  ConnectionStatusLabelAtom,
} from './connection-status.atoms.jsx';
import './connection-status.css';
import { TooltipHint } from '../tooltip-hint/index.js';

const STATUS_CONFIG = {
  connected: {
    label: 'Подключено',
    modifier: 'connected',
    icon: <CheckGravityIcon />,
  },

  not_connected: {
    label: 'Не удалось подключиться',
    modifier: 'unconnected',
    icon: <StatusCircleExclamationIcon />,
  },
};

export const ConnectionStatus = ({ status, tooltipText }) => {
  const config = STATUS_CONFIG[status];

  if (!config) return null;

  const content = (
    <ConnectionStatusAtom $status={status}>
      <ConnectionStatusIconAtom>{config.icon}</ConnectionStatusIconAtom>

      <ConnectionStatusLabelAtom>{config.label}</ConnectionStatusLabelAtom>
    </ConnectionStatusAtom>
  );

  if (!tooltipText) {
    return content;
  }

  return (
    <TooltipHint text={tooltipText} placement="top" arrow disableInteractive>
      {content}
    </TooltipHint>
  );
};
