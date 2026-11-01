import { InfoSquareIcon } from '@/components/icons/index.js';
import { ActionDialogComponent } from '../action-dialog.component.jsx';

export const InfoDialog = (props) => {
  const { closeDialog, title, subtitle } = props;
  return (
    <ActionDialogComponent
      {...props}
      onClose={closeDialog}
      title={title}
      subtitle={subtitle}
      icon={<InfoSquareIcon />}
      iconType="info"
      actions={[
        {
          label: 'Закрыть',
          onClick: closeDialog,
        },
      ]}
    />
  );
};
