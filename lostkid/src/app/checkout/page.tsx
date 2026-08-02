"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Image from "next/image";

type Step = "shipping" | "payment" | "review";

const STEPS: { id: Step; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];

interface ShippingForm {
  firstName: string; lastName: string; email: string;
  phone: string; address: string; city: string; state: string; zip: string;
}

interface PaymentForm {
  cardName: string; cardNumber: string; expiry: string; cvv: string;
}

function formatCard(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const InputField = ({ label, id, error, ...props }: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-brand-brown-light mb-1">
      {label}
    </label>
    <input
      id={id}
      className={`w-full border rounded-xl px-4 py-3 text-sm bg-transparent outline-none transition-colors ${
        error ? "border-red-400" : "border-brand-sand focus-visible:border-brand-brown"
      }`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const { state, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState<ShippingForm>({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
  });
  const [payment, setPayment] = useState<PaymentForm>({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState<Partial<ShippingForm & PaymentForm>>({});
  const [placing, setPlacing] = useState(false);

  const shippingCost = cartTotal >= 100 ? 0 : 8;
  const total = cartTotal + shippingCost;

  const validateShipping = () => {
    const e: Partial<ShippingForm> = {};
    if (!shipping.firstName) e.firstName = "Required";
    if (!shipping.lastName) e.lastName = "Required";
    if (!shipping.email || !shipping.email.includes("@")) e.email = "Valid email required";
    if (!shipping.address) e.address = "Required";
    if (!shipping.city) e.city = "Required";
    if (!shipping.state) e.state = "Required";
    if (!shipping.zip || shipping.zip.length < 5) e.zip = "Valid ZIP required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Partial<PaymentForm> = {};
    if (!payment.cardName) e.cardName = "Required";
    if (payment.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Valid card number required";
    if (!payment.expiry || payment.expiry.length < 5) e.expiry = "Valid expiry required";
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = "Valid CVV required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === "shipping" && validateShipping()) setStep("payment");
    else if (step === "payment" && validatePayment()) setStep("review");
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = `LK-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    router.push(`/checkout/success?order=${orderId}`);
  };

  const stepIdx = STEPS.findIndex((s) => s.id === step);



  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-brown mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map(({ id, label }, i) => (
          <div key={id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-colors ${
              i < stepIdx
                ? "bg-brand-brown border-brand-brown text-brand-cream"
                : i === stepIdx
                ? "border-brand-brown text-brand-brown"
                : "border-brand-sand text-brand-brown-light"
            }`}>
              {i < stepIdx ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium hidden sm:block ${
              i === stepIdx ? "text-brand-brown" : "text-brand-brown-light"
            }`}>{label}</span>
            {i < STEPS.length - 1 && (
              <div className={`w-12 h-0.5 mx-3 transition-colors ${
                i < stepIdx ? "bg-brand-brown" : "bg-brand-sand"
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === "shipping" && (
              <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-brand-brown mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="First Name" id="firstName" value={shipping.firstName} onChange={(e) => setShipping((p) => ({ ...p, firstName: e.target.value }))} error={errors.firstName} placeholder="Jane" />
                  <InputField label="Last Name" id="lastName" value={shipping.lastName} onChange={(e) => setShipping((p) => ({ ...p, lastName: e.target.value }))} error={errors.lastName} placeholder="Doe" />
                </div>
                <InputField label="Email" id="email" type="email" value={shipping.email} onChange={(e) => setShipping((p) => ({ ...p, email: e.target.value }))} error={errors.email} placeholder="jane@email.com" />
                <InputField label="Phone (optional)" id="phone" type="tel" value={shipping.phone} onChange={(e) => setShipping((p) => ({ ...p, phone: e.target.value }))} placeholder="+1 (555) 000-0000" />
                <InputField label="Street Address" id="address" value={shipping.address} onChange={(e) => setShipping((p) => ({ ...p, address: e.target.value }))} error={errors.address} placeholder="123 Main St" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <InputField label="City" id="city" value={shipping.city} onChange={(e) => setShipping((p) => ({ ...p, city: e.target.value }))} error={errors.city} placeholder="Los Angeles" />
                  </div>
                  <InputField label="State" id="state" value={shipping.state} onChange={(e) => setShipping((p) => ({ ...p, state: e.target.value }))} error={errors.state} placeholder="CA" />
                </div>
                <InputField label="ZIP Code" id="zip" value={shipping.zip} onChange={(e) => setShipping((p) => ({ ...p, zip: e.target.value }))} error={errors.zip} placeholder="90001" />
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-brand-brown mb-4">Payment Details</h2>
                <div className="bg-accent-pink/20 border border-accent-pink/40 rounded-xl px-4 py-3 text-sm text-brand-brown">
                  🔒 This is a <strong>demo</strong> — no real payments are processed.
                </div>
                <InputField label="Name on Card" id="cardName" value={payment.cardName} onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))} error={errors.cardName} placeholder="Jane Doe" />
                <InputField label="Card Number" id="cardNumber" value={payment.cardNumber} onChange={(e) => setPayment((p) => ({ ...p, cardNumber: formatCard(e.target.value) }))} error={errors.cardNumber} placeholder="4242 4242 4242 4242" inputMode="numeric" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Expiry Date" id="expiry" value={payment.expiry} onChange={(e) => setPayment((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))} error={errors.expiry} placeholder="MM/YY" inputMode="numeric" />
                  <InputField label="CVV" id="cvv" value={payment.cvv} onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} error={errors.cvv} placeholder="123" inputMode="numeric" />
                </div>
              </motion.div>
            )}

            {step === "review" && (
              <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-semibold text-brand-brown mb-6">Review Your Order</h2>
                <div className="bg-brand-cream-dark/50 rounded-2xl p-4 space-y-2 text-sm mb-6">
                  <p className="font-semibold text-brand-brown mb-1">Shipping to:</p>
                  <p className="text-brand-brown-light">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-brand-brown-light">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                  <p className="text-brand-brown-light">{shipping.email}</p>
                </div>
                <div className="space-y-3">
                  {state.cart.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-sand shrink-0">
                        <Image src={item.snapshot.image.src} alt={item.snapshot.image.alt} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-brand-brown">{item.snapshot.name}</p>
                        <p className="text-brand-brown-light">{item.snapshot.color} × {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-brand-brown">
                        ${(item.snapshot.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step !== "shipping" && (
              <button onClick={() => setStep(step === "review" ? "payment" : "shipping")} className="border border-brand-sand rounded-full px-6 py-2.5 text-sm font-semibold text-brand-brown hover:bg-brand-cream-dark transition-colors">
                Back
              </button>
            )}
            <div className="ml-auto">
              {step !== "review" ? (
                <button onClick={handleNext} className="bg-brand-brown text-brand-cream rounded-full px-8 py-2.5 text-sm font-semibold hover:bg-brand-brown-dark transition-colors">
                  Continue
                </button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="bg-brand-brown text-brand-cream rounded-full px-8 py-2.5 text-sm font-semibold hover:bg-brand-brown-dark transition-colors disabled:opacity-60"
                >
                  {placing ? "Placing order..." : `Place Order — $${total.toFixed(2)}`}
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-brand-cream border border-brand-sand rounded-2xl p-5 sticky top-24">
            <h3 className="font-display text-lg font-semibold text-brand-brown mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              {state.cart.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex justify-between">
                  <span className="text-brand-brown-light truncate flex-1 mr-2">
                    {item.snapshot.name} × {item.quantity}
                  </span>
                  <span className="font-medium shrink-0">${(item.snapshot.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-brand-sand mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-brand-brown-light">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-brand-brown-light">Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-brand-brown pt-2 border-t border-brand-sand">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
