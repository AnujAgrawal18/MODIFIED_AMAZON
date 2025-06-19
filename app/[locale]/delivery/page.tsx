'use client'
import type React from "react"
import { useState, useEffect } from "react"
import { MapPin, Phone, Clock, Camera, CheckCircle, Navigation, User, Package, Truck } from "lucide-react"
import { getAllOrders } from "@/lib/actions/order.actions"
import { useSearchParams, useRouter } from 'next/navigation';

interface DeliveryInfo {
    productName: string
    customerName: string
    address: string
    contact: string
    deliveryTime: string
    orderValue: string
    status: "pending" | "delivered"
}


const DeliveryDashboard = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [proof, setProof] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [notes, setNotes] = useState("")
    const [status, setStatus] = useState<DeliveryInfo["status"]>("pending")
    const [isLoading, setIsLoading] = useState(false)

    const [deliveryDetails, setDeliveryDetails] = useState<{ data: any[]; totalPages: number } | null>(null)

    // Fetch orders on mount
    useEffect(() => {
        const fetchOrders = async () => {
            const result = await getAllOrders({ limit: 1, page: 1 })
            setDeliveryDetails(result)
        }
        fetchOrders()
        const confirmed = searchParams.get(`deliveryConfirmed`);
        console.log(confirmed);
        if (confirmed === 'true') {
            setStatus('delivered');
        }
    }, [searchParams])

    // For demonstration, use the first delivery or handle empty array

    const firstDelivery = deliveryDetails?.data?.[0]
    const deliveryData: DeliveryInfo = {
        productName: firstDelivery?.items?.[0]?.name || "N/A",
        customerName: typeof firstDelivery?.user === "object" && firstDelivery?.user !== null && "name" in firstDelivery.user
            ? (firstDelivery.user as { name: string }).name
            : typeof firstDelivery?.user === "string"
                ? firstDelivery.user
                : "N/A",
        address: firstDelivery?.shippingAddress
            ? [
                firstDelivery.shippingAddress.fullName,
                firstDelivery.shippingAddress.street,
                firstDelivery.shippingAddress.city,
                firstDelivery.shippingAddress.province,
                firstDelivery.shippingAddress.postalCode,
                firstDelivery.shippingAddress.country
            ].filter(Boolean).join(", ")
            : "N/A",
        contact: firstDelivery?.shippingAddress?.phone || "N/A",
        deliveryTime: firstDelivery?.expectedDeliveryDate
            ? new Date(firstDelivery.expectedDeliveryDate).toLocaleString()
            : "Today by 5:00 PM",
        orderValue: firstDelivery?.items?.[0]?.price
            ? `₹${firstDelivery.items[0].price}`
            : "₹4,999",
        status: "pending",
    }

    const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProof(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleDeliveryComplete = () => {
        if (!proof) {
            alert("📷 Please upload delivery proof before completing.")
            return
        }

        setIsLoading(true)
        router.push(`/?confirmDelivery=${firstDelivery._id}`);
    }

    if (status === "delivered") {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="bg-white shadow-lg p-5 rounded-lg text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-green-700 mb-1">Delivery Completed!</h2>
                    <p className="text-sm text-gray-600 mb-2">Order delivered to {deliveryData.customerName}</p>
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">Delivered</span>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-lg p-3 rounded-lg text-center mb-2 flex-shrink-0">
                <h1 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
                    <Truck className="h-16 w-5 text-blue-600" />
                    Delivery Dashboard
                </h1>
                <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full mt-1 inline-block">In Transit</span>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 min-h-0">
                {/* Left Column */}
                <div className="flex flex-col space-y-2 min-h-0">
                    {/* Delivery Info */}
                    <div className="bg-white shadow-lg p-3 rounded-lg flex-1 min-h-0">
                        <h2 className="text-sm font-semibold text-gray-800 mb-1">Delivery Info</h2>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                                <Package className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-medium text-sm truncate">{deliveryData.productName}</p>
                                    <p className="text-green-600 text-sm">{deliveryData.orderValue}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <User className="h-4 w-4 text-gray-600 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-medium text-sm truncate">{deliveryData.customerName}</p>
                                    <p className="text-gray-600 text-sm truncate">{deliveryData.contact}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                                <MapPin className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-medium text-sm">Address</p>
                                    <p className="text-gray-600 text-sm line-clamp-2">{deliveryData.address}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                                <Clock className="h-4 w-4 text-orange-600 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-medium text-sm">Expected</p>
                                    <p className="text-orange-600 text-sm truncate">{deliveryData.deliveryTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white shadow-lg p-3 rounded-lg flex-shrink-0">
                        <h2 className="text-sm font-semibold text-gray-800 mb-1">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-1">
                            <button
                                onClick={() => window.open(`tel:${deliveryData.contact}`)}
                                className="flex items-center justify-center gap-2 border px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100"
                            >
                                <Phone className="h-4 w-4" />
                                Call
                            </button>
                            <button
                                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(deliveryData.address)}`)}
                                className="flex items-center justify-center gap-2 border px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100"
                            >
                                <Navigation className="h-4 w-4" />
                                Directions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col space-y-2 min-h-0">
                    {/* Upload Proof */}
                    <div className="bg-white shadow-lg p-3 rounded-lg flex-1 flex flex-col min-h-0">
                        <h3 className="text-sm font-semibold flex gap-2 items-center mb-2">
                            <Camera className="h-4 w-4 text-blue-600" />
                            Upload Proof
                        </h3>

                        <div className="border-2 border-dashed border-gray-300 rounded p-3 text-center hover:border-blue-400 transition-colors mb-2">
                            <input type="file" accept="image/*" onChange={handleProofUpload} className="hidden" id="proof-upload" />
                            <label htmlFor="proof-upload" className="cursor-pointer block">
                                <Camera className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                                <p className="text-sm text-gray-600">Upload package photo</p>
                                <p className="text-xs text-gray-500 mt-1">Click here</p>
                            </label>
                        </div>

                        {previewUrl && (
                            <div className="space-y-1 mb-2">
                                <p className="text-sm text-green-600 font-medium truncate">✓ {proof?.name}</p>
                                <img
                                    src={previewUrl || "/placeholder.svg"}
                                    alt="Delivery Proof"
                                    className="w-full h-24 rounded object-cover border shadow-sm"
                                />
                            </div>
                        )}

                        <div className="flex-1 flex flex-col">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Notes</label>
                            <textarea
                                rows={2}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Notes..."
                                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none flex-1"
                            />
                        </div>
                    </div>

                    {/* Complete Delivery */}
                    <div className="bg-white shadow-lg p-3 rounded-lg flex-shrink-0">
                        <button
                            onClick={handleDeliveryComplete}
                            disabled={isLoading}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 text-xs font-semibold rounded flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Completing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-4 w-4" />
                                    Mark Delivered
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryDashboard