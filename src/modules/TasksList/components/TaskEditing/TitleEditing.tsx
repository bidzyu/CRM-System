import React from 'react';

const CLASS_NAMES: { [key: string]: string } = {
  false: 'tasks-item__title',
  true: 'tasks-item__title_active',
};

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
    <div className="tasks-item__task-input-wrapper">
      {' '}
      {isEditing ? (
        <>
          {' '}
          <input
            ref={inputRef}
            type="text"
            value={itemText}
            onBlur={onBlur}
            onChange={(e) => setItemText(e.target.value)}
            className="tasks-item__task-input"
          />
          {error && <div className="tasks-item__validate-error">{error}</div>}
        </>
      ) : (
        <p className={CLASS_NAMES[String(checked)]}>{itemText}</p>
      )}
    </div>
  );
};
