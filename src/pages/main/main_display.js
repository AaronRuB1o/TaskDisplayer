import { useState } from "react";
import useSWR from 'swr'
import Button from "../../components/button";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Main() {
  const router = useRouter();
  const { data, error } = useSWR('/api/task', fetcher, {revalidateOnFocus: true}); //Can use refreshInterval: 10000
  const statusCategories = ['To Do', 'In Progress', 'Completed'];

  const [deleteTask, setDeleteTask] = useState(null);

  const edit = (task) => {
    router.push({
      pathname: '/main/tools/edit_task',
      query: { id: task.id },
    });
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
                <td className="task-title">{task.title}</td>
                <td className="task-description">{task.description}</td>
                <td className="task-priority">{task.priority}</td>
                <td className="task-due-date">{task.dueDate}</td>
                <td className="task-actions">
                  <Button text="Edit" onClick={() => edit(task)} />
                  <Button text="Delete" onClick={() => del(task)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

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