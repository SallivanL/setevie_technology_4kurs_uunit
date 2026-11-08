import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersKeys } from '@/domains/shared/query-keys.types.js';
import { apiService } from '@/api/api.service.js';

export const useGetTeacherStudents = () =>
  useQuery({
    queryKey: usersKeys.students,
    queryFn: () => apiService.get('/words/students'),
  });

export const useCreateStudentForTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student) => apiService.post('/users/students', student),
    onSuccess: (student) => {
      queryClient.setQueryData(usersKeys.students, (students = []) => [...students, student]);
    },
  });
};
