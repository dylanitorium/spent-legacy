import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

const Schemas = (props) => {
  const { schemas, deleteSchema } = props;

  if (!schemas.length) {
    return <p>You have no schemas. Add a schema on either of the events page</p>;
  }

  return (
    <Table>
      <Table.Body>
        {schemas.map(schema => (
          <Table.Row key={schema.id}>
            <Table.Cell width={15}>
              {schema.label}
            </Table.Cell>
            <Table.Cell width={1} textAlign="center">
              <Dropdown icon='ellipsis vertical' className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteSchema(schema.id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
};

export default conditionalComponent(Schemas);