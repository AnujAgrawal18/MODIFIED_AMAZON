import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.model'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faStar,
  faChartLine,
  faTrophy,
  faCheckCircle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Rating from './rating'
import { formatNumber, generateId, round2 } from '@/lib/utils'
import ProductPrice from './product-price'
import ImageHover from './image-hover'
import AddToCart from './add-to-cart'

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
}: {
  product: IProduct
  hideDetails?: boolean
  hideBorder?: boolean
  hideAddToCart?: boolean
}) => {
  const ProductImage = () => (
    <Link href={`/product/${product.slug}`}>
      <div className='relative h-52'>
        {(product.images?.length ?? 0) > 1 ? (
          <ImageHover
            src={product.images?.[0] || '/images/product-placeholder.png'}
            hoverSrc={product.images?.[1] || '/images/product-placeholder.png'}
            alt={product.name}
          />
        ) : (
          <Image
            src={product.images?.[0] || '/images/product-placeholder.png'}
            alt={product.name}
            fill
            sizes='80vw'
            className='object-contain'
          />
        )}
      </div>

    </Link>
  )
  const ProductDetails = () => (
    <div className='flex-1 space-y-2'>
      <p className='font-bold'>{product.brand}</p>
      <Link
        href={`/product/${product.slug}`}
        className='overflow-hidden text-ellipsis'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Link>
      <div className='flex gap-2 justify-center'>
        <Rating rating={product.avgRating} />
        <span>({formatNumber(product.numReviews)})</span>
        <span><div className="flex flex-row items-center">
          <img src="https://img.freepik.com/premium-vector/verified-badge-ribbon-gradient-style_78370-6047.jpg" alt="" className="h-[25px] w-[25px]" />
          <p className='text-[6px] text-black font-bold'>Visual Match <br/>Verified</p>
        </div>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-2 max-w-[300px] justify-center mx-auto">
        <div className="bg-green-50 p-1 rounded-lg">
          <div className="flex items-center space-x-1 mb-1">
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
        <div className="bg-[#e4fcfc] p-1 rounded-lg ">
          <div className="flex items-center space-x-1 mb-1">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-[#41a1ca] max-w-[30px] max-h-[30px]"
            />
            <span className="text-sm text-[#41a1ca] font-medium">
              Product Score
            </span>
          </div>
          <div className="text-[16xl] font-bold text-[#41a1ca]">
            9.2<span className="text-[12px]">/10</span>
          </div>
        </div>
      </div>

      <ProductPrice
        isDeal={product.tags?.includes('todays-deal') || false}
        price={product.price}
        listPrice={product.listPrice}
        forListing
      />
    </div>
  )
  const AddButton = () => (
    <div className='w-full text-center'>
      <AddToCart
        minimal
        item={{
          clientId: generateId(),
          product: product._id,
          size: product.sizes[0],
          color: product.colors[0],
          countInStock: product.countInStock,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: round2(product.price),
          quantity: 1,
          image: product.images?.[0] || '/images/product-placeholder.png',
        }}
      />
    </div>
  )
  const Scoretab = () => (
    <Link href={`/product/${product.slug}`}>
      {!hideDetails ? (
        <div className="absolute z-20 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 mx-auto opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Seller Info + Rating */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center ">
              <div>
                <p className="text-xs text-gray-500 mb-1">Sold by</p>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">
                    SmartElectronics
                  </span>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-blue-600 text-xs mr-1 max-w-[10px] max-h-[10px]"
                    />
                    <span className="text-blue-600 text-xs font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className="text-yellow-400 text-sm max-w-[20px] max-h-[20px]"
                />
              ))}
            </div>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-green-600 text-sm max-w-[30px] max-h-[30px]"
                />
                <span className="text-sm text-green-700 font-medium">
                  Trust Score
                </span>
              </div>
              <div className="text-2xl font-bold text-green-700">
                4.8<span className="text-lg">/5</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="text-purple-600 text-sm max-w-[30px] max-h-[30px]"
                />
                <span className="text-sm text-purple-700 font-medium">
                  Product Score
                </span>
              </div>
              <div className="text-2xl font-bold text-purple-700">
                9.2<span className="text-lg">/10</span>
              </div>
            </div>
          </div>

          {/* Customer Quote */}
          <div className="border-l-4 border-blue-500 pl-3 py-2 mb-4 bg-blue-50">
            <p className="text-sm text-gray-700 italic">
              "94% of the customers were satisfied with this product."
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 max-w-[30px] max-h-[30px]" />
              <span className="text-sm font-medium text-green-700">
                97% kept this item
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {/* <FontAwesomeIcon icon={faShieldAlt} className="text-orange-500 max-w-[30px] max-h-[30px]" />
               */}
               <img src="https://img.freepik.com/premium-vector/verified-badge-ribbon-gradient-style_78370-6047.jpg" alt="" className="h-[30px] w-[30px]" />
              <span className="text-sm font-medium text-orange-600">
                Visual Match Verified
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Why this matters
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Seller details
            </button>
          </div>
        </div>
      ) : (<div className='absolute z-10'>
      </div>)
      }
    </Link>

  )

  return hideBorder ? (
    <div className='flex flex-col'>
      <Scoretab />
      <ProductImage />
      {!hideDetails && (
        <>
          <div className='p-3 flex-1 text-center'>
            <ProductDetails />
          </div>
          {!hideAddToCart && <AddButton />}
        </>
      )}
    </div>
  ) : (
    <Card className='flex flex-col  '>
      <Scoretab />
      <CardHeader className='p-3'>
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <>
          <CardContent className='p-3 flex-1  text-center'>
            <ProductDetails />
          </CardContent>
          <CardFooter className='p-3'>
            {!hideAddToCart && <AddButton />}
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ProductCard
