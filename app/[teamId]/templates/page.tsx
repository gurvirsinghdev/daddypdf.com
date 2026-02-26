"use client";

import { use } from "react";

interface TemplatesPageProps {
  params: Promise<{ teamId: string }>;
}
export default function TemplatesPage({ params }: TemplatesPageProps) {
  const { teamId } = use(params);

  return <span>{teamId}</span>;
}
