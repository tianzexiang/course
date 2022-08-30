import { useState, useCallback, ChangeEvent} from "react"

export function useInputVal(initialVal: string) {
  const [value, setValue]  = useState(initialVal)
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  },[])
  return {
    inputAttr: {
      value,
      onChange
    },
    setValue
  }
}