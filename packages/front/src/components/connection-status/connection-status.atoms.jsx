import { Typography } from '@bru-public/oc-ui';
import { bem, withBem } from '@bru-public/oc-utils';

const connectionStatusBem = 'connection-status';

export const ConnectionStatusAtom = withBem(bem(connectionStatusBem), (props) =>
  props.$status === 'connected' ? bem(connectionStatusBem, 'connected') : bem(connectionStatusBem, 'unconnected')
)('div');
export const ConnectionStatusIconAtom = withBem(bem(connectionStatusBem, 'icon'))('div');
export const ConnectionStatusLabelAtom = withBem(bem(connectionStatusBem, 'label'))(Typography.Caption2Strong);
