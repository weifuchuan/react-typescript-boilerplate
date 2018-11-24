// @flow
import React from 'react'; 
import useWindowWidth from '@/hooks/useWindowWidth'

export default function ShowWindowWidth(){
  const width = useWindowWidth(); 
  return (
    <div>
      <span>window width = {width}</span>
    </div>
  )
}