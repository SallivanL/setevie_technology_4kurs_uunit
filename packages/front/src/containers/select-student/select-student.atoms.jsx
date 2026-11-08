import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';

const loginBem = 'login';

export const LoginAtom = withBem(bem(loginBem))('div');
export const LoginPaper = withBem(bem(loginBem, 'paper'))((props) => <Paper variant="default" {...props} />);
