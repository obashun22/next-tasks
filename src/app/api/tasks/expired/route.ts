import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const currentDate = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
        const tasks: TaskDocument[] = await TaskModel.find({ isCompleted: false, dueDate: { $lt: currentDate } });
        return NextResponse.json({ message: 'タスク取得成功', tasks });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'タスク取得に失敗しました' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';