const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div>Header</div>
			<div>{children}</div>
			<div>Footer</div>
		</div>
	);
};

export default DashboardLayout;
