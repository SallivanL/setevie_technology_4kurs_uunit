import { Dialog as BRUDialog } from '@bru-public/oc-ui';
import { IconButton } from '@mui/material';
import _ from 'lodash';

import { CloseIcon } from '../icons/index.js';
import { DialogCloseAtom, DialogContentAtom } from './dialog.atoms.jsx';
import './dialog.scss';

const dialogStyles = {
  '& .MuiDialog-paper': {
    padding: '0 !important',
    '&:focus': {
      outline: 'none',
    },

    '&:focus-visible': {
      outline: 'none',
    },
  },

  '& .MuiDialogTitle-root': {
    padding: '0 !important',
  },
  '& .MuiDialogContent-root': {
    padding: '0 !important',
  },
  '& .MuiDialog-container': {
    '& .MuiPaper-root.MuiDialog-paper': {
      overflowY: 'visible !important',
      '> div': {
        borderRadius: '24px',
        maxHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
      },
    },
  },
};

export const Dialog = ({
  externalIcon = true,
  children,
  closable,
  maxWidth = 'sm',
  sx = {},
  onClose,
  ...restProps
}) => {
  const closableElement = externalIcon && (
    <DialogCloseAtom>
      <IconButton onClick={onClose} aria-label="Закрыть">
        <CloseIcon />
      </IconButton>
    </DialogCloseAtom>
  );

  const styles = externalIcon ? _.merge({}, sx, dialogStyles) : sx;

  return (
    <BRUDialog
      maxWidth={maxWidth}
      {...restProps}
      onClose={onClose}
      closable={externalIcon ? false : closable}
      sx={styles}
    >
      <DialogContentAtom>
        {children}
        {closableElement}
      </DialogContentAtom>
    </BRUDialog>
  );
};
