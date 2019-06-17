import React from 'react'

function checkBoxItem(props){

return(


<div className="checkItem">
            <input 
                type={props.type}
                checked={props.checked} 
                onChange={() => props.handleChange(props.id)}
                name={props.name}
            />
            <label>{props.name}</label>
</div>

)

}


export default checkBoxItem;