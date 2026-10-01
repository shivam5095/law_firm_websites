import Image from 'next/image';
import { firm } from '@/data/firm';

export function Hero() {
  return (
    <section>
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-[#0b1526] lg:aspect-[8/3]">
        <Image
          src="/images/hero/hero-office.jpeg"
          alt="Maurya & Co. – Advocates and Legal Consultants. Where Law Meets Strategy. Office with a view of global city skylines"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 3'%3E%3Crect width='8' height='3' fill='%230b1526'/%3E%3C/svg%3E"
          className="object-cover object-[30%_center] lg:object-center"
        />
      </div>
      <h1 className="sr-only">Where Law Meets Strategy. Focused Dispute Resolution.</h1>
      <p className="sr-only">{firm.description}</p>
    </section>
  );
}
