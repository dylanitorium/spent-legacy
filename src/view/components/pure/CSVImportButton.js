import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Select } from 'semantic-ui-react';
import csvToJson from 'view/utils/csvToJson';


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
    const { onImport, onError, activeSchema } = this.props
    const { files } = e.target;

    if (!files.length) {
      return;
    }

    const file = files[0];

    try {
      const data = await this.getData(file);
      onImport(csvToJson(data, activeSchema));
    } catch (e) {
      onError(e);
    }
  }

  setActiveSchema = (_e, { value }) => {
    const { setActiveSchema } = this.props;

    setActiveSchema(value);
  }

  render() {
    const { schemaOptions, activeSchemaId } = this.props;

    return (
      <div style={{ display: 'inline-block' }}>
        <Select
          placeholder="Select a scheme"
          style={{ display: 'inline-block', marginRight: '.3rem '}}
          onChange={this.setActiveSchema}
          options={schemaOptions}
          value={activeSchemaId}
        />
        <Button as="label">
          Import CSV
          <input type="file" style={{ display: 'none' }} onChange={this.onChange} />
        </Button>
      </div>
    );
  }
}