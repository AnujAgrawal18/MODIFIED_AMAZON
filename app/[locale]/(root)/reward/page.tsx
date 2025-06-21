import Image from "next/image";

const rewards = [
  {
    id: 1,
    title: "Amazon Gift Card",
    description: "A $10 gift card to use on Amazon.com.",
    image: "/images/amazon-giftcard.jpg",
    Bits: 75,
  },
  {
    id: 2,
    title: "Discount Coupon",
    description:
      "Get 20% off on your next purchase. Get 10% off on your next Amazon purchase.",
    image: "/images/discount-coupon.jpg",
    Bits: 100,
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "Enjoy free shipping on your next order.",
    image: "/images/free-shipping.jpg",
    Bits: 25,
  },
  {
    id: 4,
    title: "Amazon Prime Membership",
    description: "Get a one-month Amazon Prime membership.",
    image: "/images/amazon-prime.jpg",
    Bits: 150,
  },
];

export default function Rewards() {
  return (
    <div className="px-4 bg-gray-100">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/APay/rewards_stripe.jpg" alt="" className="mx-auto" />
      <h2 className="text-3xl font-bold text-center my-10">
        Claim your Shopping Rewards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-32 w-32 relative mb-4">
              <Image
                src={reward.image}
                alt={reward.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{reward.title}</h3>
            <p className="text-sm text-gray-600 mb-3 min-h-10">{reward.description}</p>
            <p className="text-sm font-medium text-gray-700 mb-4">
              TrustCoins Required: {" "}
              <span className="inline-block align-middle">
                <Image
                  src="/images/trustcoin.jpg"
                  alt="trustcoin"
                  width={24}
                  height={24}
                  className="inline rounded-lg"
                />
              </span>{" "}
              {reward.Bits}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 min-w-full">
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
