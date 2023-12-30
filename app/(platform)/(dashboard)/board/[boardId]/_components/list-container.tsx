"use client";
import { useEffect, useState } from "react";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
    boardId: string;
    data: ListWithCards[];
}

export const ListContainer = ({
    boardId,
    data
}: ListContainerProps) => {
    // used to order the lists locally and then send the order to the server for a good UX
    const [orderedData, setOrderedData] = useState(data);

    // update the orderedData when the data changes
    useEffect(() => {
        setOrderedData(data)
    }, [data])

    return (
        <ol
            className="flex gap-x-3 h-full"
        >
            {orderedData.map((list, index) => (
                <ListItem 
                    key={list.id}
                    index={index}
                    data={list}
                />
            ))}
            <ListForm />
            <div 
                className="flex-shrink-0 w-1"
            />
        </ol>
    )
}