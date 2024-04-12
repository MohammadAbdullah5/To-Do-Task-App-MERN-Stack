// TaskPopup.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../features/tasks/taskSlice";

const TaskUpdate = ({ task, onClose }) => {
  const [updatedText, setUpdatedText] = useState(task.text);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: task._id, text: updatedText }));
    onClose();
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <input
          id="text"
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          placeholder="Enter updated task"
        />
        <div className="btn-container">
          <button type="submit" className="btn">
            Update Task
          </button>
          <button onClick={onClose} className="btn btn-close">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdate;
