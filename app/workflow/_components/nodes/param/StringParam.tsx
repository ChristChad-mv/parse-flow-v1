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
  let componentProps = {
    id,
    className: 'text-xs',
    value: internalValue,
    disabled,
    placeholder: 'Enter a value here',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInternalValue(e.target.value),
    onBlur: () => updateNodeParamValue(internalValue)
  };

  if(param.variant === "textarea") {
    Component = Textarea;
    componentProps = {
      ...componentProps,
      className: 'text-xs min-h-[100px] resize-y',
    };
  }
  
  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-500 px-1'>*</p> }
      </Label>
      <Component {...componentProps} />
      {param.helperText && (
        <p className='text-muted-foreground px-2'>{param.helperText}</p>
      )}
    </div>
  )
}

export default StringParam;