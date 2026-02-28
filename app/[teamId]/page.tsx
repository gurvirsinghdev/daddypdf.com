import { redirect } from "next/navigation";

interface TeamDashboardPageProps {
  params: Promise<{ teamId: string }>;
}

export default async function TeamDashboardPage({
  params,
}: TeamDashboardPageProps) {
  const { teamId } = await params;
  return redirect(`/${teamId}/templates`);
}
