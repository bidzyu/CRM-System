import { Cancel, Done, Editing, Trash } from '../icons';

interface EditingBtnsProps {
  stopEditing: () => void;
  startEditing: () => void;
  cancelEditing: () => void;
  onDelete: () => void;
  isEditing: boolean;
}

export const EditingBtns: React.FC<EditingBtnsProps> = ({
  startEditing,
  stopEditing,
  cancelEditing,
  onDelete,
  isEditing,
}) => {
  return (
    <>
      {' '}
      {isEditing ? (
        <button onClick={stopEditing}>
          <Done />{' '}
        </button>
      ) : (
        <button onClick={startEditing}>
          <Editing />
        </button>
      )}
      {isEditing ? (
        <button onClick={cancelEditing}>
          <Cancel />
        </button>
      ) : (
        <button onClick={onDelete}>
          <Trash />
        </button>
      )}
    </>
  );
};
