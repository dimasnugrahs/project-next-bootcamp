import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/user/_components/form";
export default function CreateUserPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create User" />
      <Form />
    </DefaultLayout>
  );
}
