import TaskUpdate from './TaskUpdate'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
const TaskItem = ({ task }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTaskClick = () => {
    setIsPopupOpen(true);
  };

  const handleDeleteClick = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <div className='task'>
      <div onClick={handleTaskClick}>{new Date(task.createdAt).toLocaleString('en-US')}</div>
      <h2 onClick={handleTaskClick}>{task.text}</h2>
      <button onClick={handleDeleteClick} className='close'>
        X
      </button>
      {isPopupOpen && <TaskUpdate task={task} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};
export default TaskItem;
