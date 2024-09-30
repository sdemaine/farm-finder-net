"use client"

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Leaf, Users, TrendingUp, ShieldCheck, Search } from 'lucide-react';

interface BenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BenefitsModal: React.FC<BenefitsModalProps> = ({ isOpen, onClose }) => {
  const freeFeatures = [
    {
      icon: <Search className="w-8 h-8 text-blue-500" />,
      title: 'Find Local Farms',
      description: 'Easily search and discover farms in your area.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: 'View Farm Products',
      description: 'See what each farm offers before you visit.',
    },
  ];

  const memberBenefits = [
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: 'Exclusive Events',
      description: 'Join farm tours, workshops, and local food events.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: 'Early Access',
      description: 'Get first dibs on seasonal and limited-quantity products.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
      title: 'Verified Reviews',
      description: 'Access and contribute to member-only farm reviews.',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>FarmFinder.net Features</DialogTitle>
          <DialogDescription>
            Discover the benefits of using FarmFinder.net and becoming a member.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3 className="font-semibold text-lg">Free for Everyone:</h3>
          {freeFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              {feature.icon}
              <div>
                <h4 className="font-semibold">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
          
          <h3 className="font-semibold text-lg mt-4">Member Benefits:</h3>
          {memberBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              {benefit.icon}
              <div>
                <h4 className="font-semibold">{benefit.title}</h4>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-2 sm:mb-0">
            Basic features are always free. Upgrade for more benefits!
          </p>
          <div>
            <Button onClick={onClose} variant="outline" className="mr-2">Close</Button>
            <Button onClick={() => {
              // TODO: Implement sign-up logic
              console.log('Sign up clicked');
              onClose();
            }}>Become a Member</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitsModal;