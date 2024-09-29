import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Importing icons from react-lucide
import { 
  Settings, 
  ShoppingCart, 
  Users, 
  Star, 
  Layout, 
  Package, 
  FileText, 
  Image, 
  MapPin, 
  Info, 
  Mail 
} from 'lucide-react';

export function ModalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAppAdminOpen, setIsAppAdminOpen] = useState(false); // State for AppAdmin sub-menu
  const [isFarmAdminOpen, setIsFarmAdminOpen] = useState(false); // State for FarmAdmin sub-menu
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
          {/* App Admin Section */}
          <Button
            variant="ghost"
            className="text-lg justify-start font-bold flex items-center"
            onClick={() => setIsAppAdminOpen(!isAppAdminOpen)}
          >
            <Settings className="mr-2" /> {/* Icon for App Admin */}
            App Admin {isAppAdminOpen ? '▲' : '▼'}
          </Button>

          {isAppAdminOpen && (
            <div className="ml-4 flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/app-admin/products')}
              >
                <ShoppingCart className="mr-2" /> {/* Icon for Products */}
                Products
              </Button>
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/app-admin/farm-owners')}
              >
                <Users className="mr-2" /> {/* Icon for Farm Owners */}
                Farm Owners
              </Button>
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/app-admin/farmSpotlight')}
              >
                <Star className="mr-2" /> {/* Icon for Farm Spotlight */}
                Farm Spotlight
              </Button>
            </div>
          )}

          {/* Farm Admin Section */}
          <Button
            variant="ghost"
            className="text-lg justify-start font-bold flex items-center"
            onClick={() => setIsFarmAdminOpen(!isFarmAdminOpen)}
          >
            <Layout className="mr-2" /> {/* Icon for Farm Admin */}
            Farm Admin {isFarmAdminOpen ? '▲' : '▼'}
          </Button>

          {isFarmAdminOpen && (
            <div className="ml-4 flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/farm-admin/dashboard')}
              >
                <Layout className="mr-2" /> {/* Icon for Dashboard */}
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/farm-admin/products')}
              >
                <Package className="mr-2" /> {/* Icon for Farm Products */}
                Farm Products
              </Button>
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/farm-admin/farm-detail')}
              >
                <FileText className="mr-2" /> {/* Icon for Farm Detail */}
                Farm Detail
              </Button>
              <Button
                variant="ghost"
                className="text-lg justify-start flex items-center"
                onClick={() => handleNavigate('/farm-admin/farm-gallery-upload')}
              >
                <Image className="mr-2" /> {/* Icon for Farm Gallery */}
                Farm Gallery Upload
              </Button>
            </div>
          )}

          <Button variant="ghost" className="text-lg justify-start flex items-center" onClick={() => handleNavigate('/')}>
            <MapPin className="mr-2" /> {/* Icon for Map */}
            Map
          </Button>
          <Button variant="ghost" className="text-lg justify-start flex items-center" onClick={() => handleNavigate('/about')}>
            <Info className="mr-2" /> {/* Icon for About */}
            About
          </Button>
          <Button variant="ghost" className="text-lg justify-start flex items-center" onClick={() => handleNavigate('/contact')}>
            <Mail className="mr-2" /> {/* Icon for Contact */}
            Contact
          </Button>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
