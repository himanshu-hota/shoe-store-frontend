import React from 'react'

const Wrapper = ({className,children}) => {
  return (
    <div className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto 1 ${className || ""}`}>{
        children
    }</div>
  )
}

export default Wrapper