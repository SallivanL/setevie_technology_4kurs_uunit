import { useState } from 'react';
import { Button, Space, Typography } from '@bru-public/oc-ui';
import './lesson-view.scss';
import {
  LessonViewCenterWrapperAtom,
  LessonViewFormAtom,
  LessonViewLeftWrapperAtom,
  LessonViewRightWrapperAtom,
  LessonViewWidgetWrapperAtom,
} from './lesson-view.atoms.jsx';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';

export const LessonView = ({ lesson = [], lessonName }) => {
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState(null);
  const currentSection = lesson?.find((section) => section.id === selectedSection) ?? lesson?.[0];

  return (
    <LessonViewFormAtom>
      <LessonViewLeftWrapperAtom>
        <Button label={'Назад'} onClick={() => navigate(-1)} />
      </LessonViewLeftWrapperAtom>
      <LessonViewCenterWrapperAtom>
        <Paper className="rounded-[28px] mb-4!" variant="section">
          <Typography.Title2>{lessonName}</Typography.Title2>
        </Paper>
        <Space.Y gap={'1'}>
          {currentSection &&
            currentSection?.widgets.map((widget) => (
              <LessonViewWidgetWrapperAtom key={widget.id}>
                <Typography.Body2Stronger>{widget.name}</Typography.Body2Stronger>
                <Typography>{widget.description}</Typography>
              </LessonViewWidgetWrapperAtom>
            ))}
        </Space.Y>
      </LessonViewCenterWrapperAtom>
      <LessonViewRightWrapperAtom>
        <Space.Y gap={'2'}>
          {lesson.map((lesson) => (
            <Button key={lesson.id} label={lesson.sectionName} onClick={() => setSelectedSection(lesson.id)} />
          ))}
        </Space.Y>
      </LessonViewRightWrapperAtom>
    </LessonViewFormAtom>
  );
};
