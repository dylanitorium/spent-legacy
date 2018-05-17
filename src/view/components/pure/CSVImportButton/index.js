import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Divider, Select, Input, TextArea, Form } from 'semantic-ui-react';
import csvToJson from 'view/utils/csvToJson';


class CreateSchemaForm extends Component {
  state = {
    label: '',
    row: '',
    schema: '',
  }

  makeOnChange = field => (_e, { value }) => this.setState({ [field]: value });

  onSubmit = () => this.props.onSubmit(this.state);

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <Input fluid placeholder="Label" onChange={this.makeOnChange('label')} />
        </Form.Field>
        <Form.Field>
          <Input fluid placeholder="Row header index" type="number" onChange={this.makeOnChange('row')} />
        </Form.Field>
        <Form.Field>
          <TextArea placeholder="Old header: new key" autoHeight rows={3} onChange={this.makeOnChange('schema')} />
        </Form.Field>
        <Button primary fluid content="Add Schema" />
      </Form>
    );
  }
}

export default class CSVImportButton extends Component {
  static propTypes = {
    headerConfig: PropTypes.object,
    onChange: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    headerConfig: {},
    onChange: () => {},
    onError: () => {},
  }

  state = {
    schemaEditorOpen: false,
  };

  getData = async (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result);
    });
  };

  onChange =  async (e) => {
    const { onImport, onError, headerConfig } = this.props
    const { files } = e.target;

    if (!files.length) {
      return;
    }

    const file = files[0];

    try {
      const data = await this.getData(file);
      onImport(csvToJson(data, headerConfig));
    } catch (e) {
      onError(e);
    }
  }

  openSchemaEditor = () => this.setState({ schemaEditorOpen: true });

  closeSchemaEditor = () => this.setState({ schemaEditorOpen: false });

  createSchema = (data) => {
    const { createSchema } = this.props;

    this.closeSchemaEditor();
    createSchema(data);
  }

  render() {
    const { activeSchema } = this.props;
    const { schemaEditorOpen } = this.state;

    console.log(activeSchema);

    return (
      <div style={{ display: 'inline-block'}}>
        <Button basic onClick={this.openSchemaEditor}>
          { activeSchema && activeSchema.label || "No Schema"}
        </Button>
        <Button as="label">
          Import CSV
          <input type="file" style={{ display: 'none' }} onChange={this.onChange} />
        </Button>
        <Modal
          open={schemaEditorOpen}
          onClose={this.closeSchemaEditor}
          size='mini'
        >
          <Modal.Content>
            <Select fluid placeholder="Select a scheme" />
            <Divider horizontal>Or</Divider>
            <CreateSchemaForm onSubmit={this.createSchema} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}