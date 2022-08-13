import React from 'react';

import { ReturnComponentType } from 'types';
import { RadioGroupRatting } from 'common/ratting/RadioGroupRatting';

export function Grades():ReturnComponentType {
  return (
    <div>
      <h4>Rate your answer</h4>
      <RadioGroupRatting />

    </div>
  );
}
