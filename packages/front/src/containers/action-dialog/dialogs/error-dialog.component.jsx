import { WarningIcon } from '@/components/icons/index.js';
import { ActionDialogComponent } from '../action-dialog.component.jsx';

export const ErrorDialog = (props) => {
  const { closeDialog, title, subtitle } = props;
  return (
    <ActionDialogComponent
      {...props}
      onClose={closeDialog}
      title={title}
      subtitle={subtitle}
      icon={<WarningIcon />}
      iconType="danger"
      actions={[
        {
          label: 'Закрыть',
          onClick: closeDialog,
        },
      ]}
    />
  );
};
