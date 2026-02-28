"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
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
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const inviteTeamMemberSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

interface AddTeamMemberButtonAndDialogProps {
  teamId: string;
}
export default function AddTeamMemberButtonAndDialog({
  teamId,
}: AddTeamMemberButtonAndDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof inviteTeamMemberSchema>>({
    resolver: zodResolver(inviteTeamMemberSchema),
    defaultValues: { email: "" },
  });

  const addTeamMemberMutation = trpc.team.inviteTeamMember.useMutation({
    onMutate() {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 10000)), {
        id: "invite-team-member",
        loading: "Inviting member...",
      });
    },
    onSuccess() {
      form.reset();
      setOpen(false);
      toast.success("Member invited successfully!", {
        id: "invite-team-member",
        description: "The member will receive an email invitation shortly.",
      });
    },
    onError(error) {
      toast.error(error.message, {
        id: "invite-team-member",
      });
    },
  });
  const onSubmit = async (formData: z.infer<typeof inviteTeamMemberSchema>) => {
    addTeamMemberMutation.mutate({
      teamId: teamId,
      email: formData.email,
    });
  };

  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="py-6 cursor-pointer"
      >
        <PlusIcon />
        <span>Invite Member</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
              Invite a new member to your team.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor={field.name}
                      className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="rounded w-full py-6"
                        placeholder="name@company.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={addTeamMemberMutation.isPending}
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-900/90 dark:hover:bg-neutral-100/90 transition-all shadow-sm text-sm cursor-pointer"
              >
                {addTeamMemberMutation.isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <React.Fragment>
                    <PlusIcon />
                    <span>Invite</span>
                  </React.Fragment>
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
