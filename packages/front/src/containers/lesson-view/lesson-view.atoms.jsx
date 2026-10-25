import { bem, withBem } from '@bru-public/oc-utils';
import { Paper } from '@mui/material';
import { Form } from 'packages/front/src/components/form/index.js';

const lessonViewBem = 'lesson-view';

export const LessonViewFormAtom = withBem(bem(lessonViewBem))(Form);
export const LessonViewLeftWrapperAtom = withBem(bem(lessonViewBem, 'left-wrap'))((props) => (
  <Paper variant="section" {...props} />
));
export const LessonViewCenterWrapperAtom = withBem(bem(lessonViewBem, 'center-wrap'))('div');
export const LessonViewRightWrapperAtom = withBem(bem(lessonViewBem, 'right-wrap'))((props) => (
  <Paper variant="section" {...props} />
));

export const LessonViewWidgetWrapperAtom = withBem(bem(lessonViewBem, 'widget-wrap'))((props) => (
  <Paper variant="section" {...props} />
));
