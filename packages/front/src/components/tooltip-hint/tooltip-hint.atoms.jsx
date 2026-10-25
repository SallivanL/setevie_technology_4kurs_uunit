import { bem, withBem } from '@bru-public/oc-utils';
import { Tooltip } from '@mui/material';

const tooltipHintBem = 'tooltip-hint';

export const TooltipHintAtom = withBem(bem(tooltipHintBem))(Tooltip);

export const TooltipHintTitleAtom = withBem(bem(tooltipHintBem, 'title'))('span');
export const TooltipHintIconAtom = withBem(bem(tooltipHintBem, 'icon'))('div');
