"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { use } from "react";

interface TemplatesPageProps {
  params: Promise<{ teamId: string }>;
}
export default function TemplatesPage({ params }: TemplatesPageProps) {
  const { teamId } = use(params);

  return (
    <section className="w-full h-full p-6 scrollbar-hide overflow-y-auto">
      <div className="max-w-7xl mx-auto flex flex-col h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
          <Card className="cursor-pointer">
            <CardContent>
              <div className="w-full h-auto max-h-[300px] aspect-9/16 bg-foreground/90 rounded-lg overflow-hidden"></div>
            </CardContent>
            <CardFooter className="border-t">
              <div className="w-full">
                <div className="flex items-center w-full justify-between">
                  <span className="text-sm">Template Name</span>
                  <Button
                    className="cursor-pointer"
                    variant={"ghost"}
                    size={"icon"}
                  >
                    <MoreHorizontalIcon className="size-4 text-muted-foreground" />
                  </Button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Template Description
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card className="cursor-pointer w-full h-full">
            <CardContent className="w-full h-full">
              <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                <div className="p-4 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <PlusIcon className="size-6 text-neutral-500 dark:text-neutral-400" />
                </div>
                <span className="text text-neutral-500 dark:text-neutral-400">
                  Create New Template
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
