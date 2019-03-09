import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  Select,
  TimePicker,
} from 'antd';

const { Option } = Select;

// MM-WW-DD-HH-mm
const MothDay = [];
for (let i = 1; i < 32; i+=1) {
  let value;
  if (i < 10) {
    value = `0${i}`;
  } else {
    value = `${i}`;
  }
  MothDay.push({
    key: value,
    label: value,
  });
}
const Week = {
  '01': '一',
  '02': '二',
  '03': '三',
  '04': '四',
  '05': '五',
  '06': '六',
  '07': '日',
};
const WeekDay = Object.keys(Week).map(item => ({ key: item, label: Week[item] }));
const format = 'HH:mm';

class DeadLineInput extends PureComponent{
  constructor(props) {
    super(props);
    const relValues = props.value ? props.value.split('-') : ['00','00','00','00','00'];
    const [MM, WW, DD, HH, mm] = relValues;
    this.state = {
      MM,
      WW,
      DD,
      HH,
      mm,
      type: props.type,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const relValues = nextProps.value ? nextProps.value.split('-') : ['00','00','00','00','00'];
      const [MM, WW, DD, HH, mm] = relValues;
      this.setState({
        MM,
        WW,
        DD,
        HH,
        mm,
      });
    }
    if ('type' in nextProps) {
      this.setState({
        type: nextProps.type,
      });
    }
  }

  triggerChangeEvent = ({ MM, WW, DD, HH, mm }) => {
    const { onChange } = this.props;
    const isNull = MM !== '00' && WW !== '00' && DD  !== '00' && HH !== '00' && mm !== '00';
    if (onChange && typeof onChange === 'function') {
      onChange(isNull ? '': [MM, WW, DD, HH, mm].join('-'));
    }
  };

  handleCtrlChange = (val, type) => {
    if (type === 'Weekly') {
      this.setState({
        WW: val,
      });
      this.triggerChangeEvent({...this.state, WW: val});
    }
    if (type === 'Monthly') {
      this.setState({
        DD: val,
      });
      this.triggerChangeEvent({...this.state, DD: val});
    }
  };

  handleTimeChange = (val) => {
    const [HH, mm] = val.split(':');
    this.setState({
      HH,
      mm,
    });
    this.triggerChangeEvent({...this.state, HH, mm});
  };

  render() {
    const { WW, DD, HH, mm, type } = this.state;
    let label = "";
    let ctrlSrc = [];
    let ctrlVal = '01';
    if (type === 'Daily') {
      label = '每日';
    }
    if (type === 'Weekly') {
      label = '每周';
      ctrlSrc = WeekDay;
      ctrlVal = WW;
    }
    if (type === 'Monthly') {
      label = '每月';
      ctrlSrc = MothDay;
      ctrlVal = DD;
    }
    return (
      <div>
        <span>{label}</span>
        {
          !!ctrlSrc.length &&
            <Select style={{ width: 80 }} value={ctrlVal} onChange={val => this.handleCtrlChange(val, type)}>
              {ctrlSrc.map(s => <Option key={s.key} value={s.key}>{s.label}</Option>)}
            </Select>
        }
        <TimePicker onChange={(_, val) => this.handleTimeChange(val)} defaultValue={moment(`${HH}:${mm}`, format)} format={format} />
      </div>
    );
  }
}

export default DeadLineInput;
