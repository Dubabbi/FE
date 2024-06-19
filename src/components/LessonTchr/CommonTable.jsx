// CommonTable.jsx
import React from 'react';
import styled from 'styled-components';
import * as L from './LessonStyle'

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
  { title: "강의 제목", width: "44%" },
  { title: "템플릿 이름", width: "29%" },
  { title: "생성 날짜", width: "15%" },
  { title: "레벨", width: "6%" }
];

const CommonTable = ({ children }) => {
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

export default CommonTable;