import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Suspense } from 'react';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import RecipeCard from './RecipeCard';

    const RecipeCarousel = ({ recipes, session }) => {
        const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay({ delay: 3000 })]);
    
        return (
            <div className="embla" ref={emblaRef}>
                <div className="embla__container mt-3">
                    {recipes.map((card) => (
                        <div key={card.id} className="embla__slide cursor-pointer">
                            <Suspense fallback={<RecipeCardSkeleton />}>
                                <RecipeCard el={card} session={session} />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
  


export default RecipeCarousel