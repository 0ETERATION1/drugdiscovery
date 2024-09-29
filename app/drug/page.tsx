import Link from "next/link";

export default function DrugPage() {
  return (
    <div>
      <h1>Drug Page</h1>
      <Link href="/create-sample">
        <button>Create Sample</button>
      </Link>
    </div>
  );
}
