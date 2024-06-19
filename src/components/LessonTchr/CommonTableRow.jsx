// CommonTableRow.jsx

import React from 'react';
import * as L from './LessonStyle'

const CommonTableRow = ({ children }) => {
  return <L.TableRow>{children}</L.TableRow>;
};

export default CommonTableRow;