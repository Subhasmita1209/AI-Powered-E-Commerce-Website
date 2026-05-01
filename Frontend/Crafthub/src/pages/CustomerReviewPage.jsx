import React from "react";
import bannerImg from "../assets/advitisement.png";
import CustomerReview from "./CustomerReview";

function CustomerReviewPage() {
  const reviews = [
    {
      name: "William Lee",
      text: "It does what it promises, no complaints there. The pricing is fair and the customer experience is excellent. I’ll be coming back for future purchases.",
      rating: 5,
    },
    {
      name: "Mia Anderson",
      text: "I encountered a few bugs in the beginning, but support helped fix them quickly. Now everything works perfectly. The team really listens to feedback.",
      rating: 4,
    },
    {
      name: "Ethan Clark",
      text: "One of the best investments I've made recently. The performance is consistent and integrates seamlessly with my workflow. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sophia Carter",
      text: "Amazing quality and fast delivery. Totally satisfied with my purchase, will order again soon!",
      rating: 5,
    },
    {
      name: "Daniel Roberts",
      text: "Customer support is top notch, and the product works exactly as described.",
      rating: 4,
    },
  ];

  return (
    <div className="w-full">

      {/* ⭐ FULL-WIDTH RESPONSIVE BANNER */}
      <div className="w-full">
        <img
          src={bannerImg}
          alt="Advertisement Banner"
          className="
            w-full 
            h-[180px] 
            sm:h-[260px] 
            md:h-[340px] 
            lg:h-[420px] 
            object-cover
          "
        />
      </div>

      {/* Customer Review Section */}
      <CustomerReview reviews={reviews} />
    </div>
  );
}

export default CustomerReviewPage;
