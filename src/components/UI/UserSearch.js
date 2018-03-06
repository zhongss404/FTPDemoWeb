import React from "react";
import {Select} from "antd";
import {request, config} from "../../utils";

const Option = Select.Option;
let timeout;
let currentValue;

function doFetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  function fake() {
    if ("" == value) {
      return;
    }
    request({
      url: config.baseURL + '/users/query?name=' + value,
      method: "get",
    }).done((d) => {
      if (currentValue === value) {
        if (null == d) {
          return;
        }
        const data = [];
        const result = d.data;
        result.forEach((r) => {
          data.push({
            value: r.id,
            text: r.realname,
          });
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 400);
}

class SelectInput extends React.Component {
  state = {
    data: [],
    value: this.props.inputValue,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.inputValue !== nextProps.inputValue) {
      this.setState({value: nextProps.inputValue})
    }
  }

  handleChange = (value) => {
    this.setState({value});
    doFetch(value, data => this.setState({data}));
  };

  handleSelect = (value) => {
    this.props.onSelect(value);
  };

  render() {
    const options = this.state.data.map(d => <Option key={d.text}>{d.text}</Option>);
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        notFoundContent=""
        style={this.props.style}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {options}
      </Select>
    );
  }
}
export default SelectInput
