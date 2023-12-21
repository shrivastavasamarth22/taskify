import { Button } from "@/components/ui/button";
import { create } from "@/actions/create-board";
import { db } from "@/lib/db";

const OrganizationIdPage = async () => {

	const boards = await db.board.findMany();

	return (
		<div className="flex flex-col space-y-4">
			<form action={create}>
				<input
					id="title"
					name="title"
					required
					placeholder="Enter a board title"
					className="border border-black p-1"
				/>
				<Button type="submit">
					Submit
				</Button>
			</form>
			<div className="space-y-2">
				{boards.map(board => (
					<div key={board.id}>
						Board Name: {board.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default OrganizationIdPage;
