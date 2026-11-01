import { DeleteIcon, TrashIcon } from '@/components/icons/index.js';
import { ActionDialogComponent } from '../action-dialog.component.jsx';

export const DeleteDialog = (props) => {
  const { onDelete, closeDialog, ...restProps } = props;

  return (
    <ActionDialogComponent
      {...restProps}
      onClose={closeDialog}
      icon={<DeleteIcon />}
      iconType={'danger'}
      title="Удалить"
      subtitle="Вы уверены?"
      actions={[
        {
          label: 'Нет',
          type: 'default',
          onClick: closeDialog,
        },
        {
          label: 'Да',
          type: 'danger',
          icon: <TrashIcon />,
          onClick: () => {
            onDelete();
            closeDialog();
          },
        },
      ]}
    />
  );
};
