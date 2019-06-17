import React from 'react';
import './App.css';
import axios from 'axios';
import CheckBoxItem from './components/CheckboxItem'

class App extends React.Component {

constructor(){
  super();

  this.state = {gens : [{
    name : "test",
    id : 0,
    isSelected : false,
    url : "",
    species : [1, 2 ,3 ,4 ,5 ,6 ,7 ,9],
    speciesSelect : [1,1]
  }],
    selectedOnes : []}
  this.handleChange = this.handleChange.bind(this);
  this.handleSelects = this.handleSelects.bind(this);
  this.testing = this.testing.bind(this);

 
}

componentDidMount(){


  // get pokemon generations
  axios.get('https://pokeapi.co/api/v2/generation')
  .then(response => {

    let passArray = response.data.results;
    passArray = passArray.map(function (gen,i) {

      // return new object using the data
     return ( {
        name : gen.name,
        id : i + 1,
        isSelected : false,
        url : gen.url,
        species : ["eevee", "pikachu" , "jigglypuff" ,  "squirtle", "bulbasaur", "mudkip",
        "butterfree", "duduo"],
        speciesSelect : []
      })

    })
   

    this.setState({gens : passArray});

  })
  .catch(error => {
    console.log(error);
  });


 } //end didmount

// handleChange just for checkboxes
// grab old state
// reacreate old state
// change value of targetted value
// return an array item (gen)
//return array of gens
//setState uses new array of gens to update state
handleChange(id){

  this.setState(prevState => {

    const updatedGens = prevState.gens.map(gen => {

      if (gen.id === id) {
        gen.isSelected = !gen.isSelected;
    }
    if (gen.isSelected === false){
        gen.speciesSelect = [];
    }
    return gen

    })

    return {
      gens: updatedGens
  }

  })
 

}

testing = (event) => {

  let options = event.target.options;
  let id = event.target.id
                      let value = [];
                      for (let i = 0, l = options.length; i < l; i++) {
                        if (options[i].selected) {
                          value.push(options[i].value);
                        }
                      }
                      //console.log(value)
                      //want to setState, but this is not defined

                          
                          
                         
                          this.setState((prevState)=> {
                            
                            let temp = prevState;
                            temp.gens.map((gen, i)=>{

                              if(i == id){
                                console.log(value);
                                temp.gens[i].speciesSelect = value;

                              }


                            })
                          
                            return temp;
                          })
                          //console.log(this.state.selectedOnes)

}

handleSelects(event){

  console.log(event.target.value)
  
  //loop through all selected values, updatestate, put onchange on the select options not the select
  
  }



  render(){
  return (
    <div className="App">
        <div className="topRow">
          <div className="checkBoxes">
          {this.state.gens.map((gen, i)=> <CheckBoxItem type="checkbox"
          name={gen.name} checked={gen.isSelected} key={i+1} id={gen.id} handleChange={this.handleChange}/>, this)}
          </div>
          <div className="selects">
            <h1>Selected Gens</h1>
            
            {
              
              
              this.state.gens.map(function(gen, i){

                if (gen.isSelected === true){
                  
                  return (<div key={i+"div"}>
                    
                    <h4 key={i}>{gen.name}</h4>

                    
                    <select key={i + "select"} id={i} name={gen.name + "sel"} multiple={true} 
                     onChange={(event) => this.testing(event)}>

                      {gen.species.map((pokemon, j) => {
                        return (<option key={j}  value={pokemon} >{pokemon}</option>)

                      })}
                    </select>

                  </div>)
                }
                else{
                  return null;
                }
              

            }, this )} 
              
            </div>
            </div>
            <div className="selectedItems">
                {<ul>

                  {this.state.gens.map((gen, i) => {

                        if (gen.speciesSelect.length > 0){
                        
                        
                        return (gen.speciesSelect.map((species, s) => <li key={s}>{species}</li>))
                        }
                        else{
                          return null
                        }

                        
                      })
                      
                      
                  }

                </ul>}
            </div>
            
    </div>
    
    
  );
}
}

export default App;
