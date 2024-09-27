import Form from "@/app/product/_components/form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export default async function UpdateProductPage({params}) {
  const product = await db.product.findFirst({
    where: {
      id: params.productId,
    },
  });

  const category = await db.category.findMany()

  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Product" />
      <Form product={product} categories={category} />
    </DefaultLayout>
  );
}
