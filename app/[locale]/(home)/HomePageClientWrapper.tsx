'use client';
import { getOrderById } from '@/lib/actions/order.actions';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deliverOrder,updateOrderToPaid } from '@/lib/actions/order.actions';

export default function HomePageClientWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);

  useEffect( ()=> {
    const id = searchParams.get('confirmDelivery');
    const fetchorder = async (id: string) => {
      const ord = await getOrderById(id);
      setOrder(ord.items[0].name);
    };
    if (id) {
      setOrderId(id);
      fetchorder(id);
      setShowModal(true);
    }
  }, [searchParams]);

  const handleYes = () => {
    if (orderId) {
      setShowModal(false);
      updateOrderToPaid(orderId)
      deliverOrder(orderId);
      router.replace(`/delivery?deliveryConfirmed=true`); // Clean URL
    }
  };

  const handleNo = () => {
    setShowModal(false);
    router.replace('/');
  };

  if (!showModal || !orderId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      
      <div className="p-2 max-w-[500px] bg-white rounded-2xl">
        {/* Chat bubble */}
        <div className="relative mb-3">
          <div className="bg-slate-800 text-white p-3 rounded-3xl rounded-bl-lg shadow-lg">
            <h1 className="text-xl font-medium leading-relaxed">
              Have you received your Amazon package {order}?
            </h1>
          </div>
          {/* Chat tail */}
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-slate-800"></div>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-2">
          <button
            onClick={handleYes}
            className="w-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full py-4 px-6 flex items-center space-x-3 text-left"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
            <span className="text-gray-800 font-medium">Yes, received</span>
          </button>

          <button
            onClick={handleNo}
            className="w-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full py-4 px-6 flex items-center space-x-3 text-left"
          >
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
            <span className="text-gray-800 font-medium">No, not yet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
