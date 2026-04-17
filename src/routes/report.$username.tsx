import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/report/$username")({
  component: ReportRedirect,
});

function ReportRedirect() {
  const { username } = Route.useParams();
  useEffect(() => {
    window.location.replace(`/report.html?u=${encodeURIComponent(username)}`);
  }, [username]);
  return null;
}
