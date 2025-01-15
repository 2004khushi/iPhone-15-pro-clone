import { Html, OrbitControls, PerspectiveCamera, View} from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import Pika from './Pika'
import * as THREE from 'three'
import Loader from './Loader'




export const ModelView = ({index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    item,
    size,}) => {
        
  return (
    <View index={index} id={gsapType} className={` w-full h-full absolute ${index === 2 ? 'right-[-100%]': ''}`}  >
        {/* Ambient Light */}
        <ambientLight intensity={0.3} />
        <PerspectiveCamera makeDefault position={[0,0,4]} />
        <Lights />

        <OrbitControls
         makeDefault
         ref={controlRef}
         enableZoom={false}
         enablePan={false}
         rotateSpeed={0.4}
         target={new THREE.Vector3(0,0,0)}
         onEnd={() => {
            console.log('onEnd event triggered!'); 
            setRotationState(controlRef.current.getAzimuthalAngle()); 
          }}
        />

        <group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0 ,0]}>
          <Suspense fallback={<Loader />}>
           <Pika
             scale={index ===1 ? [15,15,15]: [17,17,17]}
             item={item}
             size={size}
            />
          </Suspense>
      
        </group>
        
    </View>
  )
}
