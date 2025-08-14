import { TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDB();
        const { id } = await params;
        const task = await TaskModel.findById(id);
        if (!task) {
            return NextResponse.json({ message: 'タスクが見つかりません' }, { status: 404 });
        }
        return NextResponse.json({ message: 'タスク取得に成功しました', task });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'タスク取得に失敗しました' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';