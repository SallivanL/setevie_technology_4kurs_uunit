import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';

const adminBem = 'admin';

export const AdminAtom = withBem(bem(adminBem))('div');
export const AdminLeftWrapperAtom = withBem(bem(adminBem, 'left-wrap'))((props) => (
  <Paper variant="section" {...props} />
));
export const AdminRightWrapperAtom = withBem(bem(adminBem, 'right-wrap'))((props) => (
  <Paper variant="section" {...props} />
));

export const AdminUserAtom = withBem(bem(adminBem, 'user'))('div');

export const AdminPaper = withBem(bem(adminBem, 'paper'))((props) => <Paper variant="default" {...props} />);
export const AdminFormAtom = withBem(bem(adminBem, 'form'))('form');
export const AdminFieldAtom = withBem(bem(adminBem, 'field'))('div');
export const AdminLabelAtom = withBem(bem(adminBem, 'label'))('label');
export const AdminInputAtom = withBem(bem(adminBem, 'input'))('input');
