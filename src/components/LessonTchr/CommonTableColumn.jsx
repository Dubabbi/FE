// CommonTableColumn.jsx

import React from 'react';
import * as L from './LessonStyle'

const CommonTableColumn = ({ children }) => {
  return <L.TableColumn>{children}</L.TableColumn>;
};

export default CommonTableColumn;