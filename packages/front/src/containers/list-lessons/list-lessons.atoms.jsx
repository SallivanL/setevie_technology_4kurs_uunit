import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';

const listLessonsBem = 'list-lessons';

export const ListLessonsAtom = withBem(bem(listLessonsBem))('div');
export const ListLessonsPaperAtom = withBem(bem(listLessonsBem, 'paper'))((props) => (
  <Paper variant="section" {...props} />
));
export const ListLessonItemAtom = withBem(bem(listLessonsBem, 'item'))('div');
