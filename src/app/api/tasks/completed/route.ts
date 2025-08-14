import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const tasks: TaskDocument[] = await TaskModel.find({ isCompleted: true });
        return NextResponse.json({ message: 'タスク取得成功', tasks });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'タスク取得に失敗しました' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';