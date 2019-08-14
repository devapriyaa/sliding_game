import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [1, 2, 3, 4, 5, 6, 7, 8],
            clonedArray: [1, 2, 3, 4, 5, 6, 7, 8, 'X'],
            condition: false
        }
    }
    handleClick() {
        this.setState({
          condition: !this.state.condition
        })
      }
    shuffle = (arr) => {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        return arr
    }
    componentDidMount() {
         this.setState({
             array: this.shuffle(this.state.array)
         });
        this.setState({
            array: this.state.array.concat('X')
        })
    }
    move = (e) => {
        const id = parseInt(e.target.id);
        const value = e.target.value;
        let upperBox = id - 3;
        let leftBox = id - 1;
        let rightBox = id + 1;
        let lowerBox = id + 3;
        if ((upperBox) >= 0 && this.state.array[upperBox] === "X") {
            console.log("upper")
            this.moved(upperBox, id, value);
            this.handleClick();
        }
        if ((leftBox) >= 0 && this.state.array[leftBox] === "X") {
            console.log("left")
            this.moved(leftBox, id, value);
            this.handleClick();
        }
        if (this.state.array[rightBox] === "X") {
            console.log("right")
            this.moved(rightBox, id, value);
            this.handleClick();
        }
        if (this.state.array[lowerBox] === "X") {

            console.log("low")
            this.moved(lowerBox, id, value);
            this.handleClick();
        }
    }
    moved = (targetBox, currentBox, value) => {
        let newState = Object.assign({}, this.state);
        newState.array[currentBox] = "X";
        this.setState(newState);
        let newState2 = Object.assign({}, this.state);
        newState2.array[targetBox] = value;
        this.setState(newState2);
        this.checkOrder();
    }
    checkOrder = () => {
        if(!this.calculate()){
            console.log('move next')
        }else{
            console.log('you won')
        }

    }
    calculate = () => {
        var isWon = true;
        for (let i = 0; i <= 8; i++) {
            if(""+this.state.clonedArray[i]!=""+this.state.array[i]){
                isWon=false;
                break;
            }
        }
        return isWon;
    }


    render() {
        return <div>
            <h1>{this.props.name}</h1>
            <div className='box'>

                <button id='0' value={this.state.array[0]} className='square' onClick={this.move} disabled={this.state.array[0]==="X"}>{this.state.array[0]}</button>
                <button id='1' value={this.state.array[1]} className='square' onClick={this.move} disabled={this.state.array[1]==="X"}>{this.state.array[1]}</button>
                <button id='2' value={this.state.array[2]} className='square' onClick={this.move} disabled={this.state.array[2]==="X"}>{this.state.array[2]}</button>
                <button id='3' value={this.state.array[3]} className='square' onClick={this.move} disabled={this.state.array[3]==="X"}>{this.state.array[3]}</button>
                <button id='4' value={this.state.array[4]} className='square' onClick={this.move} disabled={this.state.array[4]==="X"}>{this.state.array[4]}</button>
                <button id='5' value={this.state.array[5]} className='square' onClick={this.move} disabled={this.state.array[5]==="X"}>{this.state.array[5]}</button>
                <button id='6' value={this.state.array[6]} className='square' onClick={this.move} disabled={this.state.array[6]==="X"}>{this.state.array[6]}</button>
                <button id='7' value={this.state.array[7]} className='square' onClick={this.move} disabled={this.state.array[7]==="X"}>{this.state.array[7]}</button>
                <button id='8' value={this.state.array[8]} className='square' onClick={this.move} disabled={this.state.array[8]==="X"}>{this.state.array[8]}</button>

            </div>
        </div>
    }
}
ReactDOM.render(
    <Game name='Shuffle Game' />,
    document.getElementById('root')
);