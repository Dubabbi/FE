// WordTableRow.jsx

import React from 'react';
import * as L from '../LessonTchr/LessonStyle'

const WordTableRow = ({ children }) => {
  return <L.TableRow>{children}</L.TableRow>;
};

export default WordTableRow;