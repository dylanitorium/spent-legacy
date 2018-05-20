import React, { Component } from 'react';
import { Table, Dropdown, Header, Button, Modal } from 'semantic-ui-react';
import Flexed from 'view/components/pure/Flexed';
import CreateCSVSchemaForm from 'view/components/pure/CreateCSVSchemaForm';
import conditionalComponent from 'view/utils/HOC/conditionalComponent';

class Schemas extends Component {
  state = {
    modalOpen: false,
  }

  openModal = () => this.setState({ modalOpen: true })

  closeModal = () => this.setState({ modalOpen: false })

  createSchema = data => {
    const { createSchema } = this.props;

    createSchema(data);
    this.closeModal();
  }

  render() {
    const { schemas, deleteSchema } = this.props;
    const { modalOpen } = this.state;

    return (
      <div>
        <Flexed>
          <Header>CSV Import Schemas</Header>
          <div>
            <Modal
              size="small"
              open={modalOpen}
              onClose={this.closeModal}
              onOpen={this.openModal}
              trigger={<Button content="Add Schema" />}
            >
              <Modal.Content>
                <CreateCSVSchemaForm onSubmit={this.createSchema} />
              </Modal.Content>
            </Modal>
          </div>
        </Flexed>
        {
          schemas.length
            ? (
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
            : (
              <p>You have no schemas. Add one using the button above</p>
            )
        }
      </div>
    )
  }
};

export default conditionalComponent(Schemas);