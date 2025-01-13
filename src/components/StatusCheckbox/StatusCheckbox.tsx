import style from './statusCheckbox.module.scss';

interface StatusCheckboxProps {
  checked: boolean;
  toggleChecked: () => void;
}

export const StatusCheckbox: React.FC<StatusCheckboxProps> = ({
  checked,
  toggleChecked,
}) => {
  return (
    <div
      className={style[checked ? 'wrapperActive' : 'wrapper']}
      onClick={toggleChecked}
    >
      <input
        className={style.checkbox}
        checked={checked}
        readOnly
        type="checkbox"
        name=""
        id=""
      />
    </div>
  );
};
