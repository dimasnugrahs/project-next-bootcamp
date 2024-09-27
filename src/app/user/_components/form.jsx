"use client";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Form({ user }) {
  const router = useRouter();
  const [form, setForm] = useState(
    user
      ? {
          name: user.name,
          password: user.password,
          email: user.email,
          role: user.role,
        }
      : {
          name: "",
          password: "",
          email: "",
          role: "",
        },
  );
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("currentUser");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (user) {
        // PATCH request jika user sudah ada (edit user)
        await axios.patch(
          `/api/users/${user.id}`,
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
      } else {
        // POST request jika user baru (tambah user)
        await axios.post(
          `/api/auth/sign-up`,
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
      }

      // Arahkan kembali ke halaman user setelah submit
      router.push("/user");
      router.refresh();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err?.message || err,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Form</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Name
            </label>
            <input
              disabled={isLoading}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              disabled={isLoading}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <input
              disabled={isLoading}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Role
            </label>
            <input
              disabled={isLoading}
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
