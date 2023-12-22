import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/actions/delete-board";

interface BoardProps {
	id: string;
	title: string;
}

export const Board = ({ id, title }: BoardProps) => {
	const deleteBoardWithId = deleteBoard.bind(null, id);

	return (
		<form action={deleteBoardWithId} className="flex items-center gap-x-2">
			<p>Board Name: {title}</p>
			<Button type="submit" variant="destructive" size="sm">
				Delete
			</Button>
		</form>
	);
};
