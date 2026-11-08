import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Paper,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import { Space } from '@bru-public/oc-ui';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@/components/form/index.js';
import { setSelectedStudentId } from '@/store/index.js';
import { useSelectedStudentId, useUserType } from '@/containers/user/index.js';
import { userTypes } from '@/domains/user/user.types.js';
import { useCreateStudentForTeacher, useGetTeacherStudents } from '@/domains/user/user.students.hooks.js';
import './select-student.css';

const getErrorMessage = (error) => error?.response?.data?.message ?? error?.message ?? 'Не удалось выполнить запрос';

export const SelectStudent = () => {
  const userType = useUserType();
  const savedStudentId = useSelectedStudentId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentsQuery = useGetTeacherStudents();
  const createStudent = useCreateStudentForTeacher();
  const [selectedStudentId, setSelectedStudentIdLocal] = useState(savedStudentId);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (
      studentsQuery.isSuccess &&
      selectedStudentId != null &&
      !studentsQuery.data.some((student) => student.id === selectedStudentId)
    ) {
      setSelectedStudentIdLocal(null);
      dispatch(setSelectedStudentId(null));
    }
  }, [dispatch, selectedStudentId, studentsQuery.data, studentsQuery.isSuccess]);

  if (userType !== userTypes.teacher) {
    const route =
      userType === userTypes.admin ? '/admin-page' : userType === userTypes.student ? '/list-lesson' : '/login';
    return <Navigate to={route} replace />;
  }

  const selectStudent = (studentId) => {
    setSelectedStudentIdLocal(studentId);
    dispatch(setSelectedStudentId(studentId));
  };

  const continueWithStudent = () => {
    if (selectedStudentId == null) return;
    dispatch(setSelectedStudentId(selectedStudentId));
    navigate('/list-lesson');
  };

  const handleCreateStudent = async ({ email, password }) => {
    try {
      const student = await createStudent.mutateAsync({ email, password });
      dispatch(setSelectedStudentId(student.id));
      navigate('/list-lesson');
    } catch {
      // TanStack Query сохраняет ошибку для отображения рядом с формой.
    }
  };

  return (
    <Box className="select-student" sx={{ maxWidth: 800 }}>
      <Paper className="select-student__paper" variant="default">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Выберите ученика
            </Typography>
            <Typography color="text.secondary">Выберите ученика, с которым будете работать в приложении.</Typography>
          </Box>

          {studentsQuery.isPending && (
            <Stack alignItems="center" py={4}>
              <CircularProgress aria-label="Загрузка учеников" />
            </Stack>
          )}

          {studentsQuery.isError && <Alert severity="error">{getErrorMessage(studentsQuery.error)}</Alert>}

          {studentsQuery.isSuccess && studentsQuery.data.length > 0 && (
            <Stack spacing={1.5}>
              {studentsQuery.data.map((student) => (
                <Card
                  key={student.id}
                  variant="outlined"
                  sx={{ borderColor: selectedStudentId === student.id ? 'primary.main' : undefined }}
                >
                  <CardActionArea onClick={() => selectStudent(student.id)}>
                    <Stack direction="row" alignItems="center" spacing={1} px={2} py={1}>
                      <Radio checked={selectedStudentId === student.id} inputProps={{ 'aria-label': student.email }} />
                      <Typography>{student.email}</Typography>
                    </Stack>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          )}

          <Stack spacing={2}>
            {!showCreateForm && (
              <Button variant="contained" onClick={() => setShowCreateForm(true)}>
                Добавить ученика
              </Button>
            )}
          </Stack>

          {showCreateForm && (
            <Form className="select-student__form" onSubmit={handleCreateStudent}>
              <Space.Y gap={4}>
                <Typography variant="h6">Новый ученик</Typography>
                <Space.Y gap={3}>
                  <Form.Input name="email" type="email" label="Email ученика" required autoComplete="email" />
                  <Form.Input
                    name="password"
                    type="password"
                    label="Пароль"
                    required
                    minLength={8}
                    maxLength={200}
                    autoComplete="new-password"
                  />
                </Space.Y>
                {createStudent.isError && <Alert severity="error">{getErrorMessage(createStudent.error)}</Alert>}
                <Form.Submit type="primary" className="w-full" disabled={createStudent.isPending}>
                  {createStudent.isPending ? 'Создание…' : 'Создать и продолжить'}
                </Form.Submit>
                <Button type="button" disabled={createStudent.isPending} onClick={() => setShowCreateForm(false)}>
                  Отмена
                </Button>
              </Space.Y>
            </Form>
          )}

          {studentsQuery.isSuccess && studentsQuery.data.length > 0 && (
            <Button variant="contained" disabled={selectedStudentId == null} onClick={continueWithStudent}>
              Продолжить
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
