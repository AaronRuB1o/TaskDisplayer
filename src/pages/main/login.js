import Button from "../../components/button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState(null);
  // useEffect(() => {
  //   async function loadDetails() {
  //     try {
  //       let response = await fetch('/api/login');
  //       // console.log(await response.json());
  //     } catch (error) {
  //       console.error("Error fetching details:", error);
  //     }
  //   }
  //   loadDetails()
  // }, []);

  const authenticate = async () => {
    console.log(username);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password
      }),
    });
  
    const result = await response.json();
    console.log(result);
    router.push("/main/main_display");
  };

  return (
    <div className="main">
      <div className="title"> Login </div>
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
}
