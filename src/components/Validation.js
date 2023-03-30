const validate = (values,errs,setMessageErr) => {
    if (!values.UserName.trim()) {
      errs.UserName = 'Vui lòng nhập vào trường này!'
    } else if (values.UserName.trim().length < 6) {
      errs.UserName = "Vui lòng nhập ít nhất 6 ký tự!"
    } else if (values.UserName.trim().length > 20) {
      errs.UserName = "Vui lòng chỉ nhập tối đa 20 ký tự!"
    }
    if (!values.Email.trim()) {
      errs.Email = 'Vui lòng nhập vào trường này!'
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.Email.trim()))) {
      errs.Email = 'Email không hợp lệ!'
    }
    if (!values.Password.trim()) {
      errs.Password = 'Vui lòng nhập vào trường này!'
    } else if (values.Password.trim().length < 8) {
      errs.Password = 'Vui lòng nhập ít nhất 8 ký tự!'
    } else if (values.Password.trim().length > 20) {
      errs.Password = 'Vui lòng chỉ nhập tối đa 20 ký tự!'
    }
    if (!values.Date) {
      errs.Date = 'Vui lòng nhập vào trường này!'

    }
    if (!values.PhoneNumber.trim()) {
      errs.PhoneNumber = 'Vui lòng nhập vào trường này!'
    } else if (!(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(values.PhoneNumber.trim()))) {
      errs.PhoneNumber = 'PhoneNumber không hợp lệ!'

    }
    if (!values.Address) {
      errs.Address = 'Vui lòng nhập vào trường này!'
    }
    setMessageErr(errs)
    return errs
  }
  export default validate