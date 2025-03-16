export default function handler(req, res) {
    const data = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === data.id);

    if (req.method === "GET") {
      res.status(200).json(tasks);
    } 
  
    else if (req.method === "PUT"){

      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
      }
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...data,
      };
  
      res.status(200).json({ message: "Task updated", task: tasks[taskIndex] });
    }

    else if (req.method === "POST"){
      tasks = [...tasks, data];
      res.status(200).json(tasks);
    }

    else if (req.method === "DELETE"){
      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
      }
      tasks.splice(taskIndex, 1);
      res.status(200).json({ message: "Task Deleted"});


    }
    
    else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  
  var tasks = [
    {
      id: 1,
      title: "Complete Next.js Authentication",
      description: "Implement login and logout functionality using JWT.",
      dueDate: "2025-03-20",
      priority: "High",
      status: "To Do",
      assignedTo: "John Doe",
      createdAt: "2025-03-15",
    },
    {
      id: 2,
      title: "Design Homepage UI",
      description: "Create a responsive UI for the homepage.",
      dueDate: "2025-03-18",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Jane Smith",
      createdAt: "2025-03-14",
    },
    {
      id: 3,
      title: "Database Schema Setup",
      description: "Design and implement the database schema for tasks.",
      dueDate: "2025-03-22",
      priority: "High",
      status: "Completed",
      assignedTo: "Mike Johnson",
      createdAt: "2025-03-12",
    },
    {
      id: 4,
      title: "Create API Endpoints",
      description: "Develop REST API endpoints for task management.",
      dueDate: "2025-03-25",
      priority: "High",
      status: "To Do",
      assignedTo: "Alice Brown",
      createdAt: "2025-03-16",
    },
    {
      id: 5,
      title: "Test Application Features",
      description: "Perform unit and integration testing for all features.",
      dueDate: "2025-03-24",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "John Doe",
      createdAt: "2025-03-15",
    },
    {
      id: 6,
      title: "Deploy Application",
      description: "Deploy the application to a cloud server.",
      dueDate: "2025-03-30",
      priority: "Low",
      status: "To Do",
      assignedTo: "Jane Smith",
      createdAt: "2025-03-17",
    },
  ];
  