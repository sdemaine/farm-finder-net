"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Form validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Farm name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  contactName: Yup.string().required("Contact name is required"),
  contactEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contactPhone: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number is not valid. It must include country code (e.g., +1)"
    )
    .required("Phone number is required"),
});

export default function FarmDetail() {
  const router = useRouter();

  const initialValues = {
    name: "",
    description: "",
    location: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  };

  const handleFormSubmit = (values: typeof initialValues) => {
    // Add form submission logic here, like an API call
    console.log("Form values:", values);
    router.push("/farm-admin/dashboard"); // Redirect after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-12 bg-white shadow-lg rounded-xl mt-10 mb-10">
      <h1 className="text-3xl font-extrabold text-center text-green-800 mb-6">
        Update Farm Information
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-8">
            {/* Farm Name */}
            <div>
              <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
                Farm Name
              </Label>
              <Field
                name="name"
                as={Input}
                placeholder="Enter your farm name"
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
              />
            </div>

            {/* Farm Description */}
            <div>
              <Label htmlFor="description" className="text-lg font-semibold text-gray-700">
                Farm Description
              </Label>
              <Field
                name="description"
                as={Textarea}
                rows={5}
                placeholder="Enter a description for your farm"
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-lg font-semibold text-gray-700">
                Location
              </Label>
              <Field
                name="location"
                as={Input}
                placeholder="Enter farm location"
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
              />
            </div>

            {/* Contact Name */}
            <div>
              <Label htmlFor="contactName" className="text-lg font-semibold text-gray-700">
                Contact Name
              </Label>
              <Field
                name="contactName"
                as={Input}
                placeholder="Enter the contact person's name"
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
              <ErrorMessage
                name="contactName"
                component="div"
                className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
              />
            </div>

            {/* Contact Email */}
            <div>
              <Label htmlFor="contactEmail" className="text-lg font-semibold text-gray-700">
                Contact Email
              </Label>
              <Field
                name="contactEmail"
                type="email"
                as={Input}
                placeholder="Enter contact email"
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
              <ErrorMessage
                name="contactEmail"
                component="div"
                className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <Label htmlFor="contactPhone" className="text-lg font-semibold text-gray-700">
                Contact Phone
              </Label>
              <Field
                name="contactPhone"
                type="tel"
                as={Input}
                placeholder="Enter contact phone number"
                className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
              <ErrorMessage
                name="contactPhone"
                component="div"
                className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 transition duration-300"
                disabled={isSubmitting || !dirty || !isValid}
              >
                {isSubmitting ? "Updating..." : "Update Farm Information"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
