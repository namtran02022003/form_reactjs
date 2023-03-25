import './FormInput.css'




function FormInput(props){
    return (
        <div className="form-group">
            <label >{props.labelName}:*</label>
            <input type={props.type} name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} ></input>
          <span className='errMessage'>{props.messageErr}</span>
        </div>
    )
}
export default FormInput