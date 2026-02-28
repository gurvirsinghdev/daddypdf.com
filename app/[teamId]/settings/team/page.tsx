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
import { trpc } from "@/lib/trpc/server";
import UpdateTeamSettingsForm from "@/modules/dashboard/forms/update-team-settings";
import { TrashIcon } from "lucide-react";
import moment from "moment";

interface TeamsSettingsPageProps {
  params: Promise<{ teamId: string }>;
}

export default async function TeamsSettingsPage({
  params,
}: TeamsSettingsPageProps) {
  const { teamId } = await params;
  const [team, teamMembers] = await Promise.all([
    trpc.team.getTeam(teamId),
    trpc.team.getTeamMembers(teamId),
  ]);

  return (
    <section className="w-full h-full p-6 scrollbar-hide overflow-y-auto">
      <div className="max-w-7xl mx-auto flex flex-col h-full gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Team Settings
            </h3>
            <p className="text-sm text-neutral-500">
              Manage your team&apos;s display name.
            </p>
          </div>
          <div>
            <UpdateTeamSettingsForm teamId={teamId} teamName={team.name} />
          </div>
        </div>

        <hr className="bg-neutral-200 dark:bg-neutral-800 h-0.5 rounded border-none" />

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Team Members
            </h3>
            <p className="text-sm text-neutral-500">
              Manage your team members and their roles.
            </p>
          </div>
          <div>
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
                    <TableCell>
                      {moment(teamMember.joinedAt).fromNow()}
                    </TableCell>
                    <TableCell>
                      <Button variant={"ghost"} size={"icon"}>
                        <TrashIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
