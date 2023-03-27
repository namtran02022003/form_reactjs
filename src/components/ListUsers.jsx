


 function ListUsers ({listUser,handleEdit,removeUser}){
    return (
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
            {listUser && listUser.map(user => {
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
    )
}
export default ListUsers