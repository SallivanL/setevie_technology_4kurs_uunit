import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';

const mainBem = 'main';
export const MainAtom = withBem(bem(mainBem))('div');

export const MainPaperAtom = withBem(bem(mainBem, 'paper'))((props) => <Paper variant="default" {...props} />);
