"use server"

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {z} from "zod";

export type State = {
    errors?: {
        title?: string
    },
    message?: string | null
}

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 characters is required"
    })
})

export async function create(prevState: State, formData: FormData) {
    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields"
        }
    }

    const { title } = validatedFields.data

    try {
        await db.board.create({
            data: {
                title
            }
        })
    } catch (error) {
        return {
            message: "Database error"
        }
    }

    revalidatePath("/organization/org_2Zo8DmTzEDwvkmJ83ZacU6IfYce")
    redirect("/organization/org_2Zo8DmTzEDwvkmJ83ZacU6IfYce")
}