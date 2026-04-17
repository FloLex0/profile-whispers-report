import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/analyzing/$username")({
  component: AnalyzingRedirect,
});

function AnalyzingRedirect() {
  const { username } = Route.useParams();
  useEffect(() => {
    window.location.replace(`/analyzing.html?u=${encodeURIComponent(username)}`);
  }, [username]);
  return null;
}
