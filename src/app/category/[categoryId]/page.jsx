import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/category/_components/form";
import { db } from "@/lib/db";


export default async function UpdateCategoryPage({ params }) {
  
  const category = await db.category.findFirst({
    where: {
      id: params.categoryId,
    },
  })
    
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Category" />
      <Form category={category}/>
    </DefaultLayout>
  );
}