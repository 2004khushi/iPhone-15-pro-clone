import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const VideoCarousel = () => {
    const videoRef = useRef([]); //useref() often used for accessing and interacting with DOM elements, storing mutable values, and even creating instances of certain values that don't trigger component re-renders when changed.
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
     isEnd: false,
     startPlay: false,
     videoId: 0,
     isLastVideo: false,
     isPlaying: false,
    })
    const [loadedData, setloadedData] = useState([]);

    const {isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration:2,
            ease:'power2.inOut',
        })
      gsap.to('#video', {
        scrollTrigger:{
            trigger:'#video',
            toggleActions:'restart none none none',
        },
        onComplete: () => {
            setVideo((pre) => ({
                ...pre, startPlay: true, isPlaying: true,
            }))
        }
      })
    },[isEnd, videoId])

    useEffect(() => {
      if (loadedData.length > 3) {
          const videoElement = videoRef.current[videoId];
  
          if (isPlaying && !videoElement.paused) {
              // Video is already playing, no need to call play again
              return;
          }
  
          if (isPlaying) {
              // Ensure play is called only if the video is ready
              videoElement.play().catch((err) => {
                  console.error('Error playing video:', err);
              });
          } else {
              // Pause the video if it's playing
              videoElement.pause();
          }
      }
    }, [isPlaying, startPlay, videoId, loadedData]);
  

    const handleloadedMetadata = (i,e) => setloadedData((pre) => [...pre, e])

    useEffect(() => {
     let currentProgress =0;
     let span = videoSpanRef.current;
     if(span[videoId]){
        //animate the progress of the video
        let anim = gsap.to(span[videoId], {
            onUpdate: () => {
             const progress = Math.ceil(anim.progress() * 100);

             if(progress != currentProgress){
                currentProgress=progress;

                gsap.to(videoDivRef.current[videoId], {
                  width: window.innerWidth<760 ? '10vw' : window.innerWidth<1200  ? '10vw' : '4vw'
                })

                gsap.to(span[videoId], {
                    width: `${currentProgress}%`,
                    backgroundColor: 'white',
                })
             }
            },
            onComplete: () => {
              if(isPlaying){
                gsap.to(videoDivRef.current[videoId],{
                    width:'12px'
                })
                gsap.to(span[videoId],{
                    backgroundColor: '#afafaf'
                })
              }
            }
        })

        if(videoId === 0){
            anim.restart();
        }

        // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

        if(isPlaying){
            gsap.ticker.add(animUpdate)
         }else {
            gsap.ticker.remove(animUpdate)
        }
     }
     
    },[videoId, startPlay])

    const handleProcess = (type, i) => {
        switch (type) {
          case "video-end":
            setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
            break;
    
          case "video-last":
            setVideo((pre) => ({ ...pre, isLastVideo: true }));
            break;
    
          case "video-reset":
            setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
            break;
    
          case "pause":
              if (isPlaying) {
                  setVideo((pre) => ({ ...pre, isPlaying: false }));
                  videoRef.current[videoId].pause(); // Pause video here
              } else {
                  setVideo((pre) => ({ ...pre, isPlaying: true }));
                  videoRef.current[videoId].play(); // Play video here
              }
              break;
  
          case "play":
              setVideo((pre) => ({ ...pre, isPlaying: true }));
              videoRef.current[videoId].play(); // Play video here
              break;
    
          default:
            return video;
        }
    };
    
    
   


  return (
    <>
    <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
            <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                <div className='video-carousel_container'>  
                  <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                    <video id='video' muted playsInline={true} preload='auto'
                      className={`${
                        list.id === 2 && 'translate-x-44'} pointer-events-none
                      }`}
                      ref={(el) => (
                        videoRef.current[i] = el)}
                      onEnded={() => 
                            i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                      }  
                      onPlay={() => {
                        setVideo((prevVideo ) => ({
                            ...prevVideo, isPlaying: true
                        }))
                      }}
                      onLoadedMetadata={(e) => handleloadedMetadata(i,e)}  
                      >
                        <source src={list.video} type='video/mp4' />
                    </video>
                  </div>

                  <div className='absolute top-12 left-[5%] z-10'>
                   {list.textLists.map((text) => (
                    <p key = {text} className='md:text-2xl text-xl font-medium'>
                        {text}
                    </p>
                   ))}
                  </div>
                </div>
            </div>
        ))}
    </div>

    <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
            {videoRef.current.map((_, i) => (
                <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className='rounded-full relative cursor-pointer mx-2 w-3 h-3 bg-gray-200'>
                     <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)}/>

                </span>
            ))}
        </div>
        <button className='control-btn'>
        <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} 
        onClick={isLastVideo? () => handleProcess('video-reset'): !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')} />

        </button>
    </div>
    
    </>
  )
}
