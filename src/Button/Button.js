import React from 'react'

export function replaceCamelWithSpaces(colorName) {
    return colorName.replace(/\B([A-Z])/g, ' $1');
}
export default class Button extends React.Component {
    state={buttonText: 'Change to Blue', buttonColor:'red', checked: false}
    handleClick = () => {
        this.setState({
            buttonText: this.state.buttonText==='Change to Blue'? 'Change to Red': 'Change to Blue',
            buttonColor: this.state.buttonColor==='red' ? 'blue' : 'red'
        })
    }
    handleCheckBox = (e) => {
        console.log(e.target.checked)
        this.setState({checked: !this.state.checked})
    }
    render() {
        return(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
                <button disabled={this.state.checked} onClick={this.handleClick} style={{backgroundColor: this.state.checked ? 'gray':this.state.buttonColor}}>{this.state.buttonText}</button>
                <input onChange={this.handleCheckBox} checked={this.state.checked} id='disable-button-checkbox' name='checkbox1' type='checkbox'/>
                <label htmlFor='disable-button-checkbox'>Disable button</label>
            </div>
        )
    }
}