import { bem, bm, withBem } from '@bru-public/oc-utils';

const infoBoxBem = 'info-box';

export const InfoBoxAtom = withBem(infoBoxBem, ({ type }) => bm(infoBoxBem, { [`type-${type}`]: type }), ['type'])(
  'div'
);
export const InfoBoxIconAtom = withBem(bem(infoBoxBem, 'icon'))('span');
export const InfoBoxCenterAtom = withBem(bem(infoBoxBem, 'center'))('div');
export const InfoBoxTopAtom = withBem(bem(infoBoxBem, 'top'))('div');
export const InfoBoxBottomAtom = withBem(bem(infoBoxBem, 'bottom'))('div');
export const InfoBoxRightAtom = withBem(bem(infoBoxBem, 'right'))('div');
