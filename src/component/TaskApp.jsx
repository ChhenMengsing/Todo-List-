import React from "react";
import { useState, useEffect } from "react";
const TaskApp = () => {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever the task list changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handler for adding a task
  const addTask = () => {
    const taskText = taskInput.trim();
    // Check if task is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Add task to the state
    setTasks([...tasks, { text: taskText, completed: false }]);
    setTaskInput(""); // Clear the input after adding
  };

  // Handler for keydown event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  // Handler for toggling completion status
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Handler for removing a task
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add A Task Here!"
        />

        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <button
              className="button-complete"
              onClick={() => toggleComplete(index)}
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <span
              className={task.completed ? "tasktext completed" : "tasktext"}
            >
              {task.text}
            </span>

            <button className="remove-button" onClick={() => removeTask(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;
