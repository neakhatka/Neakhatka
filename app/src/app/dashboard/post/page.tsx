'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button } from "@/components";
import Modal from "@/components/molecules/Modal/Modal";
import PostJob from "../edit-post/page";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  _id: string;
  position?: string;
  salary?: string;
  duration?: string;
  endDate?: string;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedPostData, setUpdatedPostData] = useState<Partial<Post>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/v1/jobs/profile/jobs",
          {
            withCredentials: true,
          }
        );
        console.log("data : ", response.data);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:4000/v1/jobs/${postId}`, {
        withCredentials: true,
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast({
        variant: "default",
        title: "Post Deleted",
        description: "The post has been successfully deleted.",
        className: "bg-green-600 text-white top-0",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem deleting the post.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleEdit = async (postId: string, updatedData: Partial<Post>) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/v1/jobs/${postId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      const updatedPost = response.data; // Assuming backend returns updated post data

      // Update the posts state with the updated post
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );

      toast({
        variant: "default",
        title: "Post Updated",
        description: "The post has been successfully updated.",
        className: "bg-green-600 text-white top-0",
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem updating the post.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography fontSize="2xl">Total Post</Typography>
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
                <tr key={post._id}>
                  <td className="py-4 px-6 text-sm">{post.position}</td>
                  <td className="py-4 px-6 text-sm">${post.salary}</td>
                  <td className="py-4 px-6 text-sm">{post.duration} months</td>
                  <td className="py-4 px-6 text-sm">{post.endDate}</td>
                  <td className="py-4 px-6 flex justify-center items-center space-x-4">
                    <div
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        setIsOpen(true);
                        setUpdatedPostData(post); // Ensure `updatedPostData` contains the correct fields for updating
                      }}
                    >
                      <Typography fontSize="sm">Edit</Typography>
                    </div>
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            "Are you sure you want to delete this post?"
                          )
                        ) {
                          handleDelete(post._id);
                        }
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
