import { Input, Tooltip } from 'antd';
import React, { Component } from 'react';

function formatNumber(value) {
  const target = `${value}`;
  const list = target.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onChange = (e) => {
    const { value } = e.target;
    const {type} = this.props;
    const reg = type && type === 'int' ? /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/ : /^-?(0|[1-9][0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        value,
      });
      const {onChange} = this.props;
      onChange(value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { onBlur, onChange } = this.props;
    const { value } = this.state;
    const v = value ? `${value}` :'';
    if (v && (v.charAt(value.length - 1) === '.' || value === '-')) {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { value } = this.state;
    const { type } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>
    ) : '输入数字';
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={type === 'int' ? "输入整数" : "可输入小数"}
          maxLength={25}
        />
      </Tooltip>
    );
  }
}

export default NumericInput;
