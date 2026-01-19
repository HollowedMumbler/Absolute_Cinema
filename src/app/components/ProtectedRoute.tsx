import { useNavigate } from "react-router";
import { useSigninCheck } from "reactfire";

import { Spinner } from "@/components/ui/spinner";
import * as React from "react";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { status, data: signInCheckResult } = useSigninCheck();
  const navigate = useNavigate();

  if (status === "loading") {
    return (
      <div className="absolute -top-1/2 -left-1/2 grid min-h-screen min-w-full translate-x-1/2 translate-y-1/2 place-items-center">
        <Spinner className="text-secondary size-20" />
      </div>
    );
  }

  // if (signInCheckResult.signedIn) {
  //   navigate("/");
  // }
  //
  // if (!signInCheckResult.user) {
  //   navigate("/");
  // }
  //
  // navigate("/");

  return children;
}
