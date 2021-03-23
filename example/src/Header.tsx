import React from 'react'

import {  Header, HeaderContent, HeaderBrand, HeaderRightZone, HeaderSocialsZone, Icon } from 'design-react-kit';

export const AppHeader = () => (<Header
    type="center"
  >
    <HeaderContent>
      <HeaderBrand
        iconName="it-code-circle"
        tag="a"
      >
        <h2>
          SPID React button
    </h2>
        <h3>
          The React component for the SPID smart button
    </h3>
      </HeaderBrand>
      <HeaderRightZone>
        <HeaderSocialsZone>
          <ul>
            <li>
              <a
                aria-label="Github"
                href="####"
                target="_blank"
              >
                <Icon
                  color=""
                  icon="it-github"
                  padding={false}
                  size=""
                />
              </a>
            </li>
          </ul>
        </HeaderSocialsZone>
      </HeaderRightZone>
    </HeaderContent>
  </Header>)