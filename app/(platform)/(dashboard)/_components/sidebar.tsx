"use client";

import { NavItem, Organization } from "./nav-item";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocalStorage } from "usehooks-ts";

interface SidebarProps {
	storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
	const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
		storageKey,
		{}
	);

	const { organization: activeOrganization, isLoaded: isLoadedOrg } =
		useOrganization();

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	// Expanded is an object in the form of { [id]: boolean } which is not compatible with the Accordion componen
	// We need to convert it to an array of ids
	// The following converts { [id]: boolean } to [id] if boolean is true
	const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
		(acc: string[], key: string) => {
			if (expanded[key]) {
				acc.push(key);
			}

			return acc;
		},
		[]
	);

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !curr[id],
		}));
	};

	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<div className="flex items-center justify-between mb-2">
					<Skeleton className="h-10 w-[50%]" />
					<Skeleton className="h-10 w-10" />
				</div>
				<div className="space-y-2">
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
		);
	}

	return (
		<>
			<div className="font-medium text-xs flex items-center mb-1">
				<span className="pl-4">Workspaces</span>
				<Button
					type="button"
					size="icon"
					variant="ghost"
					className="ml-auto"
					asChild
				>
					<Link href="/select-org">
						<PlusIcon className="w-4 h-4" />
					</Link>
				</Button>
			</div>
			<Accordion
				type="multiple"
				defaultValue={defaultAccordionValue}
				className="space-y-2"
			>
				{userMemberships.data.map(({ organization }) => (
					<NavItem
						key={organization.id}
						isActive={activeOrganization?.id === organization.id}
						isExpanded={expanded[organization.id]}
						organization={organization as Organization}
						onExpand={onExpand}
					/>
				))}
			</Accordion>
		</>
	);
};
