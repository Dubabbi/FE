import React from 'react';
import { Link } from 'react-router-dom';
import Avvvatars from 'avvvatars-react'
import * as T from './TopStyle';

export default function Nav() {
return(
    <>
        <T.TopWrapper>
            <T.Header>
              <T.Title>마음말</T.Title>
            </T.Header>
          <T.LinkWrapper>
          <Link to=""><T.Avatar><Avvvatars style="shape" size={40}/></T.Avatar></Link>
          </T.LinkWrapper>
        </T.TopWrapper>
    </>
)
}