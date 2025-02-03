import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBugById, commentOnBug, deleteBug } from "../api/bugApi";
import FileAttachmentViewer from "../components/FileAttachmentViewer";

const BugDetails = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [bug, setBug] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBugDetails();
    }
  }, [token, commentText]);

  const fetchBugDetails = async () => {
    try {
      const data = await getBugById(id, token);
      setBug(data);
    } catch (error) {
      console.error("Error fetching bug details:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await commentOnBug(id, commentText, token);
      setBug((prev) => ({
        ...prev,
        comments: [...prev.comments, response.comment],
      }));
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBug = async () => {
    try {
      await deleteBug(id, token);
      alert("Bug deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  const handleEditBug = () => {
    navigate(`/edit-bug/${id}`);
  };

  if (!bug) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg text-gray-600">Loading bug details...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Bug Details */}

        <div className="bg-gradient-to-r flex flex-col  justify-between from-blue-50 to-blue-100 shadow-md rounded-lg p-6">
          {/* Bug Details */}
          <div className="lg:w-2/3 w-full">
            <h2 className="text-3xl font-bold text-black mb-4">
              {bug.bugName}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Bug ID:</strong> {bug._id}
              </p>
              <p>
                <strong>Description:</strong> {bug.description}
              </p>
              <p>
                <strong>Priority:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded text-white ${
                    bug.priority === "High"
                      ? "bg-orange-600"
                      : bug.priority === "Medium"
                      ? "bg-yellow-600"
                      : bug.priority === "Critical"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {bug.priority}
                </span>
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded text-white ${
                    bug.status === "Open" ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {bug.status}
                </span>
              </p>
              <p>
                <strong>Created By:</strong> {bug.createdBy.name || "Unknown"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(bug.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(bug.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleEditBug}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
              >
                Edit Bug
              </button>
              <button
                onClick={handleDeleteBug}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 shadow-md transition"
              >
                Delete Bug
              </button>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="lg:w-[60%] mx-auto w-full mt-6">
            <h3 className="text-xl font-semibold mb-4">Attachments</h3>
            {bug?.attachments && bug?.attachments?.length > 0 ? (
              <div className="space-y-6">
                {bug.attachments.map((attachment, index) => (
                  <FileAttachmentViewer key={index} attachment={attachment} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No attachments available
              </p>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
          <div className="space-y-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              placeholder="Add a comment..."
              className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              onClick={handleAddComment}
              disabled={isSubmitting}
              className={`bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Comment"}
            </button>
          </div>
          <div className="mt-6">
            {bug.comments?.length > 0 ? (
              <ul className="space-y-4">
                {bug.comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="bg-gray-50 border rounded-lg p-4 shadow-md"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>{comment.commentedBy.name || "Unknown"}</strong> -{" "}
                      {new Date(comment.commentedAt).toLocaleString()}
                    </p>
                    <p className="text-gray-800">{comment.commentText}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BugDetails;
