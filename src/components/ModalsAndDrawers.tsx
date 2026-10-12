import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Search,
  CheckCircle2,
  Sparkles,
  Calendar,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import {
  CurrencyCode,
  formatPrice,
  ProductItem,
  PRODUCTS,
} from '../data/catalog';
import { CoutureImage } from './CoutureImage';

export interface CartItem {
  product: ProductItem;
  size: string;
  quantity: number;
  customNotes?: string;
}

/* -------------------------------------------------------------------------- */
/* 1. PRODUCT QUICK-VIEW & BESPOKE PURCHASE MODAL                             */
/* -------------------------------------------------------------------------- */
interface QuickViewModalProps {
  product: ProductItem | null;
  currency: CurrencyCode;
  onClose: () => void;
  onAddToCart: (product: ProductItem, size: string, customNotes?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [activeImageIdx, setActiveImageIdx] = useState<0 | 1>(0);
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: '36"',
    waist: '29"',
    length: '56"',
  });

  if (!product) return null;

  const images = [product.image, product.secondaryImage];

  const handleAdd = () => {
    const notes =
      selectedSize === 'Custom Atelier Fit'
        ? `Bust ${customMeasurements.bust}, Waist ${customMeasurements.waist}, Length ${customMeasurements.length}`
        : undefined;
    onAddToCart(product, selectedSize, notes);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="quick-view-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-[#0B0B0B]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        data-lenis-prevent
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#F7F3EC] text-[#0B0B0B] border border-[#0B0B0B]/15 grid grid-cols-1 md:grid-cols-12 overflow-hidden my-auto max-h-[90vh]"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#F7F3EC]/90 hover:bg-[#0B0B0B] hover:text-[#F7F3EC] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Left Gallery Column (6 Cols) */}
          <div className="md:col-span-6 bg-[#EBE5DA] relative flex flex-col justify-between min-h-[360px] md:min-h-[540px]">
            <CoutureImage
              src={images[activeImageIdx]}
              alt={product.name}
              fallbackLabel={product.name}
              width={800}
              height={1000}
              eager
              objectPosition={
                activeImageIdx === 0 ? product.imagePosition : '50% 50%'
              }
              className="w-full h-full object-cover"
            />

            {/* Thumbnail Switcher */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveImageIdx(0)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                  activeImageIdx === 0
                    ? 'bg-[#0B0B0B] text-[#F7F3EC]'
                    : 'bg-[#F7F3EC]/85 text-[#0B0B0B]'
                }`}
              >
                01. Silhouette View
              </button>
              <button
                type="button"
                onClick={() => setActiveImageIdx(1)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                  activeImageIdx === 1
                    ? 'bg-[#0B0B0B] text-[#F7F3EC]'
                    : 'bg-[#F7F3EC]/85 text-[#0B0B0B]'
                }`}
              >
                02. Zardozi Detail
              </button>
            </div>
          </div>

          {/* Right Contiguous Purchase Module (6 Cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[#5A1424] mb-2">
                <span>{product.primaryCategory}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{product.sku}</span>
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#0B0B0B] mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#0B0B0B]/65 mb-4">{product.subtitle}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-5 mb-5 border-b border-[#0B0B0B]/10 font-mono tabular-nums">
                <span className="text-xl font-medium text-[#0B0B0B]">
                  {formatPrice(product.pricePKR, currency)}
                </span>
                {product.originalPricePKR && (
                  <span className="text-sm text-[#0B0B0B]/45 line-through">
                    {formatPrice(product.originalPricePKR, currency)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#0B0B0B]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase mb-2.5">
                  <span className="font-medium">SELECT SIZE</span>
                  <span className="text-[#0B0B0B]/60 inline-flex items-center gap-1">
                    <Ruler className="w-3 h-3 text-[#B8975A]" />
                    <span>Atelier Fit</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 text-xs tracking-[0.16em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#0B0B0B] text-[#F7F3EC] border-[#0B0B0B]'
                            : 'border-[#0B0B0B]/20 text-[#0B0B0B] hover:border-[#0B0B0B]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Bespoke Measurement Fields when Custom Atelier Fit is chosen */}
                {selectedSize === 'Custom Atelier Fit' && (
                  <div className="mt-4 p-3.5 bg-[#0B0B0B]/5 border border-[#B8975A]/40 grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/70 mb-1">
                        Bust (in)
                      </label>
                      <input
                        type="text"
                        value={customMeasurements.bust}
                        onChange={(e) =>
                          setCustomMeasurements((prev) => ({
                            ...prev,
                            bust: e.target.value,
                          }))
                        }
                        className="w-full bg-[#F7F3EC] border border-[#0B0B0B]/20 px-2 py-1 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/70 mb-1">
                        Waist (in)
                      </label>
                      <input
                        type="text"
                        value={customMeasurements.waist}
                        onChange={(e) =>
                          setCustomMeasurements((prev) => ({
                            ...prev,
                            waist: e.target.value,
                          }))
                        }
                        className="w-full bg-[#F7F3EC] border border-[#0B0B0B]/20 px-2 py-1 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#0B0B0B]/70 mb-1">
                        Length (in)
                      </label>
                      <input
                        type="text"
                        value={customMeasurements.length}
                        onChange={(e) =>
                          setCustomMeasurements((prev) => ({
                            ...prev,
                            length: e.target.value,
                          }))
                        }
                        className="w-full bg-[#F7F3EC] border border-[#0B0B0B]/20 px-2 py-1 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Specifications List */}
              <dl className="space-y-2 text-xs border-t border-[#0B0B0B]/10 pt-4 mb-6">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#0B0B0B]/55 uppercase tracking-[0.14em] text-[11px]">
                    Fabric
                  </dt>
                  <dd className="text-right font-medium">{product.fabric}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#0B0B0B]/55 uppercase tracking-[0.14em] text-[11px]">
                    Handwork
                  </dt>
                  <dd className="text-right font-medium">{product.embroidery}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#0B0B0B]/55 uppercase tracking-[0.14em] text-[11px]">
                    Dispatch
                  </dt>
                  <dd className="text-right text-[#5A1424] font-medium">
                    {product.deliveryEstimate}
                  </dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-3.5 px-6 bg-[#0B0B0B] text-[#F7F3EC] hover:bg-[#5A1424] text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-150 cursor-pointer"
            >
              Add to Atelier Bag — {formatPrice(product.pricePKR, currency)}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. SHOPPING BAG & BESPOKE CHECKOUT DRAWER                                  */
/* -------------------------------------------------------------------------- */
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemove: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQty,
  onRemove,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'form' | 'confirmed'>(
    'bag'
  );
  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    paymentMethod: 'COD_PAKISTAN',
  });
  const [orderNumber, setOrderNumber] = useState('LV-8492');

  const subtotalPKR = items.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity,
    0
  );

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `LV-${Math.floor(1000 + Math.random() * 8999)}`;
    setOrderNumber(randomId);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[85] bg-[#0B0B0B]/70 backdrop-blur-xs flex justify-end"
          data-lenis-prevent
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#F7F3EC] text-[#0B0B0B] h-full flex flex-col justify-between border-l border-[#0B0B0B]/15"
          >
            {/* Top Drawer Header */}
            <div className="px-6 py-5 border-b border-[#0B0B0B]/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.26em] uppercase text-[#5A1424]">
                  LIVA ATELIER BAG
                </p>
                <h2 className="font-serif-display text-2xl text-[#0B0B0B]">
                  {checkoutStep === 'bag'
                    ? 'Your Selections'
                    : checkoutStep === 'form'
                    ? 'Commission & Dispatch'
                    : 'Order Confirmed'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('bag');
                  onClose();
                }}
                className="w-9 h-9 inline-flex items-center justify-center text-[#0B0B0B] hover:text-[#5A1424] cursor-pointer"
                aria-label="Close bag"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'confirmed' ? (
                <div className="py-10 text-center space-y-5">
                  <CheckCircle2 className="w-12 h-12 text-[#5A1424] mx-auto stroke-[1.3]" />
                  <div>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-[#B8975A] mb-1 font-mono tabular-nums">
                      COMMISSION #{orderNumber} CONFIRMED
                    </p>
                    <h3 className="font-serif-display text-3xl text-[#0B0B0B]">
                      Thank You, {customer.fullName || 'Patron'}
                    </h3>
                  </div>
                  <p className="text-xs text-[#0B0B0B]/75 leading-relaxed max-w-xs mx-auto">
                    Our Master Tailor in Lahore has received your commission and
                    will contact you at{' '}
                    <span className="font-medium text-[#0B0B0B]">
                      {customer.phone || 'your registered number'}
                    </span>{' '}
                    within 24 hours to finalize drape measurements.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep('bag');
                      onClose();
                    }}
                    className="mt-4 px-6 py-3 bg-[#0B0B0B] text-[#F7F3EC] text-xs tracking-[0.22em] uppercase cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : checkoutStep === 'form' ? (
                <form
                  id="liva-checkout-form"
                  onSubmit={handleConfirmOrder}
                  className="space-y-4"
                >
                  <div className="p-3.5 bg-[#0B0B0B]/5 border border-[#B8975A]/30 text-xs flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#5A1424] shrink-0" />
                    <span>
                      Complimentary insured DHL Express &amp; Pakistan TCS
                      Couture Delivery included.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                      Patron Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="e.g. Begum Ayesha Raza"
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5A1424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                      WhatsApp / Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+92 300 0000000"
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-[#5A1424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                      Destination City &amp; Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="Lahore / Karachi / London / Dubai"
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5A1424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                      Delivery Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, address: e.target.value }))
                      }
                      placeholder="Street, House/Suite Number, Postal Code"
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2 text-xs focus:outline-none focus:border-[#5A1424]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                      Settlement Method
                    </label>
                    <select
                      value={customer.paymentMethod}
                      onChange={(e) =>
                        setCustomer((p) => ({
                          ...p,
                          paymentMethod: e.target.value,
                        }))
                      }
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5A1424]"
                    >
                      <option value="COD_PAKISTAN">
                        Cash on Delivery / Atelier Verification (Pakistan)
                      </option>
                      <option value="BANK_WIRE">
                        Direct Atelier Bank Transfer / IBAN
                      </option>
                      <option value="INTL_CARD">
                        International Concierge Invoice (USD / GBP / AED)
                      </option>
                    </select>
                  </div>
                </form>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <p className="font-serif-display text-2xl text-[#0B0B0B]/70 mb-2">
                    Your Atelier Bag is Empty
                  </p>
                  <p className="text-xs text-[#0B0B0B]/55 max-w-xs mb-6">
                    Explore our Signature Formals, Bridal Lehengas, and Luxury
                    Pret to begin your commission.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-[#0B0B0B] text-xs tracking-[0.22em] uppercase hover:bg-[#0B0B0B] hover:text-[#F7F3EC] transition-colors cursor-pointer"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 pb-6 border-b border-[#0B0B0B]/10"
                    >
                      <div className="w-20 h-28 bg-[#EBE5DA] shrink-0 border border-[#0B0B0B]/10 overflow-hidden">
                        <CoutureImage
                          src={item.product.image}
                          alt={item.product.name}
                          fallbackLabel={item.product.name}
                          width={160}
                          height={224}
                          objectPosition={item.product.imagePosition}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif-display text-lg font-medium text-[#0B0B0B] leading-snug">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() =>
                                onRemove(item.product.id, item.size)
                              }
                              className="text-[#0B0B0B]/40 hover:text-[#5A1424] transition-colors cursor-pointer"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/60 mt-0.5">
                            Size: {item.size}
                          </p>
                          {item.customNotes && (
                            <p className="text-[11px] text-[#5A1424] mt-1">
                              {item.customNotes}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-[#0B0B0B]/20">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQty(item.product.id, item.size, -1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#0B0B0B]/5 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQty(item.product.id, item.size, 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#0B0B0B]/5 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono tabular-nums text-xs font-medium">
                            {formatPrice(
                              item.product.pricePKR * item.quantity,
                              currency
                            )}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && checkoutStep !== 'confirmed' && (
              <div className="p-6 border-t border-[#0B0B0B]/12 bg-[#FAF7F2]">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#0B0B0B]/70">
                    Subtotal
                  </span>
                  <span className="font-mono tabular-nums text-lg font-medium text-[#0B0B0B]">
                    {formatPrice(subtotalPKR, currency)}
                  </span>
                </div>
                <p className="text-[11px] text-[#0B0B0B]/60 mb-4">
                  Complimentary archival garment chest &amp; insured global
                  courier included.
                </p>

                {checkoutStep === 'bag' ? (
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('form')}
                    className="w-full py-3.5 px-6 bg-[#0B0B0B] text-[#F7F3EC] hover:bg-[#5A1424] text-xs tracking-[0.24em] uppercase font-medium transition-colors cursor-pointer"
                  >
                    Proceed to Atelier Checkout
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('bag')}
                      className="px-4 py-3.5 border border-[#0B0B0B]/25 text-xs tracking-[0.2em] uppercase cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="liva-checkout-form"
                      className="flex-1 py-3.5 px-6 bg-[#5A1424] text-[#F7F3EC] hover:bg-[#0B0B0B] text-xs tracking-[0.24em] uppercase font-medium transition-colors cursor-pointer"
                    >
                      Confirm Commission
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. INSTANT SEARCH OVERLAY                                                  */
/* -------------------------------------------------------------------------- */
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const results = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.embroidery.toLowerCase().includes(q) ||
      p.primaryCategory.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[85] bg-[#0B0B0B]/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#F7F3EC] text-[#0B0B0B] border border-[#B8975A]/30 p-6 sm:p-8 max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center gap-3 border-b border-[#0B0B0B]/20 pb-4">
              <Search className="w-5 h-5 text-[#5A1424] stroke-[1.5]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by silhouette, zardozi, organza, velvet, bridal..."
                className="w-full bg-transparent text-base sm:text-lg font-serif-display focus:outline-none placeholder:text-[#0B0B0B]/40"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#0B0B0B]/60 hover:text-[#0B0B0B] cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Quick Search Suggestions */}
            <div className="flex items-center gap-2 flex-wrap py-3 text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/60">
              <span>Popular:</span>
              {['Zardozi', 'Bridal', 'Velvet', 'Organza', 'Kalidar', 'Noir'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="underline hover:text-[#5A1424] cursor-pointer"
                  >
                    {term}
                  </button>
                )
              )}
            </div>

            <div className="flex-1 overflow-y-auto pt-3 divide-y divide-[#0B0B0B]/10">
              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="w-full py-3.5 flex items-center justify-between gap-4 text-left hover:bg-[#0B0B0B]/5 px-2 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-[#EBE5DA] shrink-0 overflow-hidden">
                      <CoutureImage
                        src={item.image}
                        alt={item.name}
                        fallbackLabel={item.name}
                        width={96}
                        height={128}
                        objectPosition={item.imagePosition}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#5A1424]">
                        {item.primaryCategory}
                      </p>
                      <p className="font-serif-display text-lg font-medium text-[#0B0B0B]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#0B0B0B]/60">{item.fabric}</p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-xs font-medium shrink-0">
                    {formatPrice(item.pricePKR, currency)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. CLIENT ATELIER PORTAL (LOGIN & PRIVATE BRIDAL APPOINTMENT MODAL)        */
/* -------------------------------------------------------------------------- */
interface AtelierPortalModalProps {
  isOpen: boolean;
  initialTab: 'login' | 'appointment';
  onClose: () => void;
}

export const AtelierPortalModal: React.FC<AtelierPortalModalProps> = ({
  isOpen,
  initialTab,
  onClose,
}) => {
  const [tab, setTab] = useState<'login' | 'appointment'>(initialTab);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  React.useEffect(() => {
    setTab(initialTab);
    setSubmittedMessage(null);
  }, [initialTab, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="portal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[85] bg-[#0B0B0B]/75 backdrop-blur-xs flex items-center justify-center p-4"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#F7F3EC] text-[#0B0B0B] border border-[#B8975A]/35 p-6 sm:p-8 relative"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 text-[#0B0B0B]/60 hover:text-[#0B0B0B] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Mode Switcher */}
            <div className="flex border-b border-[#0B0B0B]/15 mb-6">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setSubmittedMessage(null);
                }}
                className={`pb-3 pr-6 text-xs tracking-[0.22em] uppercase cursor-pointer border-b-2 transition-colors ${
                  tab === 'login'
                    ? 'border-[#5A1424] text-[#5A1424] font-medium'
                    : 'border-transparent text-[#0B0B0B]/55'
                }`}
              >
                Client Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('appointment');
                  setSubmittedMessage(null);
                }}
                className={`pb-3 px-6 text-xs tracking-[0.22em] uppercase cursor-pointer border-b-2 transition-colors ${
                  tab === 'appointment'
                    ? 'border-[#5A1424] text-[#5A1424] font-medium'
                    : 'border-transparent text-[#0B0B0B]/55'
                }`}
              >
                Bridal Appointment
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-4">
                <Sparkles className="w-9 h-9 text-[#B8975A] mx-auto stroke-[1.4]" />
                <h3 className="font-serif-display text-2xl text-[#0B0B0B]">
                  Atelier Concierge Dispatched
                </h3>
                <p className="text-xs text-[#0B0B0B]/75 leading-relaxed max-w-sm mx-auto">
                  {submittedMessage}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0B0B0B] text-[#F7F3EC] text-xs tracking-[0.2em] uppercase cursor-pointer"
                >
                  Return to Boutique
                </button>
              </div>
            ) : tab === 'login' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmittedMessage(
                    'A private one-time Atelier access pass and your saved measurement profile have been sent to your email.'
                  );
                }}
                className="space-y-4"
              >
                <h3 className="font-serif-display text-2xl text-[#0B0B0B]">
                  Sign In to Your LIVA Archive
                </h3>
                <p className="text-xs text-[#0B0B0B]/70 leading-relaxed">
                  Access your bespoke bridal measurements, active Lahore
                  karigar production photos, and international DHL tracking.
                </p>
                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                    Client Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="patron@domain.com"
                    className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5A1424]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1.5">
                    Commission Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LV-8492"
                    className="w-full bg-white border border-[#0B0B0B]/20 px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-[#5A1424]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0B0B0B] text-[#F7F3EC] hover:bg-[#5A1424] text-xs tracking-[0.24em] uppercase font-medium transition-colors cursor-pointer"
                >
                  Access Client Archive
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmittedMessage(
                    'Your private bridal consultation request is registered. Our Senior Bridal Stylist will confirm your suite timing shortly.'
                  );
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs text-[#5A1424]">
                  <Calendar className="w-4 h-4 stroke-[1.5]" />
                  <span className="tracking-[0.18em] uppercase text-[11px]">
                    One-on-One Couture Consultation
                  </span>
                </div>
                <h3 className="font-serif-display text-2xl text-[#0B0B0B]">
                  Reserve a Private Bridal Fitting
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1">
                      Bride / Patron Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 / +44 / +971"
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1">
                      Salon Location
                    </label>
                    <select className="w-full bg-white border border-[#0B0B0B]/20 px-3 py-2 text-xs">
                      <option>Lahore — M.M. Alam Flagship</option>
                      <option>Karachi — Clifton Privé Salon</option>
                      <option>London — Knightsbridge Trunk Show</option>
                      <option>Dubai — DIFC Private Suite</option>
                      <option>Virtual 4K Atelier Video Fitting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.18em] uppercase text-[#0B0B0B]/75 mb-1">
                      Event Date / Month *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-white border border-[#0B0B0B]/20 px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5A1424] text-[#F7F3EC] hover:bg-[#0B0B0B] text-xs tracking-[0.24em] uppercase font-medium transition-colors cursor-pointer"
                >
                  Request Private Suite
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
