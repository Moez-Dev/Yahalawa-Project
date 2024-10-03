
const LienRecetteList = ({ lienRecetteList, deleteLink }) => {
    return (
      <>
        {lienRecetteList.map((el) => {
  
          const {name, link} = el
  
          return (
            <div key={el.id} className="flex items-center space-x-4 my-3 bg-gray rounded-md py-1 px-2 w-fit">
              <p dir="rtl" >{link}</p>
              <p dir="rtl" className="font-semibold">{name} : </p>
              <p onClick={()=>deleteLink(el.id)} className='bg-gray rounded-md py-1 px-2 text-red hover:font-bold duration-300 cursor-pointer'>&#10005;</p>
            </div>
          )
        })}
      </>
    )
  }
  
  export default LienRecetteList