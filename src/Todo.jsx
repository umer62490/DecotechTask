import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import DatePicker from 'react-datepicker';
import Sidebar from './Sidebar';
import {addTask, updateTask, deleteTask,reorderTask } from './redux/TaskSlice.js';
import './App.css';

const Todo = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.taskList);

  const [taskData, setTaskData] = useState({ task: '', deadline: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());


  const [error, setError] = useState('');

// Modify handleAddTask
const handleAddTask = () => {
  if (taskData.task.trim() === '') return;

  const selectedDate = new Date(taskData.deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time in comparison

  if (!taskData.deadline || selectedDate < today) {
    setError('Please select today or a future date.');
    return;
  }

  dispatch(addTask({ ...taskData, id: Date.now(), status: 'pending' }));
  setTaskData({ task: '', deadline: '' });
  setError('');
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

 

  const handleTaskCompletion = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate.status === 'pending') {
      dispatch(updateTask({ ...taskToUpdate, status: 'completed' }));
    }
  };

  const handleTaskDeletion = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // Define the getTasksByStatus function here
  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const task = tasks.find((t) => t.id === parseInt(result.draggableId));
      const updatedTask = { ...task, status: destination.droppableId };
      dispatch(updateTask(updatedTask));
    } else {
      const reordered = [...getTasksByStatus(source.droppableId)];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      dispatch(reorderTask({ status: source.droppableId, tasks: reordered }));
    }
  };

  const getTooltipContent = (date) => {
    const dateStr = date.toLocaleDateString('en-CA'); // Local formatted string
    const tasksForDate = tasks.filter((task) => task.deadline === dateStr);
    return tasksForDate.map((t) => t.task).join(', ');
  };
  
  const tileContent = ({ date }) => {
    const dateStr = date.toLocaleDateString('en-CA');
    const hasTask = tasks.some((task) => task.deadline === dateStr);
    if (hasTask) {
      return (
        <div
          data-tooltip-id="calendar-tooltip"
          data-tooltip-content={getTooltipContent(date)}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'orange',
            margin: 'auto',
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="todo-container">
      <Sidebar />
      <div className="todo-content">
        <h2 style={{ textAlign: 'center' }}>Task Manager</h2>
        <div className="todo-form">
          <input
            type="text"
            name="task"
            value={taskData.task}
            onChange={handleInputChange}
            placeholder="Enter a task"
          />
          <DatePicker
            selected={taskData.deadline ? new Date(taskData.deadline) : null}
            onChange={(date) => setTaskData({ ...taskData, deadline: date.toISOString().split("T")[0] })}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select deadline"
            className="date-picker"
          />
          <button onClick={handleAddTask}>Add Task</button>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

        </div>

        <div className="calendar-container">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
          />
          <Tooltip id="calendar-tooltip" />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="task-columns">
            {['pending', 'completed'].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div className="task-column" {...provided.droppableProps} ref={provided.innerRef}>
                    <h3>{status === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}</h3>
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4>{task.task}</h4>
                            <small>Deadline: {task.deadline}</small>
                            <div className="task-buttons">
                              {task.status === 'pending' && (
                                <>
                                  <button className="complete" onClick={() => handleTaskCompletion(task.id)}>Complete</button>
                                  <button className="delete" onClick={() => handleTaskDeletion(task.id)}>Delete</button>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Todo;



/*

react, useState, useDispatch, useSelector → React + Redux state handling.
react-beautiful-dnd → Drag & drop for tasks.  but ye properly work nhi kr rha tha koi glitch arha shyd but mai apne kanban board mai isko implement krchuka hu to i want k yhan bhi implement krksta but time lgega isme or i dont have enough time
react-calendar, react-datepicker, react-tooltip → Calendar, date picking, tooltips for enhanced UI.
react-datepicker: selects deadline date.
 Validation: ensures task is not empty and deadline is today or future.
calendar ka kaam ye hai k Shows all dates in calendar.
If any task exists on a date, a small orange dot is shown.
Hovering on it shows task(s) for that date using react-tooltip
asks are displayed in two columns:
Pending Tasks
Completed Tasks
Each task is:
Draggable → can be dragged between columns.
Droppable → column accepts tasks via DnD.
If dragged between columns → update status.
If dragged within same column → reorder tasks.
mai task ko sirf pending position mai hi delete krskta hu,not in completed position mai.
*/