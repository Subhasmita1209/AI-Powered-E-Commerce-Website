import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContextData } from "../context/Authcontext";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/Usercontext";

function ReviewList({ productId }) {
  const { serverUrl, token, user } = useContext(AuthContextData);
  const {userData}=useContext(UserDataContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  /* FETCH REVIEWS */
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/reviews/${productId}`
      );
      setReviews(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  /* DELETE REVIEW */
  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `${serverUrl}/api/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Review deleted");
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  /* START EDIT */
  const startEdit = (review) => {
    setEditingId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  /* CANCEL EDIT */
  const cancelEdit = () => {
    setEditingId(null);
    setEditComment("");
  };

  /* UPDATE REVIEW */
  const updateReview = async (reviewId) => {
    if (!editComment.trim()) {
      toast.warning("Comment cannot be empty");
      return;
    }

    try {
      await axios.put(
        `${serverUrl}/api/reviews/${reviewId}`,
        {
          rating: editRating,
          comment: editComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Review updated");
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;

  if (reviews.length === 0)
    return <p className="text-[#7A5743]">No reviews yet</p>;

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border border-[#E8D8C8] rounded-xl p-5"
        >
          {/* HEADER */}
         <div className="flex justify-between items-center mb-2">
  <h4 className="font-bold text-[#4A2E1F]">
    {review.userId?.name || "User"}
  </h4>

  {userData?._id === review.userId?._id && (
    <div className="flex gap-3">
      <button
        onClick={() => startEdit(review)}
        className="px-3 py-1 text-sm rounded-md 
                   bg-blue-100 text-blue-700 
                   hover:bg-blue-200 transition"
      >
        Edit
      </button>

      <button
        onClick={() => deleteReview(review._id)}
        className="px-3 py-1 text-sm rounded-md 
                   bg-red-100 text-red-600 
                   hover:bg-red-200 transition"
      >
        Delete
      </button>
    </div>
  )}
</div>

          {/* BODY */}
          {editingId === review._id ? (
            <>
              {/* STAR EDIT */}
              <div className="flex gap-1 text-2xl mb-3 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setEditRating(star)}
                    className={
                      star <= editRating
                        ? "text-[#D4AF37]"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="w-full h-[120px] border rounded-lg p-3"
              />

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateReview(review._id)}
                  className="px-5 py-2 bg-[#4A2E1F] text-white rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={cancelEdit}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-[#D4AF37] text-lg">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p className="text-[#6B4A3A] mt-2">
                {review.comment}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;