import { Typography } from '@bru-public/oc-ui';
import { bem, withBem } from '@bru-public/oc-utils';

const accessDeniedBem = 'access-denied';

export const AccessDenied = withBem(bem(accessDeniedBem))('div');

export const AccessDeniedPaper = withBem(bem(accessDeniedBem, 'paper'))('div');
export const AccessDeniedIconAtom = withBem(
  bem(accessDeniedBem, 'icon'),
  ({ type }) => bem(accessDeniedBem, 'icon', type),
  ['type']
)('div');

export const AccessDeniedTitleAtom = withBem(bem(accessDeniedBem, 'title'))(Typography.Body2Strong);

export const AccessDeniedSubtitleAtom = withBem(bem(accessDeniedBem, 'subtitle'))(Typography.Body2Strong);
