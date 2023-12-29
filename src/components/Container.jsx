import React from 'react'

const Container = ({children,className}) => {
  return (
    <div className={`max-w-7xl mx-auto p-2 w-full  ${className}`}>
      {children}
    </div>
  )
}

export default Container
