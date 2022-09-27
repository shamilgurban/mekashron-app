import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);

  const login = () => {
    const formData = new FormData();
    formData.append('func', 'Login')
    formData.append('params', `UserName=${email}&Password=${password}`)
    fetch('http://isapi.mekashron.com/soapclient/soapclient.php?URL=http://isapi.icu-tech.com/icutech-test.dll%2Fwsdl%2FIICUTech', {
        method: "POST",
        body: formData
    }).then(response => response.json())
    .then(data => {
        setUser(JSON.parse(data.ret))
        toastr.success('You logged in successfully')
    }).catch(error => {
        toastr.error("Error occured")
    })
  }
  
  return (
    <>
      {user ? 
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {Object.entries(user).map(([key, value]) => <p key={key}>{key}: {value}</p>)}
      </div>
      :
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '30%'}} className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" onClick={login} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>}
    </>
  );
}

export default App;
