import { useState } from "react";
import Button from "../../../components/button";
import { useRouter } from "next/router";
export default function addTask() {
  const router = useRouter();
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState({
      title: "N/A",
      description: "N/A",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "High",
      status: "To Do",
      assignedTo: "N/A",
    });
    const addTask = async () => {

        const getData = await fetch("/api/task");
        if (!getData.ok) {
          setError("Failed to fetch data!");
          alert("Failed to fetch data!");
          return;
        }
        const currentData = await getData.json();
      
        const highestId = Math.max(...currentData.map(task => task.id), 0);
        const newTaskWithId = { id: highestId + 1, ...newTask };
      
        const response = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTaskWithId),
        });
      
        if (!response.ok) {
          setError("Failed to create post");
          alert("Failed to create post");
          return;
        }
        else{
          alert("Task Added!");
          router.push("/main/main_display");
        }
      };      
      
    
    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
      };

    if(error != "")return <div>{error}</div>

    return (
      <div className="add-task-form">
        <div className="title"> Add Task </div>
        <div className="add-task-grid">
          <div>
            <label className="add-task-label">Title</label>
            <input 
              className="add-task-input" 
              type="text" 
              name="title" 
              placeholder="Enter title" 
              value={newTask.title} 
              onChange={handleChange} 
            />
          </div>
    
          <div>
            <label className="add-task-label">Description</label>
            <input 
              className="add-task-input" 
              type="text" 
              name="description" 
              placeholder="Enter description" 
              value={newTask.description} 
              onChange={handleChange} 
            />
          </div>
    
          <div>
            <label className="add-task-label">Due Date</label>
            <input 
              className="add-task-input" 
              type="date" 
              name="dueDate" 
              value={newTask.dueDate} 
              onChange={handleChange} 
            />
          </div>
    
          <div>
            <label className="add-task-label">Priority</label>
            <select 
              className="add-task-input" 
              name="priority" 
              value={newTask.priority} 
              onChange={handleChange}
            >
              <option key="high" value="High">High</option>
              <option key="medium" value="Medium">Medium</option>
              <option key="low" value="Low">Low</option>
            </select>
          </div>
    
          <div>
            <label className="add-task-label">Status</label>
            <select 
              className="add-task-input" 
              name="status" 
              value={newTask.status} 
              onChange={handleChange}
            >
              <option key="todo" value="To Do">To Do</option>
              <option key="inprogress" value="In Progress">In Progress</option>
              <option key="completed" value="Completed">Completed</option>
            </select>
          </div>
    
          <div>
            <label className="add-task-label">Assigned To</label>
            <input 
              className="add-task-input" 
              type="text" 
              name="assignedTo" 
              placeholder="Enter assignee" 
              value={newTask.assignedTo} 
              onChange={handleChange} 
            />
          </div>
        </div>
        <Button onClick={addTask} text="Add Task" />
      </div>
    );
    
    
}