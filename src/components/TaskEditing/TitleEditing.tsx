import style from './titleEditing.module.scss';

interface TitleEditingProps {
  isEditing: boolean;
  itemText: string;
  setItemText: (s: string) => void;
  checked: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onBlur: () => void;
  error: string | null;
}

export const TitleEditing: React.FC<TitleEditingProps> = ({
  isEditing,
  itemText,
  setItemText,
  checked,
  inputRef,
  onBlur,
  error,
}) => {
  return (
    <div className={style.inputWrapper}>
      {' '}
      {isEditing ? (
        <>
          {' '}
          <input
            ref={inputRef}
            value={itemText}
            onBlur={onBlur}
            onChange={(e) => setItemText(e.target.value)}
            className={style.input}
          />
          {error && <div className={style.validateError}>{error}</div>}
        </>
      ) : (
        <p className={style[checked ? 'titleActive' : 'title']}>{itemText}</p>
      )}
    </div>
  );
};
