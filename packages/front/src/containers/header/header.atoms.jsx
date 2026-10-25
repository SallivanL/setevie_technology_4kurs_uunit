import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';
import { Button } from '@bru-public/oc-ui';

const headerBem = 'header';
export const HeaderAtom = withBem(bem(headerBem))('div');

export const HeaderPaper = withBem(bem(headerBem, 'paper'))((props) => <Paper variant="default" {...props} />);

export const HeaderWrapAtom = withBem(bem(headerBem, 'wrap'))('div');
export const HeaderNavItemsAtom = withBem(bem(headerBem, 'nav-items'))('div');
export const HeaderLogoutAtom = withBem(bem(headerBem, 'logout'))(Button);
