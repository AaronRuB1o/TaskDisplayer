import Button from "../../components/button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState(null);
  const [showError, setShowError] = useState(false);

  const authenticate = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password
      }),
    });
  
    if (!response.ok) {
      return { message: 'Failed to create post' }
    }

    const result = await response.json();

    if(result.authenticated){
      router.push("/main/main_display");
      setShowError(false);  
    }
    else{
      setShowError(true);
    }
    
  };

  return (
    <div className="main">
        <div className="title"> Login </div>
        { showError &&(<div name="error">Login Failed!</div>)}
        <div className="login">
      <table> 
        <tbody>
          <tr>
            <td colSpan = "2">Please Enter your Credentials</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td><input 
              type="text"
              onChange={(e) => setUserName(e.target.value)}>
              </input>
            </td>
          </tr>
          <tr>
          <td>Password: </td>
          <td><input 
            type="text"
            onChange={(e) => setPassword(e.target.value)}>
            </input>
          </td>
          </tr>
          <tr>
            <td colSpan = "2"><Button text="Enter" onClick={authenticate} /></td> 
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
  Login.getLayout = (page) => page;
}
