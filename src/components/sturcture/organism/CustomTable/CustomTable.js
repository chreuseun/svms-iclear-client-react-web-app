import React from 'react';
import { Segment, Table } from 'semantic-ui-react';


const CustomTable = ({data = [], tableColumnNames = [], renderItem:RenderItem = ()=>{} , keyExtractor = 'id'}) => {
  return(
    <Segment style={{ overflow: 'auto', maxHeight: '800px' }}>
    <Segment.Group horizontal>
        <Table singleLine>
            <Table.Header>
                <Table.Row>
                    {tableColumnNames.map((header, index) => <Table.HeaderCell key={index}>{header}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                  data.map((itemData, idx) => {

                        return(
                          <RenderItem key={itemData[keyExtractor]} itemData={itemData} />
                        )
                    })
                }
            </Table.Body>
        </Table>
    </Segment.Group>
</Segment>
  );
}

export default CustomTable;