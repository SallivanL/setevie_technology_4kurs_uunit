import { useDialogs } from 'react-dialogs-container';
import { InfoSquareIcon } from '@/components/icons/index.js';
import { useGetPhoneNumber } from '@/domains/feedback-form';
import { PhoneCallDialog, PhoneInputDialog } from '../../phone-dialog/index.js';
import { ActionDialogComponent } from '../action-dialog.component.jsx';

export const TariffDialog = ({ closeDialog, title, subtitle, ...restProps }) => {
  const { pushDialog } = useDialogs();
  const { refetch } = useGetPhoneNumber();

  const comment = 'Прошу включить интеграцию «Приём заказов по почте» в тариф';

  const handleDialogEnterPhone = async () => {
    const { data: phoneData } = await refetch();

    const dialogProps = {
      changePhoneUrl: phoneData?.change_phone_url,
      comment,
    };

    if (phoneData?.phone) {
      pushDialog(PhoneCallDialog, {
        ...dialogProps,
        phoneNumber: phoneData.phone,
      });
    } else {
      pushDialog(PhoneInputDialog, dialogProps);
    }

    closeDialog();
  };

  return (
    <ActionDialogComponent
      {...restProps}
      maxWidth="sm"
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
          label: 'Изменить тариф',
          type: 'primary',
          onClick: handleDialogEnterPhone,
        },
      ]}
    />
  );
};
