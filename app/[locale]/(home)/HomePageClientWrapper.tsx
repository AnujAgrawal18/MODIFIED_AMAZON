'use client';
import { getOrderById } from '@/lib/actions/order.actions';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deliverOrder, updateOrderToPaid } from '@/lib/actions/order.actions';
import Image from 'next/image';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { UploadButton } from '@/lib/uploadthing'


export default function HomePageClientWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [showConfirmDelivery, setShowConfirmDelivery] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [customerimages, setcustomerimages] = useState<string[]>([])
  const [sellerimages, setsellerimages] = useState<string[]>([])

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const form = useForm()

  useEffect(() => {
    const id = searchParams.get('confirmDelivery');
    const verificationValue = searchParams.get('productverification');
    if (verificationValue && verificationValue.trim() !== '') {
      setShowVerification(true);
      const fetchorder = async (id: string) => {
        const ord = await getOrderById(verificationValue);
        setOrder(ord.items[0].image);
        const response = await fetch(ord.items[0].image); // from /public/images/
        console.log(response)
        // <UploadButton
        //   endpoint="imageUploader"
        //   onClientUploadComplete={(res: { url: string }[]) => {
        //     const newImages = [ord.items[0].image];

        //   }}
        // />
        const imageUrl = ord.items[0].image.startsWith('http') ? ord.items[0].image : `${window.location.origin}${ord.items[0].image}`;
        setsellerimages(["https://utfs.io/f/qefYa8JD2JXMkxFGsa02UFoLajCD9HANtf87PVQyhB1g0OG3"])
        // setsellerimages([`${window.location.origin}${ord.items[0].image}`])
      };
      if (verificationValue) {
        setOrderId(verificationValue);
        fetchorder(verificationValue);
        setShowModal(true);
      }
    }

    if (id && id.trim() !== '') {
      setShowConfirmDelivery(true);
      const fetchorder = async (id: string) => {
        const ord = await getOrderById(id);
        setOrder(ord.items[0].name);
      };
      if (id) {
        setOrderId(id);
        fetchorder(id);
        setShowModal(true);
      }
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

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyError('');
    setIsVerified(false);

    const description = 'description';

    if (!customerimages[0] || !sellerimages[0] || !description) {
      setVerifyError('Please provide at least one manufacturer image, one seller image, and a description.');
      setVerifying(false);
      return;
    }
    console.log(customerimages[0], sellerimages[0], description)
    try {
      const res = await axios.post('http://localhost:3000/admin/products/api/verify', {
        image1: customerimages[0],
        image2: sellerimages[0],
        description,
      });
      console.log(res);
      if (res.data.comparison === 'same') {
        setIsVerified(true);
      } else {
        setVerifyError('Verification failed. Please check the images.');
      }
    } catch (error: any) {
      setVerifyError('Verification error: ' + error.message);
    }
    setVerifying(false);
  };

  if (!showModal || !orderId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">

      {showConfirmDelivery && <div className="p-2 max-w-[500px] bg-white rounded-2xl">
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
      </div>}
      {showVerification && <div className="p-2 max-w-screen bg-white rounded-2xl">
        {/* Chat bubble */}
        <div className="relative mb-3">
          <div className="bg-slate-800 text-white p-3 rounded-3xl rounded-bl-lg shadow-lg">
            <h1 className="text-xl font-medium leading-relaxed">
              check if your product is same using our AI Model
              {(order !== null) && <Image src={order} height={50} width={50} alt="product image" />}
            </h1>
          </div>
          {/* Chat tail */}
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-slate-800"></div>
        </div>

        {/* Options */}
        <h2 className="text-xl font-semibold">Upload Image for Verification</h2>

        <Form {...form}>
          <form
            method='post'
            onSubmit={handleVerify}
            className='space-y-8'
          >
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name="customerimages"
                render={() => {
                  const customerImages = form.watch("customerimages") || [];
                  const removeImage = (urlToRemove: string) => {
                    const updatedImages = customerImages.filter((img: string) => img !== urlToRemove);
                    form.setValue("customerimages", updatedImages, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  };

                  return (
                    <FormItem className="w-full">
                      <FormLabel>Customer image</FormLabel>
                      <Card>
                        <CardContent className="space-y-2 mt-2 min-h-48">
                          <div className="flex justify-start items-center space-x-2">
                            {customerImages.map((image: string, idx: number) => (
                              <div key={idx} className="relative group w-24 h-24">
                                <Image
                                  key={idx}
                                  src={image}
                                  alt="product image"
                                  className="w-20 h-20 object-cover object-center rounded-sm"
                                  width={100}
                                  height={100}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(image)}
                                  className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 group-hover:opacity-100"
                                  title="Remove"
                                >
                                  ×
                                </button>
                              </div>
                            ))}

                            <FormControl>
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: { url: string }[]) => {
                                  const newImages = [...customerImages, res[0].url];
                                  setcustomerimages([...customerImages, res[0].url])
                                  form.setValue("customerimages", newImages, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  });
                                }}
                              />
                            </FormControl>
                          </div>
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* <FormField
                control={form.control}
                name="sellerimages"
                render={() => {
                  const sellerImages = form.watch("sellerimages") || [];
                  const removeImage = (urlToRemove: string) => {
                    const updatedImages = sellerImages.filter((img: string) => img !== urlToRemove);
                    form.setValue("sellerimages", updatedImages, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  };

                  return (
                    <FormItem className="w-full">
                      <FormLabel>seller image</FormLabel>
                      <Card>
                        <CardContent className="space-y-2 mt-2 min-h-48">
                          <div className="flex justify-start items-center space-x-2">
                            {sellerImages.map((image: string, idx: number) => (
                              <div key={idx} className="relative group w-24 h-24">
                                <Image
                                  key={idx}
                                  src={image}
                                  alt="product image"
                                  className="w-20 h-20 object-cover object-center rounded-sm"
                                  width={100}
                                  height={100}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(image)}
                                  className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 group-hover:opacity-100"
                                  title="Remove"
                                >
                                  ×
                                </button>
                              </div>
                            ))}

                            <FormControl>
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: { url: string }[]) => {
                                  const newImages = [...sellerImages, res[0].url];
                                  setsellerimages([...sellerImages, res[0].url])
                                  form.setValue("sellerimages", newImages, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  });
                                }}
                              />
                            </FormControl>
                          </div>
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}
            </div>
            <div className="space-y-2">
              <Button
                type="button"
                onClick={handleVerify}
                disabled={verifying}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {verifying ? 'Verifying...' : isVerified ? 'Verification Successful' : 'Verify Images & Description'}
              </Button>
              {verifyError && <p className="text-red-500 text-sm">{verifyError}</p>}
              {isVerified && <p className="text-green-600 text-sm">✅ Verification passed!! the product authenticity is verified</p>}
              <Button
                type="button"
                onClick={handleNo}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >Cancel</Button>
            </div>
          </form>
        </Form>

        {statusMessage && (
          <p className="text-sm mt-2">{statusMessage}</p>
        )}
      </div>}


    </div>
  );
}


