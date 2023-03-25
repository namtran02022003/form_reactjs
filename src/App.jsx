import { useState, useEffect } from 'react'
import './App.css'
import FormInput from './components/FormInput'
import { v4 } from 'uuid'
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
  const [messageErr, setMessageErr] = useState({
    UserName: '',
    Email: '',
    Password: '',
    Date: '',
    PhoneNumber: '',
    Description: '',
    Gender: '',
    Address: ''
  })
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
  const validate = (e) => {
    if (!values.UserName.trim()) {
      showErr('UserName', 'Vui lòng nhập vào trường này!')
      return
    } else if (values.UserName.trim().length < 6) {
      showErr('UserName', 'Vui lòng nhập ít nhất 6 ký tự!')
      return
    } else if (values.UserName.trim().length > 20) {
      showErr('UserName', 'Vui lòng nhập tối đa 20 ký tự!')
      return
    }
    if (!values.Email.trim()) {
      showErr('Email', 'Vui lòng nhập vào trường này!')
      return
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.Email.trim()))) {
      showErr('Email', 'Email không hợp lệ!')
      return
    }
    if (!values.Password.trim()) {
      showErr('Password', 'Vui lòng nhập vào trường này!')
      return
    } else if (values.Password.trim().length < 8) {
      showErr('Password', 'Vui lòng nhập ít nhất 8 ký tự!')
      return
    } else if (values.Password.trim().length > 20) {
      showErr('Password', 'Vui lòng nhập tối đa 20 ký tự!')
      return
    }
    if (!values.Date) {
      showErr('Date', 'Vui lòng nhập vào trường này!')
      return
    }
    if (!values.PhoneNumber.trim()) {
      showErr('PhoneNumber', 'Vui lòng nhập vào trường này!')
      return
    } else if (!(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(values.PhoneNumber.trim()))) {
      showErr('PhoneNumber', 'PhoneNumber không hợp lệ!')
      return
    }
    if (!values.Address) {
      showErr('Address', 'Vui lòng nhập vào trường này!')
      return
    }
    return true
  }
  const handleSubmit = () => {
    if (validate()) {
      const preUsers = JSON.parse(localStorage.getItem('listUsers'))

      if (preUsers) {
        localStorage.setItem('listUsers', JSON.stringify([...preUsers, { ...values, id: v4() }]))
      } else {
        localStorage.setItem('listUsers', JSON.stringify([{ ...values, id: v4() }]))
      }
      ressetValues()
    } else {
      console.log('no')
    }
  }
  const showErr = (name, mes) => { setMessageErr(pre => { return { ...pre, [name]: mes } }) }
  const handleChangeValue = (e, name) => {
    setValues({ ...values, [name]: e.target.value })
    setMessageErr({ ...messageErr, [name]: '' })
  }
  const handleEdit = (user) => {
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
    console.log('dddd')
    if (validate()) {
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
        <form id="sign-up-form" >
          <h2 className='text-center'>Sign Up</h2>
          <FormInput value={values.UserName} onChange={(e) => handleChangeValue(e, 'UserName')} name="username" labelName="Username" type="text" placeholder="Enter username" messageErr={messageErr.UserName} />
          <FormInput value={values.Email} onChange={(e) => handleChangeValue(e, 'Email')} name="email" labelName="Email" type="email" placeholder="Enter email" messageErr={messageErr.Email} />
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
          <div className='form-btn'>
            <button disabled={!showDisabled} onClick={handleSubmit} type='button'>Submit</button>
            <button disabled={showDisabled} onClick={handleUpdate} type='button'>Update</button>
          </div>
        </form>
      </div>
      <div id="listUser">
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Date</th>
              <th>PhoneNumber</th>
              <th>Address</th>
              <th>Description</th>
              <th>option</th>
            </tr>
            {listUser.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.UserName}</td>
                  <td>{user.Email}</td>
                  <td>{user.Password}</td>
                  <td>{user.Gender}</td>
                  <td>{user.Date}</td>
                  <td>{user.PhoneNumber}</td>
                  <td>{user.Address}</td>
                  <td>{user.Description}</td>
                  <td><button type='button' onClick={() => { handleEdit(user) }}>edit</button><button type='button' onClick={() => removeUser(user.id)}>remove</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
