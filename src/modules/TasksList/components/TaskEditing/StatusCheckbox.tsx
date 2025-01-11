const CLASS_NAMES: { [key: string]: string } = {
  false: 'status-checkbox__checkbox-wrapper',
  true: 'status-checkbox__checkbox-wrapper_active',
};

interface StatusCheckboxProps {
  checked: boolean;
  toggleChecked: () => void;
}

export const StatusCheckbox: React.FC<StatusCheckboxProps> = ({
  checked,
  toggleChecked,
}) => {
  return (
    <div className={CLASS_NAMES[String(checked)]} onClick={toggleChecked}>
      <input
        className="status-checkbox__checkbox"
        checked={checked}
        readOnly
        type="checkbox"
        name=""
        id=""
      />
    </div>
  );
};
