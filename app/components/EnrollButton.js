'use client';

import { useRouter } from 'next/navigation';

export default function EnrollButton({ courseId, price, courseInfo }) {
  const router = useRouter();

  const handleEnroll = () => {
    // You can either use query parameters
    const queryParams = new URLSearchParams({
      courseId,
      ...courseInfo
    }).toString();
    router.push(`/cart?${queryParams}`);

    // Or alternatively, you could use localStorage to pass the data
    // localStorage.setItem('cartItem', JSON.stringify(courseInfo));
    // router.push('/cart');
  };

  return (
    <button
      onClick={handleEnroll}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Enroll Now - £{price}
    </button>
  );
} 