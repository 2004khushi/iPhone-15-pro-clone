import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils';


export const Hero = () => {
     const [videoSrc, setvideoSrc] = useState(window.innerWidth<760 ?smallHeroVideo :heroVideo) //yahape apan ne bas set krdiya ki agar 760 se choti screen me if u open then the small video will play so even if u resize the tab/window it stays same and doesnt chnages to hero video so u need to add useffect to do that dynamic changing so even if u expand or shorten the tab u will see the setting of video accordingly!, u can understand it better by removing useeffect() and handlevidesrcset
     const handleVideoSrcSet = () => {
        if(window.innerWidth<760){
            setvideoSrc(smallHeroVideo)
        }else {
            setvideoSrc(heroVideo)
        }
     }

     useEffect(() => {
      window.addEventListener('resize', handleVideoSrcSet);
      return () => {
        window.removeEventListener('resize',handleVideoSrcSet)
      }
     },[])


    useGSAP(() => {
      gsap.to('#hero', {
        opacity:1,delay:1.5,
      })

      gsap.to('#cta',{
        opacity:1, delay:1.5,y:-10,
      })
    },[])
  return (
    <section className='w-full nav-height bg-black relative'>
        <nav className='h-5/6 w-full  flex-center flex-col '>
          <p id = 'hero' className='hero-title' controls >Iphone 15 Pro</p>
          <div className='md:w-10/12 w-9/12 '>
            <video className=' pointer-events-none ' autoPlay muted playsInline={true} key={videoSrc}>
                <source src={videoSrc} type='video/mp4' />
            </video>
          </div>

          <div id='cta' className='opacity-0 flex flex-col items-center translate-y-20 '>
            <a href='#highlights' className='btn'> Buy </a>
            <p className='font-normal text-xl'>From $199/month or $999</p>
          </div>
        </nav>
    </section>
  )
}
