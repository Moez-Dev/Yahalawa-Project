import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Suspense } from 'react';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import TipCard from './TipCard';

    const TipCarousel = ({ section, session }) => {
        const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay({ delay: 3000 })]);
    
        return (
            <div className="embla" ref={emblaRef}>
                <div className="embla__container mt-3">
                    {section.map((card) => (
                        <div key={card.id} className="embla__slide cursor-pointer">
                            <Suspense fallback={<RecipeCardSkeleton />}>
                                <TipCard el={card} session={session} />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
  


export default TipCarousel