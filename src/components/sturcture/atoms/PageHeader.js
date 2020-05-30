import React from 'react';
import { Header } from 'semantic-ui-react';

const PageHeader = ({title= '', subtitle = ''}) => {
  return(
    <div>
      <Header as='h2'>
          {title}
          <Header.Subheader>
              {subtitle}
          </Header.Subheader>
      </Header>
      <hr></hr>

      
    </div>
  );
};

export default PageHeader