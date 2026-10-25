import { InfoIcon } from 'packages/front/src/components/icons/index.js';
import {
  InfoBoxAtom,
  InfoBoxBottomAtom,
  InfoBoxCenterAtom,
  InfoBoxIconAtom,
  InfoBoxRightAtom,
  InfoBoxTopAtom,
} from './info-box.atoms.js';
import './info-box.scss';

export const InfoBox = ({ type = 'default', icon, text, bottom, right }) => {
  return (
    <InfoBoxAtom type={type}>
      <InfoBoxIconAtom>{icon ?? <InfoIcon />}</InfoBoxIconAtom>

      <InfoBoxCenterAtom>
        {text && <InfoBoxTopAtom>{text}</InfoBoxTopAtom>}

        {bottom && <InfoBoxBottomAtom>{bottom}</InfoBoxBottomAtom>}
      </InfoBoxCenterAtom>

      {right && <InfoBoxRightAtom>{right}</InfoBoxRightAtom>}
    </InfoBoxAtom>
  );
};
