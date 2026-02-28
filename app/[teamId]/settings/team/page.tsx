import { HydrateClient, trpc } from "@/lib/trpc/server";
import AddTeamMemberButtonAndDialog from "@/modules/dashboard/forms/add-team-member";
import UpdateTeamSettingsForm from "@/modules/dashboard/forms/update-team-settings";
import MemberListingTable from "@/modules/dashboard/ui/member-listing-table";

interface TeamsSettingsPageProps {
  params: Promise<{ teamId: string }>;
}

export default async function TeamsSettingsPage({
  params,
}: TeamsSettingsPageProps) {
  const { teamId } = await params;
  const team = await trpc.team.getTeam(teamId);
  void trpc.team.getTeamMembers.prefetch(teamId);

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
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Team Members
              </h3>
              <p className="text-sm text-neutral-500">
                Manage your team members and their roles.
              </p>
            </div>
            <AddTeamMemberButtonAndDialog teamId={teamId} />
          </div>
          <div>
            <HydrateClient>
              <MemberListingTable teamId={teamId} />
            </HydrateClient>
          </div>
        </div>
      </div>
    </section>
  );
}
