'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Check, StarIcon, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Rating from '@/components/shared/product/rating'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  createUpdateReview,
  getReviewByProductId,
  getReviews,
} from '@/lib/actions/review.actions'
import { ReviewInputSchema } from '@/lib/validator'
import RatingSummary from '@/components/shared/product/rating-summary'
import { IProduct } from '@/lib/db/models/product.model'
import { Separator } from '@/components/ui/separator'
import { IReviewDetails } from '@/types'

const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
  image: '',
}

export default function ReviewList({
  userId,
  product,
}: {
  userId: string | undefined
  product: IProduct
}) {
  const t = useTranslations('Product')
  const [page, setPage] = useState(2)
  const [totalPages, setTotalPages] = useState(0)
  const [reviews, setReviews] = useState<IReviewDetails[]>([])
  const { ref, inView } = useInView({ triggerOnce: true })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const { toast } = useToast()
  const reload = async () => {
    try {
      const res = await getReviews({ productId: product._id, page: 1 })
      setReviews([...res.data])
      setTotalPages(res.totalPages)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        variant: 'destructive',
        description: t('Error in fetching reviews'),
      })
    }
  }
  const previewMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const preview = document.getElementById('preview');
    if (!preview) return;
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = function (e) {
      let element;
      if (fileType.startsWith('image/')) {
        element = document.createElement('img');
        if (typeof e.target?.result === 'string') {
          element.src = e.target.result;
        }
        element.className = 'w-[100px] h-[100px] rounded shadow ';
      } else if (fileType.startsWith('video/')) {
        element = document.createElement('video');
        if (typeof e.target?.result === 'string') {
          element.src = e.target.result;
        }
        element.controls = true;
        element.className = 'w-[100px] h-[100px] rounded shadow';
      }
      if (element) preview.appendChild(element);
    };

    reader.readAsDataURL(file);
  }
  const loadMoreReviews = async () => {
    if (totalPages !== 0 && page > totalPages) return
    setLoadingReviews(true)
    const res = await getReviews({ productId: product._id, page })
    setLoadingReviews(false)
    setReviews([...reviews, ...res.data])
    setTotalPages(res.totalPages)
    setPage(page + 1)
  }

  const [loadingReviews, setLoadingReviews] = useState(false)
  useEffect(() => {
    const loadReviews = async () => {
      setLoadingReviews(true)
      const res = await getReviews({ productId: product._id, page: 1 })
      setReviews([...res.data])
      setTotalPages(res.totalPages)
      setLoadingReviews(false)
    }

    if (inView) {
      loadReviews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  type CustomerReview = z.infer<typeof ReviewInputSchema>
  const form = useForm<CustomerReview>({
    resolver: zodResolver(ReviewInputSchema),
    defaultValues: reviewFormDefaultValues,
  })
  const [open, setOpen] = useState(false)
  const onSubmit: SubmitHandler<CustomerReview> = async (values) => {
    if (!isverified) {
      const isauthentic = await handleverify(values)
      if (String(isauthentic) === '"authentic"') {
        setisverified(true)
        return;
      }
    }
    if(isverified) {const res = await createUpdateReview({
      data: { ...values, product: product._id },
      path: `/product/${product.slug}`,
    })
    if (!res.success)
      return toast({
        variant: 'destructive',
        description: res.message,
      })
    setOpen(false)
    reload()
    toast({
      description: res.message,
    })}
  }
  const [isverified, setisverified] = useState(false);

  const handleverify = async (value: { product: string; user: string; isVerifiedPurchase: boolean; title: string; comment: string; rating: number; image?: string | undefined }) => {
    console.log(value.comment)
    const res = await axios.post('http://localhost:3000/admin/products/api/review-verify', {
            reviewText : value.comment
          });
    console.log(res);
    return res.data.result

  }
  const handleOpenForm = async () => {
    form.setValue('product', product._id)
    form.setValue('user', userId!)
    form.setValue('isVerifiedPurchase', true)
    const review = await getReviewByProductId({ productId: product._id })
    if (review) {
      form.setValue('title', review.title)
      form.setValue('comment', review.comment)
      form.setValue('rating', review.rating)
      form.setValue('image', review.image)
    }
    setOpen(true)
  }

  // Replace this with your actual upload logic (e.g., UploadThing, S3, etc.)
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setUploadedImage(url)
    form.setValue('image', url)
  }

  return (
    <div className='space-y-2'>
      {reviews.length === 0 && <div>{t('No reviews yet')}</div>}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div className='flex flex-col gap-2'>
          {reviews.length !== 0 && (
            <RatingSummary
              avgRating={product.avgRating}
              numReviews={product.numReviews}
              ratingDistribution={product.ratingDistribution}
            />
          )}
          <Separator className='my-3' />
          <div className='space-y-2'>
            <h3 className='font-bold text-lg lg:text-xl'>
              {t('Review this product')} <span className='text-[16px] text-blue-600'>(Earn TrustCoins)</span>
            </h3>
            <p className='text-sm'>
              Upload a photo or video and leave a detailed review to get rewards!
            </p>
            <p className='text-sm'>
              {t('Share your thoughts with other customers')}
            </p>
            {userId ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <Button
                  onClick={handleOpenForm}
                  variant='outline'
                  className=' rounded-full w-full'
                >
                  {t('Write a customer review')}
                </Button>

                <DialogContent className='sm:max-w-[425px] overflow-auto h-[80%]'>
                  <Form {...form}>
                    <form method='post' onSubmit={form.handleSubmit(onSubmit)}>
                      <DialogHeader>
                        <DialogTitle>
                          <div>
                            <h1 className="text-lg font-bold">Help future shoppers & earn rewards!</h1>
                            <p className="text-sm text-gray-600 mt-1">
                              Upload a photo or video and leave a detailed review to get up to
                              <span className="font-semibold text-black"> 50 points</span>.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 text-xl">⭐</span>
                            <span className="text-black font-[20px]">50 points</span>
                          </div>

                        </DialogTitle>
                        <DialogDescription>
                          {t('Share your thoughts with other customers')}
                        </DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='flex flex-col gap-5  '>
                          <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>{t('Title')}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t('Enter title')}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name='comment'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>{t('Comment')}</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder={t('Enter comment')}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name='rating'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('Rating')}</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={t('Select a rating')}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <SelectItem
                                          key={index}
                                          value={(index + 1).toString()}
                                        >
                                          <div className='flex items-center gap-1'>
                                            {index + 1}{' '}
                                            <StarIcon className='h-4 w-4' />
                                          </div>
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Add a photo or video</label>
                        <div className="mt-2">
                          <label htmlFor="mediaUpload"
                            className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-[50px] cursor-pointer">
                            <span className="text-3xl text-gray-400">+</span>
                          </label>
                          <input
                            type="file"
                            id="mediaUpload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          <div id="preview" className="mt-2">
                            {uploadedImage && (
                              <Image
                                src={uploadedImage}
                                alt="Review upload"
                                width={100}
                                height={100}
                                className="rounded shadow"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">Only honest, helpful reviews are rewarded.</p>
                      <DialogFooter>
                        {<Button
                          type='submit'
                          size='lg'
                          disabled={form.formState.isSubmitting}
                        >
                          {!isverified ? (form.formState.isSubmitting
                            ? 'verifying'
                            : 'Verify') : (form.formState.isSubmitting
                            ? 'submitting'
                            : 'submit')
                          }
                          
                        </Button>}
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            ) : (
              <div>
                {t('Please')}{' '}
                <Link
                  href={`/sign-in?callbackUrl=/product/${product.slug}`}
                  className='highlight-link'
                >
                  {t('sign in')}
                </Link>{' '}
                {t('to write a review')}
              </div>
            )}
          </div>
        </div>
        <div className='md:col-span-3 flex flex-col gap-3'>
          {reviews.length !== 0 && (
            <Card>
              <CardHeader>
                <div className='flex-between text-[20px]'>
                  <CardTitle>Review Summary</CardTitle>
                </div>
                <CardDescription>Customers find the product to be of good quality and appreciate its beautiful design.</CardDescription>
              </CardHeader>
            </Card>
          )}
          {
            reviews.map((review: IReviewDetails) => (
              <Card key={review._id}>
                <CardHeader>
                  <div className='flex-between'>
                    <CardTitle>{review.title}</CardTitle>
                    <div className='italic text-sm flex'>
                      <Check className='h-4 w-4' /> {t('Verified Purchase')}
                    </div>
                  </div>
                  <CardDescription>{review.comment}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex space-x-4 text-sm text-muted-foreground'>
                    <Rating rating={review.rating} />
                    <div className='flex items-center'>
                      <User className='mr-1 h-3 w-3' />
                      {review.user ? review.user.name : t('Deleted User')}
                    </div>
                    <div className='flex items-center'>
                      <Calendar className='mr-1 h-3 w-3' />
                      {review.createdAt.toString().substring(0, 10)}
                    </div>
                  </div>
                  {/* Show review image if present */}
                  {review.image && (
                    <div className="mt-2">
                      <Image
                        src={review.image}
                        alt="Review"
                        width={120}
                        height={120}
                        className="rounded"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          <div ref={ref}>
            {page <= totalPages && (
              <Button variant={'link'} onClick={loadMoreReviews}>
                {t('See more reviews')}
              </Button>
            )}

            {page < totalPages && loadingReviews && t('Loading')}
          </div>
        </div>
      </div>
    </div>
  )
}
