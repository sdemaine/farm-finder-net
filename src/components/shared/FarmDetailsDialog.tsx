"use client";

import React from 'react';
import { Dialog, DialogContent, DialogTitle } from 'src/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from 'src/components/ui/button';
import { RotateCw, Star } from 'lucide-react';
import ReactCardFlip from 'react-card-flip';
import { Farm } from '../../types/Farm';

interface FarmDetailsDialogProps {
  selectedFarm: Farm | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isCardFlipped: boolean;
  handleCardFlip: () => void;
}

const FarmDetailsDialog: React.FC<FarmDetailsDialogProps> = ({
  selectedFarm,
  isModalOpen,
  setIsModalOpen,
  isCardFlipped,
  handleCardFlip,
}) => {
  const FrontCard = () => (
    <div className="card-face p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{selectedFarm?.name}</h2>
        {selectedFarm?.preferred && <Star className="h-5 w-5 text-yellow-400" />}
      </div>
      <div className="mt-2">
        <p>
          <strong>Location:</strong> {selectedFarm?.city}, {selectedFarm?.state}
        </p>
        <p>
          <strong>Distance:</strong> {selectedFarm?.miles} miles
        </p>
        <p>
          <strong>Products:</strong> {selectedFarm?.products.join(', ')}
        </p>
        {selectedFarm?.preferred && (
          <p className="text-yellow-600 font-semibold mt-2">Preferred Farm</p>
        )}
      </div>
      {selectedFarm?.preferred && (
        <Button
          className="absolute bottom-4 right-4"
          variant="outline"
          size="sm"
          onClick={handleCardFlip}
        >
          <RotateCw className="h-4 w-4 mr-2" />
          More Info
        </Button>
      )}
    </div>
  );

  const BackCard = () => (
    <div className="card-face p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">
          {selectedFarm?.name} - Additional Info
        </h2>
        {selectedFarm?.preferred && <Star className="h-5 w-5 text-yellow-400" />}
      </div>
      <div className="mt-2 space-y-2">
        <p>
          <strong>Description:</strong> {selectedFarm?.description}
        </p>
        <p>
          <strong>Founded:</strong> {selectedFarm?.foundedYear}
        </p>
        <p>
          <strong>Farm Size:</strong> {selectedFarm?.farmSize}
        </p>
        <p>
          <strong>Certifications:</strong> {selectedFarm?.certifications?.join(', ')}
        </p>
        <p>
          <strong>Contact Email:</strong> {selectedFarm?.contactEmail}
        </p>
        <p>
          <strong>Phone Number:</strong> {selectedFarm?.phoneNumber}
        </p>
      </div>
      <Button
        className="absolute bottom-4 right-4"
        variant="outline"
        size="sm"
        onClick={handleCardFlip}
      >
        <RotateCw className="h-4 w-4 mr-2" />
        Back
      </Button>
    </div>
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <VisuallyHidden>
          <DialogTitle>{selectedFarm?.name} - Farm Details</DialogTitle>
        </VisuallyHidden>
      <DialogContent className="sm:max-w-[425px] p-0">
        
        <ReactCardFlip isFlipped={isCardFlipped} flipDirection="horizontal">
          <FrontCard />
          <BackCard />
        </ReactCardFlip>
        <Button
          className="absolute top-2 right-2 z-20"
          variant="ghost"
          size="icon"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FarmDetailsDialog;
