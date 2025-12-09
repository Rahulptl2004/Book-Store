import { Suspense } from "react";
import InfoBooks from "./InfoBooks";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading book...</div>}>
    <InfoBooks/>
    </Suspense>
  );
}
