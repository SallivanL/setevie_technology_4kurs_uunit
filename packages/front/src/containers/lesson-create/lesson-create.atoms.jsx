import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';
import { Form } from '@/components/form/index.js';

const lessonCreateBem = 'lesson-create';

export const LessonCreateFormAtom = withBem(bem(lessonCreateBem))(Form);
export const LessonCreateLeftWrapperAtom = withBem(bem(lessonCreateBem, 'left-wrap'))((props) => (
  <Paper variant="section" {...props} />
));
export const LessonCreateCenterWrapperAtom = withBem(bem(lessonCreateBem, 'center-wrap'))('div');

export const LessonCreateRightWrapperAtom = withBem(bem(lessonCreateBem, 'right-wrap'))((props) => (
  <Paper variant="section" {...props} />
));

export const LessonCreateWidgetWrapperAtom = withBem(bem(lessonCreateBem, 'widget-wrap'))((props) => (
  <Paper variant="section" {...props} />
));
