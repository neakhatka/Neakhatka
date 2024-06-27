import React from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms/Typography";
import EditProfile from "./editProfile"; // Make sure the path is correct
import { cookies } from "next/headers";
import axios from "axios";

async function getProfileCompany() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  const sigSession = cookieStore.get("session.sig");

  try {
    const response = await axios.get(
      "http://localhost:4000/v1/companies/profile",
      {
        withCredentials: true, // Include cookies if needed!
        headers: {
          Cookie: ` ${session!.name}=${session!.value}; ${sigSession!.name}=${
            sigSession!.value
          }`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(`getProfileCompany() Method error: `, error);
    return undefined;
  }
}

const EmployerProfile = async () => {
  const result = await getProfileCompany();
  console.log("result company: ", result);

  const getDisplayValue = (value: string | number) => {
    return value ? value : "N/A";
  };

  return (
    <>
      <div className="container xl:max-w-[1200px] bg-[#F8F9FA] rounded-xl mt-5 px-10 py-5">
        <div className="w-full flex md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/"
              alt="company logo"
              width={80}
              height={80}
              className="rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
            />
            <div className="ml-4 md:ml-6">
              <Typography className="mb-1 md:mb-2 text-[18px] md:text-[20px] capitalize">
                {getDisplayValue(result?.companyname)}
              </Typography>
              <Typography className="text-gray-400 text-[12px] md:text-[16px]">
                {getDisplayValue(result?.contactemail)}
              </Typography>
            </div>
          </div>
          <div className="flex items-center">
            <EditProfile />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-5">
          <div className="w-full">
            <div className="my-[25px]">
              <Typography fontSize="lg">Contact Email</Typography>
              <Typography>{getDisplayValue(result?.contactemail)}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Contact Number</Typography>
              <Typography>{getDisplayValue(result?.contactphone)}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Contact Person</Typography>
              <Typography>{getDisplayValue(result?.contactPerson)}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Website</Typography>
              <Typography>{getDisplayValue(result?.websitelink)}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Employees</Typography>
              <Typography>
                {getDisplayValue(result?.numberOfemployees)}
              </Typography>
            </div>
          </div>
          <div className="w-full">
            <div className="my-[25px]">
              <Typography fontSize="lg">Location</Typography>
              <Typography>{getDisplayValue(result?.location)}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Address</Typography>
              <Typography>{getDisplayValue(result?.address)}</Typography>
            </div>
            <div className="my-[25px]">
              <Typography fontSize="lg">Company Description</Typography>
              <Typography>
                {getDisplayValue(result?.companydescription)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerProfile;
