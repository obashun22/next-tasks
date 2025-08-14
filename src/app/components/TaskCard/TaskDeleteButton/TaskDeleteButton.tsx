"use client";

import { deleteTask, FormState } from "@/actions/task";
import { FaTrashAlt } from "react-icons/fa";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

interface TaskDeleteButtonProps {
  id: string;
}

const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = ({ id }) => {
  const deleteTaskWithId = deleteTask.bind(null, id);
  const initialState: FormState = { error: "" };
  const [state, formAction] = useActionState(deleteTaskWithId, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="hover:text-gray-700 text-lg cursor-pointer disabled:bg-gray-400"
        disabled={pending}
      >
        <FaTrashAlt className="size-5" />
      </button>
    </form>
  );
};

export default TaskDeleteButton;
