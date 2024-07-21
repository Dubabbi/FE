// WordTableColumn.jsx

import React from 'react';
import * as L from '../LessonTchr/LessonStyle'

const WordTableColumn = ({ children }) => {
  return <L.TableColumn>{children}</L.TableColumn>;
};

export default WordTableColumn;