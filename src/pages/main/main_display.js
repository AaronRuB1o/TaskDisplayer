import { useState } from "react";
import useSWR from 'swr'
import Button from "../../components/button";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Main() {
  const router = useRouter();
  const { data, error } = useSWR('/api/task', fetcher);
  const statusCategories = ['To Do', 'In Progress', 'Completed'];

  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const edit = (task) => {
    setEditTask(task);
    setDescription(task.description);
    setTitle(task.title);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setStatus(task.status);
  };
  const del = (task) => {
    setDeleteTask(task);
  };

  const handleDelete = async () => {
    if (!deleteTask) return;

    const response = await fetch("/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteTask),
    });

    if (response.ok) {
      alert("Task Deleted");
      setDeleteTask(null);
    } else {
      alert("Task Failed to Delete");
    }

  };

  const handleEdit = async () => {
    if (!editTask) return;

    const updatedTask = {
      id: editTask.id,
      title,
      description,
      dueDate,
      priority,
      status,
    };

    const response = await fetch("/api/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      alert("Task updated!");
      setEditTask(null);
      setDescription("");
      setTitle("");
      setDueDate("");
      setPriority("");
      setStatus("");
    } else {
      alert("Failed to update task.");
    }
  };


      if (error) return <div>Failed to load</div>
      if (!data) return <div>Loading...</div>
      return (
        <div className="task-container">
          {statusCategories.map((status) => (
            <table key={status} className="task-table">
              <tbody>
              <tr colSpan="5"><td className="task-header w-full">{status}</td></tr>
              <tr className="task-row-header">
                <td className="">Title</td>
                <td className="">Description</td>
                <td className="">Priority</td>
                <td className="">Due Date</td>
                <td className="">Actions</td>
              </tr>
              {data
                .filter((task) => task.status === status)
                .map((task) => (
                  <tr key={task.id} className="task-row">
                    <td className="task-title">{task.title}</td> {/* Task Title */}
                    <td className="task-description">{task.description}</td> {/* Description */}
                    <td className="task-priority">{task.priority}</td> {/* Priority */}
                    <td className="task-due-date">{task.dueDate}</td> {/* Due Date */}
                    <td className="task-actions">
                      <Button text="Edit" onClick={() => edit(task)} />
                      <Button text="Delete" onClick={() => del(task)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      
          {editTask && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h2 className="modal-title">Edit Task</h2>
      
                <input
                  type="text"
                  className="modal-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task Title"
                />
      
                <textarea
                  className="modal-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task Description"
                />
      
                <input
                  type="date"
                  className="modal-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
      
                <select
                  className="modal-input"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
      
                <select
                  className="modal-input"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
      
                <div className="modal-buttons">
                  <Button onClick={handleEdit} text="Save Changes" />
                  <Button onClick={() => setEditTask(null)} text ="Cancel"/>
                </div>
              </div>
            </div>
          )}
      
          {deleteTask && (
            <div className="modal-overlay">
              <div className="modal-box">
                <div>Are you sure you want to delete?</div>
                <div className="modal-buttons">
                <Button onClick={handleDelete} text="Yes" />
                <Button onClick={() => setDeleteTask(null)} text="No"/>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}