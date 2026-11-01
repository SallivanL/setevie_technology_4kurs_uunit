import { InfoSquareIcon } from '@/components/icons/index.js';
import { ActionDialogComponent } from '../action-dialog.component.jsx';

export const StandardDialog = (props) => {
  const { closeDialog, title, subtitle, actionBtnTitle = 'Запустить', actionCallback, ...restProps } = props;
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
          label: 'Закрыть',
          onClick: closeDialog,
        },
        {
          label: actionBtnTitle,
          type: 'primary',
          variant: 'contained',
          onClick: actionCallback,
        },
      ]}
    />
  );
};
