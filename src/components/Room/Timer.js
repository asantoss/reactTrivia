import React, { Component } from 'react';
import styled from 'styled-components';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.startCount,
    }
  }

  render() {
    const { count } = this.state;

    let circleArray = [];
    const width = 100;

    for (let i = 0; i < this.props.startCount; i++) {
      const rotation = -(360 / this.props.startCount) * (i);
      const TicTac = styled.div`
        display: block;
        position: absolute;
        top: calc(50% - 5px);
        left: calc(50% - 3px);
        width:6px;
        height:10px;
        background-color: ${i < this.state.count
          ? 'rgba(0,0,0,1)'
          : 'rgba(225,225,225,1)'};
        transform: rotate(${rotation}deg) translate(0px, -${width / 2}px);
      `;
      circleArray.push(
        <TicTac />
      )
    }

    const Counter = styled.div`
      position: relative;
      margin: 50px;
    `

    return (
      <div>
        {count <= 0 ? (
          <h1>Time Up!</h1>
        ) : (
            <div>
              <Counter>
                <h1>{count}</h1>
                {circleArray}
              </Counter>
            </div>
          )}
      </div>
    )
  }


  //!! this is where i want to decrement my count
  componentDidMount() {
    // const { startCount } = this.props;
    // this.setState({
    //   count: startCount
    // })

    //!!Set interval 
    this.myInterval = setInterval(() => {

      if (this.state.count <= 0) {
        clearInterval(this.myInterval);
      }
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
