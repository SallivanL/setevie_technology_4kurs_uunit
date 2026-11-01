import { Button, Space } from '@bru-public/oc-ui';
import _ from 'lodash';
import { Dialog } from '@/components/dialog/index.js';
import './action-dailog.scss';
import {
  ActionDialogActionsAtom,
  ActionDialogContentAtom,
  ActionDialogHeaderTitleAtom,
  ActionDialogIconAtom,
  ActionDialogSubtitleAtom,
  ActionDialogTitleAtom,
} from './action-dialog.atoms.js';

const dialogStyles = {
  '& .MuiDialog-paper': {
    padding: '0 !important',
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

export const ActionDialogComponent = ({
  externalIcon = true,
  closable,
  maxWidth = 'sm',
  sx = {},
  onClose,
  headerTitle,
  title,
  subtitle,
  icon,
  iconType,
  actions = [],
  ...restProps
}) => {
  const styles = externalIcon ? _.merge({}, sx, dialogStyles) : sx;

  return (
    <Dialog maxWidth={maxWidth} {...restProps} onClose={onClose} closable={externalIcon ? false : closable} sx={styles}>
      <>
        <ActionDialogContentAtom>
          {headerTitle && <ActionDialogHeaderTitleAtom>{headerTitle}</ActionDialogHeaderTitleAtom>}

          {icon && <ActionDialogIconAtom type={iconType}>{icon}</ActionDialogIconAtom>}

          <Space.Y gap="3">
            {title && <ActionDialogTitleAtom>{title}</ActionDialogTitleAtom>}
            {subtitle && <ActionDialogSubtitleAtom>{subtitle}</ActionDialogSubtitleAtom>}
          </Space.Y>

          {!!actions.length && (
            <ActionDialogActionsAtom>
              {actions.map((action, index) => (
                <Button key={index} size="big" block {...action} />
              ))}
            </ActionDialogActionsAtom>
          )}
        </ActionDialogContentAtom>
      </>
    </Dialog>
  );
};
