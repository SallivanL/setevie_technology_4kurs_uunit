import { bem, withBem } from '@bru-public/oc-utils';

const actionDialogBem = 'action-dialog';

export const ActionDialogContentAtom = withBem(bem(actionDialogBem, 'content'))('div');

export const ActionDialogIconAtom = withBem(
  bem(actionDialogBem, 'icon'),
  ({ type }) => bem(actionDialogBem, 'icon', type),
  ['type']
)('div');

export const ActionDialogHeaderTitleAtom = withBem(bem(actionDialogBem, 'header-title'))('div');
export const ActionDialogTitleAtom = withBem(bem(actionDialogBem, 'title'))('div');
export const ActionDialogSubtitleAtom = withBem(bem(actionDialogBem, 'subtitle'))('div');
export const ActionDialogActionsAtom = withBem(bem(actionDialogBem, 'actions'))('div');
