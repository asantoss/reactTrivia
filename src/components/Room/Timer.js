import React, { useState, Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 30,
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>{count}s</h1>
      </div>
    )
  }


  //!! this is where i want to increment my count
  componentDidMount() {
    const { startCount } = this.props;
    this.setState({
      count: startCount
    })

    //!!Set interval 
    this.myInterval = setInterval(() => {

      this.setState(prevState => ({

        count: prevState.count - 1 > 0 ? prevState.count - 1 : 0
      }))
    }, 1000)
  }


  //!! clearInterval
  componentWillUnmount() {
    clearInterval(this.myInterval)
  }


}
