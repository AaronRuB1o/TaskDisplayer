import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../../../components/button";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function addTask() {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR("/api/task", fetcher);
  
    const [taskData, setTaskData] = useState({});

    const task = Object.values(data || {})
    .flat()
    .find((t) => String(t.id) === String(id)) || null;

    useEffect(() => {
      if (task) {
        setTaskData(task);
      }
    }, [task]);
  
    if (error) return <div>Failed to load</div>;
    if (!data || typeof data !== "object") return <div>Loading...</div>;
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
    };

    const editTask = async () => {
        if (!editTask) return;

        const response = await fetch("/api/task", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            alert("Task updated!");
            router.push("/main/main_display");
        } else {
            alert("Failed to update task.");
        }
    };

    

    return (
        <div className="task-container">
            {task && (
            <div className="add-task-form">
                <div className="title">Edit Task</div>
                <div className="add-task-grid">
                <div>
                    <label className="add-task-label">Title</label>
                    <input 
                    className="add-task-input" 
                    type="text" 
                    name="title" 
                    placeholder="Enter title" 
                    value={taskData.title || ""} 
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
                    value={taskData.description || ""} 
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="add-task-label">Due Date</label>
                    <input 
                    className="add-task-input" 
                    type="date" 
                    name="dueDate" 
                    value={taskData.dueDate || ""} 
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="add-task-label">Priority</label>
                    <select 
                    className="add-task-input" 
                    name="priority" 
                    value={taskData.priority || "Medium"} 
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
                    value={taskData.status || "To Do"} 
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
                    value={taskData.assignedTo || ""} 
                    onChange={handleChange}
                    />
                </div>
                </div>
                <Button onClick={editTask} text="Save Changes" />
            </div>
            )}
        </div>
      );
      
    
    
}