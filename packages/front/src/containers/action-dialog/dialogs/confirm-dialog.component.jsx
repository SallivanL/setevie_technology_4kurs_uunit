import { InfoSquareIcon } from '@/components/icons/index.js';
import { ActionDialogComponent } from '../action-dialog.component.jsx';

export const ConfirmDialog = (props) => {
  const {
    closeDialog,
    title,
    subtitle,
    onConfirm,
    confirmLabel = 'Подтвердить',
    cancelLabel = 'Отмена',
    ...restProps
  } = props;

  return (
    <ActionDialogComponent
      {...restProps}
      onClose={closeDialog}
      title={title}
      subtitle={subtitle}
      icon={<InfoSquareIcon />}
      iconType="info"
      actions={[
        {
          label: cancelLabel,
          type: 'primary',
          onClick: closeDialog,
        },
        {
          label: confirmLabel,
          onClick: () => {
            onConfirm();
            closeDialog();
          },
        },
      ]}
    />
  );
};
