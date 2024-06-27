// EditProfile.js
'use client'
import React, { useState } from "react";
import Modal from "@/components/molecules/Modal/Modal";
import EditEmployer from "@/app/dashboard/edit-employer/page";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-[#4B9960] rounded-full flex items-center justify-center gap-2 px-4 md:px-6 py-2"
      >
        <Icon label="Edit" className="flex items-center justify-center" />
        <span className="hidden md:block">Edit profile</span>
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl" corner="3xl">
        <div className="bg-white p-8">
          <h1 className="flex justify-center flex-col items-center">
            <EditEmployer onClose={handleClose} />
          </h1>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;
