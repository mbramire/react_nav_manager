import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// see https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281
import WhateverIWant from 'react-native-communications';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, ConfirmModal } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false }

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    const { uid } = this.props.employee;

    this.props.employeeSave({ name, phone, shift, uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    WhateverIWant.text(phone, `Your shift is ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>

        <ConfirmModal
          visible={this.state.showModal}
          onDecline={this.onDecline.bind(this)}
          onAccept={this.onAccept.bind(this)}
        >
          Are you sure?
        </ConfirmModal>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
