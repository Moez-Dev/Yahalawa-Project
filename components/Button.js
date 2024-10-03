'use client'

const Button = ({addUnit}) => {
  return (
    <div>
        <button  onClick={async () => {
      await addUnit()
    }}>ADD</button>
    </div>
  )
}

export default Button