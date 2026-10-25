import { Typography } from '@bru-public/oc-ui';
import { bem, withBem } from '@bru-public/oc-utils';

const emptyStateBem = 'empty-state';
export const EmptyStateAtom = withBem(bem(emptyStateBem))('div');
export const EmptyStateIconAtom = withBem(bem(emptyStateBem, 'icon'))('div');
export const EmptyStateTitleAtom = withBem(bem(emptyStateBem, 'title'))(Typography.Body2Strong);
export const EmptyStateSubtitleAtom = withBem(bem(emptyStateBem, 'subtitle'))(Typography.Body1Strong);
