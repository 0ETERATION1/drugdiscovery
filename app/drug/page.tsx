import { Suspense } from "react";
import ClientDrugPage from "./ClientDrugPage";

export default function DrugPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <ClientDrugPage />
      </Suspense>
    </div>
  );
}
