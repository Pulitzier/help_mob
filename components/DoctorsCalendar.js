import React, { Component } from 'react';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';

export default class DoctorsCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSetting: { selected: true, selectedColor: 'blue' },
      mDates: [
        this.props.curDate,
      ]
    }
  }

  handleDayPress = (day) => {
    const { mDates } = this.state;
    let newDates = [ ...mDates, day.dateString ];
    if (mDates.find(item => item === day.dateString)) {
      newDates = mDates.filter(item => item !== day.dateString)
    }
    this.props.setDate(newDates);
    this.setState({ mDates: newDates });
  }

  formatDates = (state) => {
    const { mDates, dateSetting } = state;
    return mDates.reduce((acc, cur) => ({ ...acc, ...{ [cur]: dateSetting } }), {});
  }

  render() {
    const { mDates, dateSetting } = this.state;
    return (
      <Calendar
        onDayPress={this.handleDayPress}
        markedDates={this.formatDates(this.state)}
      />
    )
  }
}
