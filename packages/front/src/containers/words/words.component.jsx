import { useDialogs } from 'react-dialogs-container';
import { Button, Typography } from '@bru-public/oc-ui';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate } from 'react-router-dom';
import { userTypes } from '@/domains/user/user.types.js';
import { useSelectedStudentId, useUserData, useUserType } from '@/containers/user/index.js';
import { useGetWords } from '@/domains/words/words.queries.hooks.js';
import { useDeleteWordsWithCache } from '@/domains/words/words.hook.js';
import { AddWordDialog } from './dialog/index.js';

import {
  WordsAtom,
  WordsPaperAtom,
  WordItemWrapperAtom,
  WordsItemsWrapperAtom,
  WordAddWordWrapperAtom,
} from './words.atoms.jsx';
import './words.scss';

export const Words = () => {
  const { pushDialog } = useDialogs();
  const userType = useUserType();
  const user = useUserData();
  const selectedStudentId = useSelectedStudentId();
  const studentId = userType === userTypes.teacher ? selectedStudentId : userType === userTypes.student ? user?.id : null;
  const { data: words = [], isFetching, isError } = useGetWords(studentId);
  const { deleteWordsAsync } = useDeleteWordsWithCache(studentId);

  if (userType === userTypes.teacher && studentId == null) return <Navigate to="/select-student" replace />;

  if (isFetching) return null;
  if (isError) return <Typography>Не удалось загрузить слова.</Typography>;

  const handleAddWord = () => {
    pushDialog(AddWordDialog, { studentId, userType });
  };

  const handleDeleteWord = async (id) => {
    await deleteWordsAsync(id);
  };

  return (
    <WordsAtom>
      <WordsPaperAtom>
        <Typography.Title1>Словарь</Typography.Title1>
        <WordsItemsWrapperAtom>
          {words.map((word) => (
            <div className="flex items-stretch justify-center gap-2">
              <WordItemWrapperAtom key={word.id}>
                <Typography.Body1Stronger>{word.english}</Typography.Body1Stronger>
                <Typography.Body1Stronger>{word.russian}</Typography.Body1Stronger>
              </WordItemWrapperAtom>
              <Button onClick={() => handleDeleteWord(word.id)}>
                <DeleteIcon />
              </Button>
            </div>
          ))}
        </WordsItemsWrapperAtom>

        <WordAddWordWrapperAtom>
          <Button onClick={handleAddWord}>Добавить слово</Button>
        </WordAddWordWrapperAtom>
      </WordsPaperAtom>
    </WordsAtom>
  );
};
