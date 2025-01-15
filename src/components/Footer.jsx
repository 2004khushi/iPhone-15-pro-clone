import React from 'react'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5 '>
        <div className='screen-max-width'>
            <div >
                <p className='font-semibold text-xs text-gray'>
                    More ways to shop: {' '}
                    <span className='underline text-blue'>
                        Find an Apple store 
                    </span> 
                    {' '} or {' '}
                    <span className='underline text-blue'>
                        other retailer 
                    </span> 
                    {' '} near you
                </p>
                <p className='font-semibold text-xs text-gray'>
                    or Call : 3333-456-267
                </p>
            </div>

            <div className='bg-neutral-700 my-5 h-[1px] w-full'></div>
        </div>
    </footer>
  )
}

export default Footer
