"use client";

import { TaskParam } from '@/types/task';
import React from 'react'

function BrowserInstanceParam({ param,  }: { param: TaskParam }) {
  return (
    <p className='text-xs'>
      {param.name}
    </p>
  )
}

export default BrowserInstanceParam