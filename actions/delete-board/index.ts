"use server";

import { DeleteBoard } from "./schema";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) return { error: "Unauthorized" };

    const { id } = data;  
    let board;

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId
            },
        })
    } catch (error) {
        return { error: "Failed to update" }
    }

    revalidatePath(`/board/${id}`);

    return { data: board };
}

export const updateBoard = createSafeAction(DeleteBoard, handler)