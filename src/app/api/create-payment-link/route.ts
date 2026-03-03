import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { designPackages } from "@/constants/designs";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { packageId } = await req.json();

    // Find package on server (don’t trust client price)
    const pkg = designPackages.find((p) => p.id === packageId);

    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    const amount = Number(pkg.price); // INR

    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100,
      currency: "INR",
      description: pkg.title,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      callback_method: "get",
      notes: {
        packageId: pkg.id,
        packageName: pkg.title,
      },
    } as any);

    return NextResponse.json({ url: paymentLink.short_url });
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 500 },
    );
  }
}
