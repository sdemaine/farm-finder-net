import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { Label } from 'src/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  // TODO: Add form validation
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
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
