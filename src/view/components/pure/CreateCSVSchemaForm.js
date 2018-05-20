import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form, Header, Grid } from 'semantic-ui-react';

export default class CreateCSVSchemaForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  static keys = [
    'date',
    'amount',
    'reference',
    'accountName',
    'particulars',
    'code',
  ];

  state = {
    label: '',
    row: '',
    dateFormat: '',
    date: '',
    amount: '',
    referenc: '',
    accountName: '',
    particulars: '',
    code: '',
  }

  makeOnChange = field => (_e, { value }) => this.setState({ [field]: value });

  onSubmit = () => this.props.onSubmit(this.state);

  render() {
    return (
      <Form onSubmit={this.onSubmit} divided="vertically">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header size="small">Config</Header>
              <Form.Field>
                <Input fluid placeholder="Label" onChange={this.makeOnChange('label')} />
              </Form.Field>
              <Form.Field>
                <Input fluid placeholder="Row header index" type="number" onChange={this.makeOnChange('row')} />
              </Form.Field>
              <Form.Field>
                <Input fluid placeholder="Date format" onChange={this.makeOnChange('dateFormat')} />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header size="small">Key mapping</Header>
              {
                CreateCSVSchemaForm.keys.map(key => (
                  <Form.Field key={key}>
                    <Input fluid placeholder={key} onChange={this.makeOnChange(key)} />
                  </Form.Field>
                ))
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button primary fluid content="Add Schema" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}