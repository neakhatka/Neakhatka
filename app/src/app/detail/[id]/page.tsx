"use client";
import React, { useEffect, useState, useContext } from "react";
import { Icon, Typography } from "@/components";
import { Button } from "@nextui-org/react";
import Image from "next/legacy/image";
import "../../globals.css";
import { MyContext } from "@/contexts/CardInfoContext";
import Modal from "@/components/molecules/Modal/Modal";
import { useParams } from "next/navigation";
import axios from "axios";

interface JobDetail {
  availablePositions: string;
  companyId: string;
  companyName: string;
  createdAt: string;
  duration: string;
  endDate: string;
  gender: string;
  jobDescription: string[];
  jobResponsibilities: string[];
  location: string;
  position: string;
  salary: string;
  startDate: string;
  time: string;
  totalEmployees: string;
  updatedAt: string;
  workplace: string;
  _id: string;
  [key: string]: any; // Optional: For any additional properties
}


const Detail = () => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPosts] = useState<Partial<JobDetail>>({});

  const id = params.id;

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/v1/jobs/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching card : ", error);
      }
    };

    fetchCard();
  }, [id]);

  return (
    <>
      <div className="w-full md:container mx-auto p-2 lg:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
          <div className="col-span-7 p-2 lg:py-8 lg:px-14 border rounded-lg">
            <div className="flex justify-between mt-5">
              <div>
                <Typography className="text-[#4B9960] text-[18px] md:text-[24px]">
                  {post.position}
                </Typography>
                <p>${post.salary}</p>
              </div>
              <div className="flex justify-center items-center">
                {/* <button>
                  <Icon className="mr-5" size="md" label="Star" />
                </button> */}
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-[#4B9960] outline-none text-white text-[14px] md:text-[16px]"
                >
                  Apply now
                </Button>
                <Modal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  size="lg"
                  corner="2xl"
                >
                  <div className="bg-white p-8">
                    <h1 className="flex justify-center flex-col items-center">
                      <label
                        htmlFor="uploadFile1"
                        className="bg-white text-black text-base rounded w-full py-20 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
                      >
                        <Icon label="FileUpload" />
                        <input
                          type="file"
                          id="uploadFile1"
                          className="hidden"
                        />
                        <p className="text-base text-gray-900 mt-2">
                          Drag and drop file here
                        </p>
                        <p>or</p>
                        <p className="text-blue-600">Browse your file here</p>
                      </label>
                    </h1>
                    <div className="flex flex-col text-white">
                      <Button className="mt-6 bg-[#4B9960] text-white">
                        Upload Now
                      </Button>
                      <Button
                        onClick={() => setIsOpen(false)}
                        className="mt-3 bg-white text-black border border-red-500"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <div className="mt-10 overflow-x-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <div className="col-span-2">
                  <table className="w-full border-collapse border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="w-1/2 border bg-[#F2F2F2] py-2 px-2">
                          Duration
                        </td>
                        <td className="w-1/2 border text-gray-500 py-2 px-2 capitalize">
                          {post.duration}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-span-2">
                  <table className="w-full border-collapse border">
                    <tbody>
                      <tr>
                        <td className="w-1/2 border border-l-0 outline-none bg-[#F2F2F2] py-2 px-2">
                          Location
                        </td>
                        <td className="w-1/2 border text-gray-500 py-2 px-2 capitalize">
                          {post.location}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <div className="col-span-2">
                  <table className="w-full border-collapse border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="w-1/2 border bg-[#F2F2F2] py-2 px-2">
                          Deadline
                        </td>
                        <td className="w-1/2 border text-gray-500 py-2 px-2 capitalize">
                          {post.endDate}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-span-2">
                  <table className="w-full border-collapse border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="w-1/2 border bg-[#F2F2F2] py-2 px-2">
                          Gender
                        </td>
                        <td className="w-1/2 border text-gray-500 py-2 px-2 capitalize">
                          {post.gender}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <div className="col-span-2">
                  <table className="w-full border-collapse border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="w-1/2 border bg-[#F2F2F2] py-2 px-2">
                          Internship Type
                        </td>
                        <td className="w-1/2 border text-gray-500 py-2 px-2 capitalize">
                          {post.time}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-span-2">
                  <table className="w-full border-collapse border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="w-1/2 border bg-[#F2F2F2] py-2 px-2">
                          Available Position
                        </td>
                        <td className="w-1/2 border text-gray-500 py-2 px-2 capitalize">
                          {post.availablePositions} pax
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Typography fontSize="lg">Job Descriptions</Typography>
              <Typography fontSize="sm" className="text-gray-600 mt-1">
                {post.jobDescription}
              </Typography>
            </div>
            <div className="mt-8">
              <Typography fontSize="lg">Job Responsibilities</Typography>
              <Typography fontSize="sm" className="text-gray-600 mt-1">
                <ul className="leading-10">
                  {post.jobResponsibilities ? (
                    post.jobResponsibilities.map((item, index) => (
                      <li key={index} className="list-disc ml-4">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="list-disc ml-4">
                      No responsibilities listed
                    </li>
                  )}
                </ul>
              </Typography>
            </div>
            <div className="mt-8">
              <Typography fontSize="lg">Job Requirements</Typography>
              <Typography fontSize="sm" className="text-gray-600 mt-1">
                <ul className="leading-10">
                  {post.requirements ? (
                    post.requirements.map((item, index) => (
                      <li key={index} className="list-disc ml-4">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="list-disc ml-4">No requirements listed</li>
                  )}
                </ul>
              </Typography>
            </div>
          </div>
          <div className="col-span-7 lg:col-span-3 rounded-lg py-10 px-5 border h-[500px]">
            <div className="flex justify-center items-center flex-col">
              {/* <Image
                src="/company.svg"
                alt="company logo"
                width={100}
                height={100}
                className="rounded-full mb-4"
              /> */}
              <Typography fontSize="lg" className="mt-5">
                {post.companyName}
              </Typography>
            </div>
            <div className="mt-10">
              <Typography className="leading-10 truncate">
                {post.workplace}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
