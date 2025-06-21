import React from 'react'
import { auth } from '@/auth'
import AddToCart from '@/components/shared/product/add-to-cart'
import { Card, CardContent } from '@/components/ui/card'
import {
  getProductBySlug,
  getRelatedProductsByCategory,
} from '@/lib/actions/product.actions'
import Seevsget from './seevsget'
import ReviewList from './review-list'
import { generateId, round2 } from '@/lib/utils'
import SelectVariant from '@/components/shared/product/select-variant'
import ProductPrice from '@/components/shared/product/product-price'
import ProductGallery from '@/components/shared/product/product-gallery'
import AddToBrowsingHistory from '@/components/shared/product/add-to-browsing-history'
import { Separator } from '@/components/ui/separator'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import RatingSummary from '@/components/shared/product/rating-summary'
import ProductSlider from '@/components/shared/product/product-slider'
import { getTranslations } from 'next-intl/server'
import { DivideSquare } from 'lucide-react'
import Customerinsight from './customerinsight'
import Returninsight from './returninsight'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faStar,
  faChartLine,
  faTrophy,
  faCheckCircle,
  faShieldAlt,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const t = await getTranslations()
  const params = await props.params
  const product = await getProductBySlug(params.slug)
  if (!product) {
    return { title: t('Product.Product not found') }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetails(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page: string; color: string; size: string }>
}) {
  const searchParams = await props.searchParams

  const { page, color, size } = searchParams

  const params = await props.params

  const { slug } = params

  const session = await auth()

  const product = await getProductBySlug(slug)


  if (!product) {
    const t = await getTranslations()
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold">{t('Product.Product not found')}</h1>
      </div>
    )
  }

  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product._id,
    page: Number(page || '1'),
  })

  const t = await getTranslations()

  const TrustScore = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-2 w-64 absolute z-20 left-[100px] hover:opacity-0">
        <div className="flex items-center gap-1 mb-4 left-5">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <h2 className="text-base font-semibold text-gray-800">Seller Trust Score</h2>
        </div>

        <div className="relative w-[160px] h-[90px] mb-4 mx-auto">
          <svg width="160" height="90" viewBox="0 0 200 120">
            <path d="M 25 90 A 75 75 0 0 1 175 90"
              stroke="#4285f4"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round" />
            <g className="origin-[100px_90px] rotate-45">
              <line x1="100" y1="90" x2="140" y2="10"
                stroke="#1f2937"
                strokeWidth="2"
                strokeLinecap="round" />
              <circle cx="100" cy="90" r="3" fill="#1f2937" />
            </g>
          </svg>

          <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
            <span className="text-xs font-medium text-gray-600">2.5</span>
          </div>
          <div className="absolute bottom-1 left-4">
            <span className="text-xs text-gray-600">0</span>
          </div>
          <div className="absolute bottom-1 right-4">
            <span className="text-xs text-gray-600">5</span>
          </div>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <span className="text-xl font-semibold text-blue-600">96%</span>
          </div>
        </div>

        <div className="bg-blue-500 rounded-xl p-2 text-center text-white mb-3">
          <div className="text-2xl font-bold">4.8</div>
          <div className="text-xs opacity-90">out of 5</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-blue-600 font-semibold text-sm">Excellent Trust</div>
              <div className="text-blue-500 text-xs">Highly Reliable Seller</div>
            </div>
            <div className="text-right">
              <div className="text-blue-600 font-semibold text-base">96.0%</div>
              <div className="text-blue-500 text-xs">Trust Rating</div>
            </div>
          </div>
        </div>
        <div className='text-gray-500 text-[10px] p-2'>
          <FontAwesomeIcon icon={faCircleExclamation} />
          The score reflects a comprehensive evaluation of the seller, incorporating return statistics, buyer reviews, and rating performance.
        </div>
      </div>
    )
  }

  const ProductScore = () => (
    <div className="bg-white rounded-xl shadow-md p-3 w-60 left-[100px] hover:opacity-0 absolute z-10">
      <div className="flex items-center gap-1.5 mb-4">
        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <h2 className="text-base font-semibold text-gray-800">Product Score</h2>
      </div>

      <div className="relative w-[150px] h-[90px] mx-auto mb-4">
        <svg width="150" height="90" viewBox="0 0 200 120">
          <path d="M 25 90 A 75 75 0 0 1 175 90"
            stroke="#8b5cf6"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round" />
          <g className="origin-[100px_90px] rotate-45">
            <line x1="100" y1="90" x2="140" y2="10"
              stroke="#1f2937"
              strokeWidth="2.5"
              strokeLinecap="round" />
            <circle cx="100" cy="90" r="3" fill="#1f2937" />
          </g>
        </svg>

        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
          <span className="text-xs font-medium text-gray-600">5</span>
        </div>
        <div className="absolute bottom-1 left-3">
          <span className="text-xs text-gray-600">0</span>
        </div>
        <div className="absolute bottom-1 right-3">
          <span className="text-xs text-gray-600">10</span>
        </div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <span className="text-xl font-bold text-purple-600">92%</span>
        </div>
      </div>

      <div className="bg-purple-500 rounded-xl p-2.5 text-center text-white mb-3">
        <div className="text-2xl font-bold">9.2</div>
        <div className="text-xs opacity-90">out of 10</div>
      </div>

      <div className="bg-purple-50 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-purple-600 font-semibold text-[12px]">Outstanding Quality</div>
            <div className="text-purple-500 text-xs">Premium Product</div>
          </div>
          <div className="text-right">
            <div className="text-purple-600 font-semibold text-[13px]">92.0%</div>
            <div className="text-purple-500 text-xs">Quality Rating</div>
          </div>
        </div>
      </div>
      <div className='text-gray-500 text-[10px] mt-1'>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <span>This score is an evaluation of product reliability, informed by return rates, customer reviews, and rating statistics.</span>
      </div>
    </div>

  );

  return (
    <div>
      <AddToBrowsingHistory id={product._id} category={product.category} />
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5 h-full '>
          <div className='col-span-2'>
            <ProductGallery images={product.manufacturerimages} />
          </div>

          <div className='flex w-full flex-col gap-2 md:p-5 col-span-2'>
            <div className='flex flex-col gap-3'>
              <p className='p-medium-16 rounded-full bg-grey-500/10   text-grey-500 text-blue-600 underline'>
                {t('Product.Brand')} {product.brand} {product.category}
              </p>
              <h1 className='font-bold text-lg lg:text-xl'>{product.name}</h1>
              <div className="grid grid-cols-3 gap-3 mb-2 max-w-[400px]">
                <div className="bg-green-50 p-1 rounded-lg">
                  <div className="flex items-center space-x-1 mb-1">
                    <div className='absolute h-[70px] w-[130px] hover:opacity-100 opacity-0 z-10'><TrustScore /></div>
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className="text-green-600 max-w-[30px] max-h-[30px]"
                    />
                    <span className="text-sm text-green-700 font-medium">
                      Seller Trust
                    </span>
                  </div>
                  <div className="text-[16xl] font-bold text-green-700">
                    4.8<span className="text-[12px]">/5</span>
                  </div>
                </div>
                <div className="bg-purple-50 p-1 rounded-lg ">
                  <div className="flex items-center space-x-1 mb-1">
                    <div className='absolute h-[70px] w-[130px] hover:opacity-100 opacity-0 z-10'><ProductScore /></div>
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-purple-600 max-w-[30px] max-h-[30px]"
                    />
                    <span className="text-sm text-purple-700 font-medium">
                      Product Score
                    </span>
                  </div>
                  <div className="text-[16xl] font-bold text-purple-700">
                    9.2<span className="text-[12px]">/10</span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className='absolute h-[60px] w-[120px] hover:opacity-100 opacity-0 z-10'>
                    <div className='text-black text-[12px] mt-1 bg-white absolute z-20 left-10 top-14 w-[230px] rounded-lg shadow-lg p-4 hover:opacity-0'>
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      <span>Verified by our AI verification system, this badge confirms that the product is authentic and aligns with its official description and visuals.</span>
                    </div>
                  </div>
                  <img src="https://img.freepik.com/premium-vector/verified-badge-ribbon-gradient-style_78370-6047.jpg" alt="" className="h-[40px] w-[40px]" />
                  <p className='text-sm text-black font-bold'>Visual Match Verified</p>
                </div>
              </div>



              <RatingSummary
                avgRating={product.avgRating}
                numReviews={product.numReviews}
                asPopover
                ratingDistribution={product.ratingDistribution}
              />
              <Separator />
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <div className='flex gap-3'>
                  <ProductPrice
                    price={product.price}
                    listPrice={product.listPrice}
                    isDeal={product.tags.includes('todays-deal')}
                    forListing={false}
                  />
                </div>
              </div>
            </div>
            <div>
              <SelectVariant
                product={product}
                size={size || product.sizes[0]}
                color={color || product.colors[0]}
              />
              <div className="p-bold-20 text-[15px] font-bold mt-2">confused about your size? Try <span className="text-blue-700 text-[17px] underline"> Size Smart</span>
              </div>
            </div>
            <div className='flex flex-col gap-2 border-2 border-green-700 p-2 rounded-lg'>
              <p className="font-extrabold text-[15px] text-green-700">High satisfaction and retention: <br /> Trusted by 94% of customers, with 97% choosing to keep it.</p>
              <p className="italic text-[12px] text-black">Satisfaction guaranteed: If you're not happy, we're not happy.</p>
            </div>
            <Separator className='my-2' />
            <div className='flex flex-col gap-2'>
              <p className='p-bold-20 text-grey-600'>
                {t('Product.Description')}:
              </p>
              <p className='p-medium-16 lg:p-regular-18'>
                {product.description}
              </p>
            </div>
          </div>
          <div>
            <Card>
              <CardContent className='p-4 flex flex-col  gap-4'>
                <ProductPrice price={product.price} />
                <div className="flex items-center space-x-1">
                  <img src="/images/amazon-icon.jpg" alt="Amazon fulfilled" className="h-5 w-auto invert" />
                  <span className="text-xs bg-gray-200 px-1 py-0.5 rounded text-gray-700 font-medium">Fulfilled</span>
                </div>
                <p className="text-sm">
                  <a href="#" className="text-blue-600 hover:underline">FREE delivery </a>
                  <span className="font-semibold"> Thursday, 19 June</span> to
                  <a href="#" className="text-blue-600 hover:underline"> Delhi</a>.
                  <a href="#" className="text-blue-600 hover:underline"> Details</a>
                </p>
                <p className="text-sm">
                  Or fastest delivery
                  <span className="font-semibold"> Wednesday, 18 June</span>.
                  <span className="text-red-600 font-semibold"> Order within 12 mins.</span>
                  <a href="#" className="text-blue-600 hover:underline"> Details</a>
                </p>
                <p className="text-sm text-red-600 font-semibold">Only 3 left in stock.</p>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-700 font-medium">Ships from</span> <span className="text-black">Amazon</span></p>
                  <p><span className="text-gray-700 font-medium">Sold by</span> <a href="/admin/overview" className="text-blue-600 hover:underline">TechGeeks Retail</a></p>
                  <p><span className="text-gray-700 font-medium">Payment</span> <a href="#" className="text-blue-600 hover:underline">Secure transaction</a></p>
                  <p><span className="text-gray-700 font-medium">Gift options</span> <a href="#" className="text-blue-600 hover:underline">Available at checkout</a></p>
                </div>
                {product.countInStock > 0 && product.countInStock <= 3 && (
                  <div className='text-destructive font-bold'>
                    {t('Product.Only X left in stock - order soon', {
                      count: product.countInStock,
                    })}
                  </div>
                )}
                {product.countInStock !== 0 ? (
                  <div className='text-green-700 text-xl'>
                    {t('Product.In Stock')}
                  </div>
                ) : (
                  <div className='text-destructive text-xl'>
                    {t('Product.Out of Stock')}
                  </div>
                )}

                {product.countInStock !== 0 && (
                  <div className='flex justify-center items-center'>
                    <AddToCart
                      item={{
                        clientId: generateId(),
                        product: product._id,
                        countInStock: product.countInStock,
                        name: product.name,
                        slug: product.slug,
                        category: product.category,
                        price: round2(product.price),
                        quantity: 1,
                        image: product.manufacturerimages[0],
                        size: size || product.sizes[0],
                        color: color || product.colors[0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='mt-10 grid grid-cols-2 grid-rows-1 w-full'>
        <Customerinsight />
        <Returninsight />
      </section>
      <Seevsget />
      <section className='mt-10'>
        <h2 className='h2-bold mb-2' id='reviews'>
          {t('Product.Customer Reviews')}
        </h2>
        <ReviewList product={product} userId={session?.user.id} />
      </section>



      <section className='mt-10'>
        <ProductSlider
          products={relatedProducts.data}
          title={t('Product.Best Sellers in', { name: product.category })}
        />
      </section>
      <section>
        <BrowsingHistoryList className='mt-10' />
      </section>
    </div>
  )
}
