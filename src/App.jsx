import { useState, useEffect } from 'react'
import './App.css'
import FormInput from './components/FormInput'
import { v4 } from 'uuid'
import validate from './components/Validation'
import ListUsers from './components/ListUsers'
function App() {
  const [showDisabled, setShowDisabled] = useState(true)
  const [listUser, setListUser] = useState(JSON.parse(localStorage.getItem('listUsers')))
  const [values, setValues] = useState({
    UserName: '',
    Email: '',
    Password: '',
    Date: '',
    PhoneNumber: '',
    Description: '',
    Gender: 'male',
    Address: ''
  })
  const [messageErr, setMessageErr] = useState({})
  const ressetValues = () => setValues({
    UserName: '',
    Email: '',
    Password: '',
    Date: '',
    PhoneNumber: '',
    Description: '',
    Gender: 'male',
    Address: ''
  })
  var errs = {}

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!(Object.keys(validate(values, errs, setMessageErr)).length > 0)) {
      console.log('sss')
      const preUsers = JSON.parse(localStorage.getItem('listUsers'))
      if (preUsers) {
        localStorage.setItem('listUsers', JSON.stringify([...preUsers, { ...values, id: v4() }]))
      } else {
        localStorage.setItem('listUsers', JSON.stringify([{ ...values, id: v4() }]))
      }
      ressetValues()
    }
  }
  const handleChangeValue = (e, name) => {
    setValues({ ...values, [name]: e.target.value })
    setMessageErr({ ...messageErr, [name]: '' })
  }
  const handleEdit = (user) => {
    setMessageErr({})
    setValues(user)
    setShowDisabled(false)
  }
  useEffect(() => {
    setListUser(JSON.parse(localStorage.getItem('listUsers')))
  }, [localStorage.getItem('listUsers')])


  const removeUser = (id) => {
    const newListUser = listUser.filter(user => user.id != id)
    localStorage.setItem('listUsers', JSON.stringify(newListUser))
    setListUser(newListUser)
  }
  const handleUpdate = () => {
    if (!(Object.keys(validate(values, errs, setMessageErr)).length > 0)) {
      const newListUser = listUser.map(user => {
        if (user.id == values.id) {
          user = values
        }
        return user
      })
      setListUser(newListUser)
      localStorage.setItem('listUsers', JSON.stringify(newListUser))
      setShowDisabled(true)
      ressetValues()
    }
  }
  return (
    <>
      <div className='container'>
        <form id="sign-up-form" onSubmit={handleSubmit}>
          <h2 className='text-center'>Sign Up<hr/></h2>
          <FormInput value={values.UserName} onChange={(e) => handleChangeValue(e, 'UserName')} name="username" labelName="Username" type="text" placeholder="Enter username" messageErr={messageErr.UserName} />
          <FormInput value={values.Email} onChange={(e) => handleChangeValue(e, 'Email')} name="email" labelName="Email" type="email." placeholder="Enter email" messageErr={messageErr.Email} />
          <FormInput value={values.Password} onChange={(e) => handleChangeValue(e, 'Password')} name="password" labelName="Password" type="password" placeholder="Enter password" messageErr={messageErr.Password} />
          <p>Gender:</p>
          <div className='sign-up-form-radio'>
            <span>
              <input type="radio" onChange={(e) => setValues({ ...values, Gender: e.target.value })} checked={values.Gender == 'male'} name="gender" value="male" />Male
            </span>
            <span>
              <input type="radio" onChange={(e) => setValues({ ...values, Gender: e.target.value })} checked={values.Gender == 'female'} name="gender" value="female" />Female
            </span>
          </div>
          <FormInput value={values.Date} onChange={(e) => handleChangeValue(e, 'Date')} name="date" labelName="Date" type="date" messageErr={messageErr.Date} />
          <FormInput value={values.PhoneNumber} onChange={(e) => handleChangeValue(e, 'PhoneNumber')} name="phonenumber" labelName="Phone number" type="text" placeholder="Enter Phonenumber" messageErr={messageErr.PhoneNumber} />
          <div className='form-group'>
            <label  >Address:*</label>
            <select onChange={(e) => handleChangeValue(e, 'Address')} id="address" value={values.Address} >
              <option value="">-Address-</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hải Phòng">Hải PHòng</option>
              <option value="Lào Cai">Lào Cai</option>
            </select>
            <span className='errMessage'>{messageErr.Address}</span>
          </div>
          <div className='form-group'>
            <label>Description:</label>
            <textarea onChange={(e) => handleChangeValue(e, 'Description')} className='form-sign-up-textarea' placeholder='Enter Description' value={values.Description} ></textarea>
            <span className='errMessage'>{messageErr.Description}</span>
          </div>
          <div className='sign-up-form-btns'>
            <button className='sign-up-form-btn-submit' disabled={!showDisabled} type='submit'>Submit</button>
            <button className='sign-up-form-btn-update' disabled={showDisabled} onClick={handleUpdate} type='button'>Update</button>
          </div>
        </form>
      </div>
      {listUser && <ListUsers listUser={listUser} handleEdit={handleEdit} removeUser={removeUser} />}
    </>
  )
}

export default App
