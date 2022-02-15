import { Form } from "react-bootstrap";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => any;
  disabled?: boolean;
};

/**
 * A switch button.
 */
export default function Switch({id, label, checked, onChange, disabled=false}: Props) {
  return (
    <Form.Switch
      type="checkbox"
      {...{id, label, checked, onChange, disabled}}
    />
  );
};
