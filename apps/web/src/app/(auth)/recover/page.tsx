import type { Metadata } from "next";
import { RecoverFlow } from "./recover-flow";

export const metadata: Metadata = {
  title: "Account recovery · Wicky",
  description: "Get a link to set a new password.",
};

export default function RecoverPage() {
  return <RecoverFlow />;
}
