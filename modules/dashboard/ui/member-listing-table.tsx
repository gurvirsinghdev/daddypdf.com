"use client";

import { TrashIcon } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc/react";

interface MemberListingTableProps {
  teamId: string;
}
export default function MemberListingTable({
  teamId,
}: MemberListingTableProps) {
  const [teamMembers] = trpc.team.getTeamMembers.useSuspenseQuery(teamId);

  return (
    <Table className="border shadow-sm">
      <TableHeader>
        <TableRow className="bg-neutral-50 dark:bg-neutral-900">
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamMembers.map((teamMember) => (
          <TableRow key={teamMember.id}>
            <TableCell>{teamMember.email}</TableCell>
            <TableCell>
              <Select
                disabled={teamMember.role === "owner"}
                defaultValue={teamMember.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {teamMember.role === "owner" ? (
                    <SelectItem value="owner" disabled>
                      Owner
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{moment(teamMember.joinedAt).fromNow()}</TableCell>
            <TableCell>
              {teamMember.role !== "owner" && (
                <Button variant={"ghost"} size={"icon"}>
                  <TrashIcon />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
