import { Form as BRUForm, SwitchButtons } from '@bru-public/oc-ui';
import { withDefaultProps } from '@bru-public/oc-utils';
import { Checkbox } from '../chekbox/index.js';
import { PlusPlainIcon } from '../icons/index.js';

export const Form = BRUForm;

const CheckboxField = withDefaultProps({ asInput: Checkbox })(BRUForm.Input);

Form.Checkbox = (props) => <CheckboxField {...props} asInputProps={{ label: props.label }} />;
Form.SwitchButtons = withDefaultProps({ asInput: SwitchButtons })(BRUForm.Input);

Form.MultiSelect = withDefaultProps({
  color: 'primary',
  disableClearable: true,
  popupIcon: <PlusPlainIcon />,
  className: 'ui-multiselect',
})(BRUForm.MultiSelect);

Form.Select = withDefaultProps({
  className: 'ui-select',
})(BRUForm.Select);

Form.Input = withDefaultProps({
  className: 'ui-input',
})(BRUForm.Input);

Form.Checkbox.displayName = 'FormCheckbox';
