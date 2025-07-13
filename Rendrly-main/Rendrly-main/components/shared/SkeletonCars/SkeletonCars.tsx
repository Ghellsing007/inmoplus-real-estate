import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCars() {
  const numeberItems = 8;
  return (
    <div className=" grid md:grid-cols-2 grid-cols-2 gap-6 lg:grid-cols-4">
      {[...Array(numeberItems)].map((_, index) => (
        <div key={index}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-4  w-[200ppx] mt-5" />
          <Skeleton className="h-4  w-[200ppx] mt-5" />
          <Skeleton className="h-4  w-[200ppx] mt-5" />
        </div>
      ))}
    </div>
  );
}
