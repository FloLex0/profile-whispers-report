import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: IndexRedirect,
});

function IndexRedirect() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);
  return null;
}
