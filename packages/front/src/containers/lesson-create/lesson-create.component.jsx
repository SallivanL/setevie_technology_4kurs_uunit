import { useMemo, useState } from 'react';
import { useDialogs } from 'react-dialogs-container';
import { useNavigate } from 'react-router-dom';
import { FormSpy } from 'react-final-form';
import { Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Form } from 'packages/front/src/components/form/index.js';
import { Button, Space, Typography } from '@bru-public/oc-ui';
import { AddWidgetDialog } from './dialog/index.js';
import './lesson-create.scss';

import {
  LessonCreateCenterWrapperAtom,
  LessonCreateFormAtom,
  LessonCreateLeftWrapperAtom,
  LessonCreateRightWrapperAtom,
  LessonCreateWidgetWrapperAtom,
} from './lesson-create.atoms.jsx';

export const LessonCreate = () => {
  const navigate = useNavigate();
  const { pushDialog } = useDialogs();

  const initialFormValues = useMemo(
    () => ({
      id: -1,
      data: [
        {
          id: 1,
          sectionName: 'Секция 1',
          widgets: [],
        },
      ],
    }),
    []
  );

  const [selectedSection, setSelectedSection] = useState(1);

  const handleDeleteSection = (e, sectionId, form) => {
    e.preventDefault();
    const currentSections = form.getState().values.data ?? [];
    const updatedSections = currentSections.filter((section) => section.id !== sectionId);

    form.change('data', updatedSections);

    if (selectedSection === sectionId) {
      setSelectedSection(updatedSections[0]?.id ?? null);
    }
  };

  const handleAddSection = (sections, form) => {
    const nextId = sections.reduce((maxId, section) => Math.max(maxId, section.id), 0) + 1;

    const newSection = {
      id: nextId,
      sectionName: `Секция ${nextId}`,
      widgets: [],
    };

    form.change('data', [...sections, newSection]);
    setSelectedSection(nextId);
  };

  return (
    <LessonCreateFormAtom initialValues={initialFormValues}>
      <FormSpy subscription={{ values: true }}>
        {({ values, form }) => {
          const sections = values?.data ?? [];
          const currentSection = sections.find((section) => section.id === selectedSection);

          const handleAddWidget = () => {
            pushDialog(AddWidgetDialog, {
              onAddWidget: (widget) => {
                const currentSections = form.getState().values.data ?? [];

                const updatedSections = currentSections.map((section) => {
                  if (section.id !== selectedSection) {
                    return section;
                  }

                  const widgets = section.widgets ?? [];

                  const nextWidgetId = widgets.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

                  return {
                    ...section,
                    widgets: [
                      ...widgets,
                      {
                        ...widget,
                        id: nextWidgetId,
                        type: 'text',
                      },
                    ],
                  };
                });

                form.change('data', updatedSections);
              },
            });
          };

          return (
            <>
              <LessonCreateLeftWrapperAtom>
                <Button label="Назад" onClick={() => navigate(-1)} />
              </LessonCreateLeftWrapperAtom>

              <LessonCreateCenterWrapperAtom>
                <Paper className="rounded-[28px] mb-4!" variant="section">
                  <Form.Input name={'name'} label={'Название урока'} />
                </Paper>
                <Space.Y gap="2">
                  {currentSection?.widgets?.map((widget) => (
                    <LessonCreateWidgetWrapperAtom key={widget.id}>
                      <Typography>{widget.name}</Typography>
                      <Typography>{widget.description}</Typography>
                    </LessonCreateWidgetWrapperAtom>
                  ))}
                  <Button type="primary" label="Добавить виджет" onClick={handleAddWidget} />
                </Space.Y>
              </LessonCreateCenterWrapperAtom>

              <LessonCreateRightWrapperAtom>
                <Space.Y gap="2">
                  {sections.map((section) => (
                    <div className={'flex w-full justify-between gap-2'}>
                      <Button
                        className={'w-full'}
                        label={section.sectionName}
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                      ></Button>
                      <Button outline onClick={(e) => handleDeleteSection(e, section.id, form)}>
                        <DeleteIcon fontSize={'small'} />
                      </Button>
                    </div>
                  ))}

                  <Button label="Добавить секцию" onClick={() => handleAddSection(sections, form)} />
                </Space.Y>
              </LessonCreateRightWrapperAtom>
            </>
          );
        }}
      </FormSpy>
    </LessonCreateFormAtom>
  );
};
