
import { useState } from "react";
import { FaStar } from "react-icons/fa";





export default async function ProductReviewPage() {
  const fetchInitialReviews = async () => {
    return [
      { id: 1, product_id: 1, reviewer_name: 'Alice Johnson', rating: 5, comment: 'Absolutely love these handmade ceramics! The details are stunning.' },
      { id: 2, product_id: 2, reviewer_name: 'Bob Smith', rating: 4, comment: 'Great custom furniture, but a bit on the expensive side.' },
      { id: 3, product_id: 3, reviewer_name: 'Clara Davis', rating: 5, comment: 'Beautiful scarves! Perfect for the winter season.' },
      { id: 4, product_id: 4, reviewer_name: 'David Lee', rating: 3, comment: 'Sculpture is nice, but the finish could be improved.' },
      { id: 5, product_id: 5, reviewer_name: 'Frank Miller', rating: 5, comment: 'Eco-friendly and stylish jewelry, love it!' },
      { id: 6, product_id: 6, reviewer_name: 'Alice Johnson', rating: 5, comment: 'Amazing craftsmanship on the leather bags. Very durable!' },
      { id: 7, product_id: 7, reviewer_name: 'Olivia Brown', rating: 4, comment: 'The painting is good, but I expected more vibrant colors.' },
      { id: 8, product_id: 8, reviewer_name: 'Jack Black', rating: 5, comment: 'The candles smell amazing! So relaxing.' },
      { id: 9, product_id: 9, reviewer_name: 'Alice Johnson', rating: 4, comment: 'The felt creations are cute, but a little pricey for the size.' },
      { id: 10, product_id: 10, reviewer_name: 'Alice Johnson', rating: 5, comment: 'Rustic and unique home decor pieces that really stand out.' },
      { id: 11, product_id: 1, reviewer_name: 'Liam Harris', rating: 5, comment: 'The pottery is beautiful and the craftsmanship is top notch. Highly recommend!' },
      { id: 12, product_id: 2, reviewer_name: 'Grace White', rating: 5, comment: 'Love the custom furniture! It fits perfectly in my living room.' }
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
      product_id: 2, // Assuming static product_id for simplicity
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
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="flex md:flex-row flex-col bg-white shadow mx-auto p-6 rounded-lg max-w-4xl">
        {/* Left Column - Reviews */}
        <div className="pr-4 border-r w-full md:w-2/3">
          <h2 className="mb-4 font-bold text-2xl">Product Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="space-y-6">
              {reviews.map((review) => (
                <li key={review.id} className="pb-4 border-b">
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
                            review.rating > i ? "text-yellow-500" : "text-black-300"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="mt-2 text-black-800">{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black-600">No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        {/* Right Column - Comment Form */}
        <div className="pl-4 w-full md:w-1/3">
          <h3 className="mb-4 font-semibold text-xl">Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            {/* Reviewer Name */}
            <input
              type="text"
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black-500 w-full focus:outline-none"
              placeholder="Your Name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />


            <div className="flex items-center space-x-2 mb-4">
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
              className="mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black-500 w-full focus:outline-none"
              rows="4"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black-500 hover:bg-white-600 px-4 py-2 rounded-lg text-black transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}