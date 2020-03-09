import React, { Component } from 'react';
import './canvas.css'

class Canvas extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      canvasArray:null,
    };
  }

  componentDidMount() {
    fetch('/api/canvasdata')
      .then(res => res.text())
      .then(data => this.setState({data}, () => console.log('Customers fetched...', data)));
  }

 

  render() {
    
    let array=this.state.data.split(',').join('').split('\n');
    return (
     
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
        {array.map((el,index)=>{
         return <tr key={`tr${index}`}>{
            el.split('').map((element,indexTd)=>{
              switch(element){
                case '-': case '|':{
                  return <td key={`td${indexTd}`} style={{backgroundColor:'black', }}></td>
              
                }
                case ' ':{
                  return <td key={`td${indexTd}`} style={{backgroundColor:'yellow',}}></td>
              
                }
                case 'X':{
                  return <td key={`td${indexTd}`} style={{backgroundColor:'blue', }}></td>
            
                }
                default:{
                  return  <td key={`td${indexTd}`} style={{backgroundColor:'green',}}></td>
                }
                
              }
            })
            }</tr>
        })}
        </tbody>
      </table>
    );
  }
}

export default Canvas;
