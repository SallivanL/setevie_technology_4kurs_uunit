import { useDialogs } from 'react-dialogs-container';
import { Button, Space, Typography } from '@bru-public/oc-ui';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetWords } from 'packages/front/src/domains/words/words.queries.hooks.js';
import { useDeleteWordsWithCache } from 'packages/front/src/domains/words/words.hook.js';
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

  const { data: words = [], isFetching } = useGetWords();

  const { deleteWordsAsync } = useDeleteWordsWithCache();

  if (isFetching) return null;

  const handleAddWord = () => {
    pushDialog(AddWordDialog);
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
            <div className="flex items-stretch justify-center gap-4">
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
