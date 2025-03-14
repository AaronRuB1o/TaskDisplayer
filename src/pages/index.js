import Button from "../components/button";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

export default function Login() {
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await fetchData("/api/login");
        // setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    loadTasks();
  }, []);
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
            <td><input type="text"></input></td>
          </tr>
          <tr>
          <td>Password: </td>
          <td><input type="text"></input></td>
          </tr>
          <tr>
            <td colSpan = "2"><Button text="Enter" /></td> 
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
}
