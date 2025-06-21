'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import { UploadButton } from '@/lib/uploadthing'
import { ProductInputSchema, ProductUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { IProductInput } from '@/types'

const productDefaultValues: IProductInput =
  process.env.NODE_ENV === 'development'
    ? {
      name: 'Sample Product',
      slug: 'sample-product',
      category: 'Sample Category',
      manufacturerimages: [],
      sellerimages: [],
      brand: 'Sample Brand',
      description: 'This is a sample description of the product.',
      price: 99.99,
      listPrice: 0,
      countInStock: 15,
      numReviews: 0,
      avgRating: 0,
      numSales: 0,
      isPublished: false,
      tags: [],
      sizes: [],
      colors: [],
      ratingDistribution: [],
      reviews: [],
    }
    : {
      name: '',
      slug: '',
      category: '',
      manufacturerimages: [],
      sellerimages: [],
      brand: '',
      description: '',
      price: 0,
      listPrice: 0,
      countInStock: 0,
      numReviews: 0,
      avgRating: 0,
      numSales: 0,
      isPublished: false,
      tags: [],
      sizes: [],
      colors: [],
      ratingDistribution: [],
      reviews: [],
    }

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: IProduct
  productId?: string
}) => {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [manufacturerimages, setmanufacturerimages] = useState<string[]>([])
  const [sellerimages, setsellerimages] = useState<string[]>([])

  const form = useForm<IProductInput>({
    resolver:
      type === 'Update'
        ? zodResolver(ProductUpdateSchema)
        : zodResolver(ProductInputSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })

  const { toast } = useToast()

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyError('');
    setIsVerified(false);

    const description = form.getValues('description');

    if (!manufacturerimages[0] || !sellerimages[0] || !description) {
      setVerifyError('Please provide at least one manufacturer image, one seller image, and a description.');
      setVerifying(false);
      return;
    }
    console.log(manufacturerimages[0], sellerimages[0], description)
    try {
      const res = await axios.post('http://localhost:3000/admin/products/api/verify', {
        image1: manufacturerimages[0],
        image2: sellerimages[0],
        description,
      });
      console.log(res);
      if (res.data.comparison === 'same' && res.data.match === 'true') {
        setIsVerified(true);
      } else {
        setVerifyError('Verification failed. Please check the images and description.');
      }
    } catch (error: any) {
      setVerifyError('Verification error: ' + error.message);
    }
    setVerifying(false);
  };

  async function onSubmit(values: IProductInput) {
    if (type === 'Create') {
      const res = await createProduct(values)
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message })
      } else {
        toast({ description: res.message })
        router.push(`/admin/products`)
      }
    } else if (type === 'Update' && productId) {
      const res = await updateProduct({ ...values, _id: productId })
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message })
      } else {
        router.push(`/admin/products`)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        method='post'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>

                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Enter product slug'
                      className='pl-8'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => {
                        form.setValue('slug', toSlug(form.getValues('name')))
                      }}
                      className='absolute right-2 top-2.5'
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter category' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product brand' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='listPrice'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>List Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product list price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Net Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='countInStock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Count In Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Enter product count in stock'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="manufacturerimages"
            render={() => {
              const manufacturerImages = form.watch("manufacturerimages") || [];
              const removeImage = (urlToRemove: string) => {
                const updatedImages = manufacturerImages.filter(img => img !== urlToRemove);
                form.setValue("manufacturerimages", updatedImages, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              };

              return (
                <FormItem className="w-full">
                  <FormLabel>Manufacturer Images</FormLabel>
                  <Card>
                    <CardContent className="space-y-2 mt-2 min-h-48">
                      <div className="flex justify-start items-center space-x-2">
                        {manufacturerImages.map((image: string, idx: number) => (
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
                              const newImages = [...manufacturerImages, res[0].url];
                              setmanufacturerimages([...manufacturerImages, res[0].url])
                              form.setValue("manufacturerimages", newImages, {
                                shouldDirty: true,
                                shouldTouch: true,
                                shouldValidate: true,
                              });
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: "destructive",
                                description: `ERROR! ${error.message}`,
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
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='sellerimages'
            render={() => {
              const sellerimages = form.watch("sellerimages") || [];
              const removeImage = (urlToRemove: string) => {
                const updatedImages = sellerimages.filter(img => img !== urlToRemove);
                form.setValue("sellerimages", updatedImages, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              };
              return (
                <FormItem className='w-full'>
                  <FormLabel>Product Images(seller)</FormLabel>
                  <Card>
                    <CardContent className='space-y-2 mt-2 min-h-48'>
                      <div className='flex justify-start items-center space-x-2'>
                        {sellerimages.map((image: string, idx: number) => (
                          <div key={idx} className="relative group w-24 h-24">
                            <Image
                              key={image}
                              src={image}
                              alt='product image'
                              className='w-20 h-20 object-cover object-center rounded-sm'
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
                            endpoint='imageUploader'
                            onClientUploadComplete={(res: { url: string }[]) => {
                              form.setValue('sellerimages', [...sellerimages, res[0].url])
                              setsellerimages([...sellerimages, res[0].url])
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: 'destructive',
                                description: `ERROR! ${error.message}`,
                              })
                            }}
                          />
                        </FormControl>
                      </div>
                    </CardContent>
                  </Card>
                </FormItem>
              );
            }}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us a little bit about yourself'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name='isPublished'
            render={({ field }) => (
              <FormItem className='space-x-2 items-center'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Is Published?</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleVerify}
            disabled={verifying}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {verifying ? 'Verifying...' : 'Verify Images & Description'}
          </Button>
          {verifyError && <p className="text-red-500 text-sm">{verifyError}</p>}
          {isVerified && <p className="text-green-600 text-sm">✅ Verification passed</p>}
        </div>

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={!isVerified || form.formState.isSubmitting}
            className='button col-span-2 w-full'
          >
            {form.formState.isSubmitting ? 'Submitting...' : `${type} Product `}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
