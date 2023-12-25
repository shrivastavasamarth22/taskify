import { db } from "@/lib/db";

const OrganizationIdPage = async () => {
	const boards = await db.board.findMany();

	return (
		<div className="flex flex-col space-y-4">
			<h1>Hello</h1>
		</div>
	);
};

export default OrganizationIdPage;
