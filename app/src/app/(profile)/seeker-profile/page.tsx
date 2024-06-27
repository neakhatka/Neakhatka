"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, Icon } from "@/components";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "@/components/ui/button";

interface Seeker {
  name: string;
  email?: string;
  dateOfBirth?: string;
  contactNumber?: string;
  nationality?: string;
  gender?: string;
  location?: string;
  address?: string;
  educationBackground?: string[];
}

const SeekerProfile = () => {
  const [profile, setProfile] = useState<Seeker>({
    name: "",
    email: "",
    dateOfBirth: "",
    contactNumber: "",
    nationality: "",
    gender: "",
    location: "",
    address: "",
    educationBackground: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/users/profile", {
          withCredentials: true,
        });
        console.log("data:", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = async () => {
    try {
      await axios.put(`http://localhost:4000/v1/users/profile`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error update post : ", error);
    }
  };

  return (
    <>
      <div className="container xl:max-w-[1200px] bg-[#F8F9FA] rounded-xl mt-5 md:mt-10 p-5 md:px-24 md:py-10 mb-10">
        {/* top */}
        <div className="w-full flex md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/userProfile/seeker.svg"
              alt="company logo"
              width={120}
              height={120}
              className="rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
            />
            <div className="ml-4 md:ml-6">
              <Typography className="mb-1 md:mb-2 text-[18px] md:text-[24px]">
                {profile.name}
              </Typography>
              <Typography className="text-gray-400 text-[12px] md:text-[18px]">
                {profile.email}
              </Typography>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              className="bg-[#4B9960] rounded-full flex items-center justify-center gap-2 px-4 md:px-6 py-2"
              onClick={handleEditProfile}
            >
              <Icon label="Edit" className="flex items-center justify-center" />
              <span className="hidden md:block">Edit profile</span>
            </Button>
          </div>
        </div>
        {/* bottom */}
        <div className="flex flex-col md:flex-row justify-between mt-5">
          <div className="w-full">
            <div className="my-[25px]">
              <Typography fontSize="lg">Date of Birth</Typography>
              <Typography>{profile.dateOfBirth}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Contact Number</Typography>
              <Typography>{profile.contactNumber}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Nationality</Typography>
              <Typography>{profile.nationality}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Gender</Typography>
              <Typography>{profile.gender}</Typography>
            </div>
          </div>
          <div className="w-full">
            <div className="my-[25px]">
              <Typography fontSize="lg">Location</Typography>
              <Typography>{profile.location}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Address</Typography>
              <Typography>{profile.address}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg" className="mb-2">
                Education Background
              </Typography>
              {profile.educationBackground?.map((education, index) => (
                <Typography key={index} className="mb-2">
                  {education}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeekerProfile;
