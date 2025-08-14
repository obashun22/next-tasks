'use server';

import { Task, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { redirect } from "next/navigation";

export interface FormState {
    error: string;
}

export const createTask = async (state: FormState, formData: FormData): Promise<FormState> => {
    const newTask: Task = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        dueDate: formData.get("dueDate") as string,
        isCompleted: false,
    };

    try {
        await connectDB();
        await TaskModel.create(newTask);
    } catch {
        return {
            error: "タスクの作成に失敗しました",
        };
    }

    redirect("/");
}

export const updateTask = async (id: string, state: FormState, formData: FormData): Promise<FormState> => {
    const updateTask: Task = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        dueDate: formData.get("dueDate") as string,
        isCompleted: Boolean(formData.get("isCompleted")),
    };

    try {
        await connectDB();
        await TaskModel.updateOne({ _id: id }, updateTask);
    } catch {
        return {
            error: "タスクの更新に失敗しました",
        };
    }

    redirect("/");
}

export const deleteTask = async (id: string): Promise<FormState> => {
    try {
        await connectDB();
        await TaskModel.deleteOne({ _id: id });
    } catch {
        return {
            error: "タスクの削除に失敗しました",
        };
    }

    redirect("/");
}

