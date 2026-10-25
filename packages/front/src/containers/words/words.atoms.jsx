import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';
import { Button } from '@bru-public/oc-ui';

const wordsBem = 'words';

export const WordsAtom = withBem(bem(wordsBem))('div');
export const WordsPaperAtom = withBem(bem(wordsBem, 'paper'))((props) => <Paper variant="default" {...props} />);

export const WordsItemsWrapperAtom = withBem(bem(wordsBem, 'items-wrapper'))('div');
export const WordItemWrapperAtom = withBem(bem(wordsBem, 'item-wrapper'))((props) => <Paper variant="section" {...props} />);

export const WordAddWordWrapperAtom = withBem(bem(wordsBem, 'add-button'))('div');
