import React, { Component } from 'react';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskName: '',
      taskTime: '',
    };
  }

  handleTaskNameChange = (e) => {
    this.setState({ taskName: e.target.value });
  }

  handleTaskTimeChange = (e) => {
    this.setState({ taskTime: e.target.value });
  }

  handleAddTask = (e) => {
    e.preventDefault();
    const { taskName, taskTime } = this.state;
    if (taskName && taskTime) {
      const newTask = { name: taskName, time: taskTime };
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        taskName: '',
        taskTime: '',
      }));
    }
  }

  render() {
    const { tasks, taskName, taskTime } = this.state;

    const containerStyle = {
      backgroundColor: '#ffffe0', 
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const formStyle = {
      backgroundColor: '#b0e0e6',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      width: '80%',
      maxWidth: '400px',
    };

    const buttonStyle = {
      width: '100%',
      backgroundColor: '#0074D9',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
    };
    const stopButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'green',
      };
      const resetButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'red', 
      };
      
    const taskListStyle = {
      listStyleType: 'none',
      padding: '0',
    };

    const taskItemStyle = {
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '5px',
      margin: '10px 0',
      padding: '10px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    };

    return (
      <div style={containerStyle}>
        <h1>Time Management System</h1>
        <form id="task-form" onSubmit={this.handleAddTask} style={formStyle}>
          <label htmlFor="task-name">Ticket Name:</label>
          <input
            type="text"
            id="task-name"
            value={taskName}
            onChange={this.handleTaskNameChange}
            required
            style={{ width: '100%' }}
          />
          <label htmlFor="task-time">Time (minutes):</label>
          <input
            type="number"
            id="task-time"
            value={taskTime}
            onChange={this.handleTaskTimeChange}
            required
            style={{ width: '100%' }}
          />
          <button type="submit" style={buttonStyle}>Add Ticket</button>
        </form>

        <h2>Tasks</h2>
        <ul id="task-list" style={taskListStyle}>
          {tasks.map((task, index) => (
            <li key={index} style={taskItemStyle}>
              {task.name} ({task.time} minutes)
            </li>
          ))}
        </ul>

        <button id="start-button" style={buttonStyle}>Start</button>
        <button id="stop-button" style={stopButtonStyle}>Stop</button>
        <button id="reset-button" style={resetButtonStyle}>Reset</button>

        <p id="timer" style={{ color: 'dark blue' }}>Time Remaining: 00:00</p>
      </div>
    );
  }
}

export default Start;
