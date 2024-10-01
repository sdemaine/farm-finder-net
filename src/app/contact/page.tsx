"use client";

import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { Label } from 'src/components/ui/label';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

export default function Contact() {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleFormSubmit = (values: typeof initialValues, { resetForm }: any) => {
    console.log('Form submitted:', values);
    alert('Thank you for your message. We will get back to you soon!');
    resetForm(); // Reset the form after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-12 bg-white shadow-lg rounded-xl mt-10 mb-10">
      <h1 className="text-3xl font-extrabold text-center text-green-800 mb-6">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Field
                    id="name"
                    name="name"
                    as={Input}
                    placeholder="Enter your name"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Field
                    id="email"
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Field
                    id="message"
                    name="message"
                    as={Textarea}
                    placeholder="Enter your message"
                    rows={5}
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg px-4 py-2 mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 transition duration-300"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2" />
              <span>info@farmfinder.net</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>123 Farm Lane, Ruralia, NH 03456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
