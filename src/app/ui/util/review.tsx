'use client';

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

export async function ProductReviewPage() {
  const fetchInitialReviews = async () => {
    return [
      { id: 1, reviewer_name: 'Alice Johnson', rating: 5, comment: 'Absolutely love these handmade ceramics! The details are stunning.' },
      { id: 2, reviewer_name: 'Bob Smith', rating: 4, comment: 'Great custom furniture, but a bit on the expensive side.' },
      { id: 3, reviewer_name: 'Clara Davis', rating: 5, comment: 'Beautiful scarves! Perfect for the winter season.' },
      { id: 4, reviewer_name: 'David Lee', rating: 3, comment: 'Sculpture is nice, but the finish could be improved.' },
      { id: 5, reviewer_name: 'Frank Miller', rating: 5, comment: 'Eco-friendly and stylish jewelry, love it!' },
      { id: 6, reviewer_name: 'Olivia Brown', rating: 4, comment: 'The painting is good, but I expected more vibrant colors.' },
      { id: 7, reviewer_name: 'Jack Black', rating: 5, comment: 'The candles smell amazing! So relaxing.' },
    ];
  };

  const initialReviews = await fetchInitialReviews();
  return <ProductReview initialReviews={initialReviews} />;
}

function ProductReview({ initialReviews }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviews, setReviews] = useState(initialReviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment || !reviewerName) {
      alert("Please provide your name, a rating, and a comment!");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      reviewer_name: reviewerName,
      rating,
      comment,
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
    setReviewerName("");
    setHover(null);
  };

  return (
    <div className="bg-gray-100 p-4 lg:p-8">
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-4 mx-auto w-full max-w-7xl">
        
        <div className="lg:col-span-2 bg-white shadow p-6 rounded-lg">
          <h2 className="mb-4 font-bold text-2xl text-center lg:text-left">Product Reviews</h2>
          {reviews.length > 0 ? (
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              pagination={{ clickable: true }}
              navigation={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Pagination, Navigation, Autoplay]}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
              className="mySwiper"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="border-gray-300 bg-white shadow-md p-4 border rounded-lg">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {review.reviewer_name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xl ${
                              review.rating > i
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <p className="mt-2 text-gray-800 text-sm">{review.comment}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        {/* Comment Form */}
        <div className="lg:col-span-2 bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-semibold text-center text-xl">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="block">
            <input
              type="text"
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black w-full focus:outline-none"
              placeholder="Your Name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />
            <div className="flex justify-center items-center space-x-2 mb-4">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={`cursor-pointer text-2xl ${
                      (hover || rating) > i ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(null)}
                  />
                ))}
            </div>
            <textarea
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black w-full focus:outline-none"
              rows="4"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black hover:bg-white px-4 py-2 border border-black rounded-lg w-full text-white hover:text-black transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
