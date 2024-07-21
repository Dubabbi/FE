// CommonTable.jsx
import React from 'react';
import styled from 'styled-components';
import * as L from '../LessonTchr/LessonStyle'

const TableHeaderColumn = styled.th`
  border-bottom: 1px solid #e8e8e8;
  font-size: 1.3rem;
  font-family: inter;
  padding: 1% 1%;
  font-weight: bold;
  border-right: 1px solid #ccc;
  width: ${props => props.width};  // 너비를 props에서 받아옴
  &:last-child {
    border-right: none;
  }
`;

// 헤더에 각각의 너비 설정
const headers = [
  { title: "#", width: "6%" },
  { title: "세트 이름", width: "44%" },
  { title: "카테고리", width: "29%" },
  { title: "설명", width: "25%" },
];

const WordTable = ({ children }) => {
  return (
    <L.Table>
      <thead>
        <tr>
          {headers.map((item, index) => (
            <TableHeaderColumn key={index} width={item.width}>
              {item.title}
            </TableHeaderColumn>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </L.Table>
  );
};

export default WordTable;