import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ModalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-2xl font-bold">≡</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Menu</DialogTitle>
          <DialogDescription>
            Navigate to different sections of FarmFinder
          </DialogDescription>
        </DialogHeader>
        <nav className="flex flex-col space-y-4">
          <Button variant="ghost" className="text-lg justify-start" onClick={() => handleNavigate('/')}>Home</Button>
          <Button variant="ghost" className="text-lg justify-start" onClick={() => handleNavigate('/about')}>About</Button>
          <Button variant="ghost" className="text-lg justify-start" onClick={() => handleNavigate('/contact')}>Contact</Button>
        </nav>
      </DialogContent>
    </Dialog>
  );
}