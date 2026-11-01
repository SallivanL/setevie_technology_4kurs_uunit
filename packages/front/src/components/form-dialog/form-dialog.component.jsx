import { Dialog as BRUDialog } from '@bru-public/oc-ui';
import { IconButton } from '@mui/material';
import _ from 'lodash';
import { CloseIcon } from '@/components/icons/close.icon.jsx';
import './form-dialog.css';

const dialogStyles = {
  '& .MuiDialogContent-root': {
    padding: 0,
    borderRadius: 28,
  },
  '& .MuiDialog-paper': {
    backgroundColor: '#EBEFF5',
    '&:focus': {
      outline: 'none',
    },

    '&:focus-visible': {
      outline: 'none',
    },
  },
  '& .MuiDialogTitle-root': {
    fontWeight: '600',
    fontFamily: 'Raleway',
    fontSize: '24px',
    padding: 0,
  },
  '& .MuiDialog-container': {
    '& .MuiPaper-root.MuiDialog-paper': {
      scrollbarGutter: 'stable',
      overflowY: 'visible !important',
      '> div': {
        borderRadius: '24px',
        maxHeight: 'calc(100vh - 64px)',
        overflow: 'hidden', // убираем скролл с контейнера
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
};

export const FormDialog = (props) => {
  const { externalIcon = true, children, closable, sx = {}, ...restProps } = props;
  const { onClose } = props;

  const closableElement = externalIcon && (
    <div className="absolute -right-14 -top-0">
      <IconButton
        style={{ backgroundColor: '#0000004D', width: 44, height: 44 }}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );

  const styles = externalIcon ? _.merge({}, sx, dialogStyles) : sx;

  return (
    <BRUDialog {...restProps} closable={externalIcon ? false : closable} sx={styles}>
      {children}
      {closableElement}
    </BRUDialog>
  );
};
