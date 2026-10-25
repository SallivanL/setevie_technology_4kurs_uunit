import { bem, withBem } from '@bru-public/oc-utils';

const dialogBem = 'dialog';

export const DialogContentAtom = withBem(bem(dialogBem, 'content'))('div');
export const DialogCloseAtom = withBem(bem(dialogBem, 'close'))('div');
