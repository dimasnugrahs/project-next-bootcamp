import Table from "@/app/user/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function UserPage() {
  const users = await db.user.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />

      <Table users={users} />
    </DefaultLayout>
  );
}
