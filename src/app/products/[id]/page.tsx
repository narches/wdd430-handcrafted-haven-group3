import { fetchProductById } from '@/app/lib/data';
import { CardWrapper, ProductPageCard } from '@/app/ui/products/cards';
import { CardsSkeleton, ProductPageCardSkeleton } from '@/app/ui/products/skeletons';
import { SellerCard } from '@/app/ui/seller/card';
import { SellerCardSkeleton } from '@/app/ui/seller/skeletons';
import NavBar from '@/app/ui/util/header';
import { ProductReviewPage } from '@/app/ui/util/review';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page(props:{ 
  params: Promise<{id: string }>,
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const resolvedParams = await props.params;
  const id = resolvedParams.id;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  
  // Fetch the product data to verify existence
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="justify-items-center items-center border-4 grid grid-rows-[20px_1fr_20px] p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start gap-8 col-end-3 row-start-2 w-full">
        <NavBar />
        <div className="pt-20 md:pt-5">
          <Suspense fallback={<ProductPageCardSkeleton />}>
            <ProductPageCard id={id} />
          </Suspense>
        </div>
        <div className="pt-16">
          {product.seller_id && (
            <Suspense fallback={<SellerCardSkeleton />}>
              <SellerCard sellerId={product.seller_id} />
            </Suspense>
          )}
        </div>
        <h1 className="p-4 font-bold text-2xl">Similar Products:</h1>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper seller_id='' query={query} limit={8}  />
        </Suspense>
        <h2 className="pt-8 font-bold text-xl">Customer Reviews:</h2>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ProductReviewPage />
        </Suspense>
      </main>
    </div>
  );
}
