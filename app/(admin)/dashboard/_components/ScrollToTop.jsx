'use client'

import { useEffect, useState } from "react"



const ScrollToTop = () => {

    const [showBtn, setshowBtn] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
              setshowBtn(true);
            } else {
              setshowBtn(false);
            }
          };
      
          window.addEventListener("scroll", handleScroll);
      
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
    }, [])



const handleGoToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

return (
    <>
       {
       showBtn ?  <button
            onClick={handleGoToTop}
            className="mr-4 w-[25%] text-end font-semibold text-sm hover:text-blue duration-300"
        >
            Scroll to <span className="text-lg"> &#8593;</span>
        </button>
        :
        <div className="w-[25%]"></div>
        }
    </>
)
}

export default ScrollToTop