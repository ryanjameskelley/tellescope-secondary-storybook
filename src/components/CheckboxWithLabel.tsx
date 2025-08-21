import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function CheckboxWithLabel() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-start gap-2">
      <Checkbox 
        id="terms" 
        checked={checked} 
        onCheckedChange={setChecked}
      />
      <Label 
        htmlFor="terms" 
        className="text-foreground font-medium text-sm leading-none"
      >
        Accept terms and conditions
      </Label>
    </div>
  )
}
