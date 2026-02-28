"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";

const teamSettingsSchema = z.object({
  teamName: z
    .string()
    .min(1, "Please enter a team name!")
    .max(63, "Team name must be less than 63 characters!")
    .trim(),
});

interface UpdateTeamSettingsFormProps {
  teamId: string;
  teamName: string;
}

export default function UpdateTeamSettingsForm({
  teamId,
  teamName,
}: UpdateTeamSettingsFormProps) {
  const form = useForm<z.infer<typeof teamSettingsSchema>>({
    resolver: zodResolver(teamSettingsSchema),
    defaultValues: { teamName },
  });

  const updateTeamSettingsMutation = trpc.team.updateTeamSettings.useMutation({
    onSuccess() {
      toast.success("Team settings updated successfully!", {
        id: "update-team-settings",
      });
    },
    onError() {
      toast.error("An error occurred while updating your team settings.", {
        id: "update-team-settings",
      });
    },
    onMutate() {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 10000)), {
        id: "update-team-settings",
        loading: "Updating team settings...",
      });
    },
  });
  const onSubmit = async (formData: z.infer<typeof teamSettingsSchema>) => {
    updateTeamSettingsMutation.mutate({
      teamId: teamId,
      newTeamName: formData.teamName,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex items-end justify-between gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                htmlFor={field.name}
                className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Team Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="rounded w-full py-6"
                  placeholder="Enter your team's display name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-max flex items-center justify-center gap-3 px-4 py-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-900/90 dark:hover:bg-neutral-100/90 transition-all shadow-sm text-sm cursor-pointer"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
