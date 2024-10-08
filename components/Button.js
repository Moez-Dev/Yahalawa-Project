'use client'

const Button = ({addUnit}) => {
  return (
    <div>
        <button  onClick={async () => {
      await addUnit()
    }}>ADD table</button>
    </div>
  )
}

export default Button