import Task from "../models/Task.js";
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    // validation
    if (!title || !status || !priority || !dueDate) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const validStatuses = ["Pending", "In-process", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const validPriorities = ["High", "Medium", "Low"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }
    if (isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ message: "Invalid dueDate" });
    }
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.log("Error Details:", error.message)
    res.status(500).json({ message: "Internal Server Error. Please try again later." });
  }
};

