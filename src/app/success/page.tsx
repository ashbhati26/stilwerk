export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold">
          Payment Successful 🎉
        </h1>

        <p className="mt-4 text-black/70">
          Thanks for your purchase!  
          We’ll send your download link to your email shortly.
        </p>

        <p className="mt-2 text-sm text-black/50">
          (Usually within a few hours)
        </p>
      </div>
    </div>
  );
}
