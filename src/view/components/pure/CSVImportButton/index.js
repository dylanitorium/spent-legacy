import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import csvToJson from 'view/utils/csvToJson';

export default class CSVImportButton extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onError: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
    onError: () => {},
  }

  getData = async (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result);
    });
  };

  onChange =  async (e) => {
    const { files } = e.target;

    if (!files.length) {
      return;
    }

    const file = files[0];

    try {
      const data = await this.getData(file);
      this.props.onChange(csvToJson(data));
    } catch (e) {
      this.props.onError(e);
    }
  }

  render() {
    return (
      <Button icon as="label" labelPosition="left">
        <Icon name="attach" />
        Import CSV
        <input type="file" style={{ display: 'none' }} onChange={this.onChange} />
      </Button>
    );
  }
}