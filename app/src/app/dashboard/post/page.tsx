"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Input, Button } from "@/components";
import { FaTrash } from "react-icons/fa";
import Modal from "@/components/molecules/Modal/Modal";
import PostJob from "../edit-post/page";

interface Post {
  id: string;
  position?: string;
  salary?: string;
  duration?: string;
  endDate?: string;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Array of posts
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the backend using Axios
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/v1/jobs/profile/jobs",
          {
            withCredentials: true,
          }
        ); // Adjust the endpoint as needed
        console.log("data : ", response.data);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography fontSize="2xl">Total Post </Typography>
        <Button
          onClick={() => setIsOpen(true)}
          colorScheme="primary"
          textColor="white"
          size="sm"
          className="text-md px-4 py-2 rounded"
        >
          Create Post
        </Button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm rounded-lg">
              <th className="py-4 px-6 border-x text-left font-normal">
                Position
              </th>
              <th className="py-4 px-6 border-x text-left font-normal">
                Salary
              </th>
              <th className="py-4 px-6 border-x text-left font-normal">
                Duration
              </th>
              <th className="py-4 px-6 border-x text-left font-normal">
                Date Line
              </th>
              <th className="py-4 px-6 border-x font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {Array.isArray(posts) &&
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="py-4 px-6 text-sm">{post.position}</td>
                  <td className="py-4 px-6 text-sm">{post.salary}</td>
                  <td className="py-4 px-6 text-sm">{post.duration}</td>
                  <td className="py-4 px-6 text-sm">{post.endDate}</td>
                  <td className="py-4 px-6 flex justify-center items-center space-x-4">
                    <div className="text-blue-500 cursor-pointer">
                      <Typography fontSize="sm">Edit</Typography>
                    </div>
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Typography fontSize="sm">Delete</Typography>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="xl"
        corner="3xl"
      >
        <div className="bg-white p-8">
          <PostJob />
        </div>
      </Modal>
    </div>
  );
};

export default Post;
