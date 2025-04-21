"use client";

import React, { useId, useState, useEffect } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ParamProps } from '@/types/appNode';
import { Textarea } from '@/components/ui/textarea';

function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps ) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value); 
  }, [value]);

  let Component = Input;
  if(param.variant === "textarea") {
    Component = Textarea;
  }
  
  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-500 px-1'>*</p> }
      </Label>
      <Component 
        id={id}
        className='text-xs'
        value={internalValue}
        disabled={disabled}
        placeholder='Enter a value here'
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e:any) => updateNodeParamValue(e.target.value)} 
      />
      {param.helperText && (
        <p className='text-muted-foreground px-2'>{param.helperText}</p>
      )}
    </div>
  )
}

export default StringParam;