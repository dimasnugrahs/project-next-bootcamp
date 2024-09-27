import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/user/_components/form";
import { db } from "@/lib/db";


export default async function UpdateUserPage({ params }) {
  
  const user = await db.user.findFirst({
    where: {
      id: params.userId,
    },
  })
    
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update User" />
      <Form user={user}/>
    </DefaultLayout>
  );
}