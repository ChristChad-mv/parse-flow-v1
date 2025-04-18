"use client";

import React, { useId, useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ParamProps } from '@/types/appNode';

function StringParam({ param, value, updateNodeParamValue }: ParamProps ) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();
  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-500 px-1'>*</p> }
      </Label>
      <Input 
        id={id}
        className='text-xs'
        value={value}
        placeholder='Enter a value here'
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}  
      />
      {param.helperText && (
        <p className='text-muted-foreground px-2'>{param.helperText}</p>
      )}
    </div>
  )
}

export default StringParam