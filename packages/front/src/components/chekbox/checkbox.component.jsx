import { Checkbox as KitCheckbox } from '@bru-public/oc-ui';
import { CheckboxIcon } from 'packages/front/src/components/icons/index.js';
import './checkbox.css';

const UncheckedIcon = () => (
  <span className="unchecked-icon">
    <CheckboxIcon style={{ width: 16, height: 16 }} />
  </span>
);

const CheckedIcon = () => (
  <span className="checked-icon">
    <CheckboxIcon style={{ width: 16, height: 16 }} />
  </span>
);

export const Checkbox = ({ value, ...props }) => (
  <KitCheckbox
    {...props}
    style={{ marginLeft: 5 }}
    checked={value}
    icon={<UncheckedIcon />}
    checkedIcon={<CheckedIcon />}
  />
);
