import { Minus } from "lucide-react"
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

export default function OTPInput() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Label className="text-foreground text-sm font-medium">Label</Label>
      <div className="flex items-start gap-2">
        <div className="flex items-center shadow-sm">
          <InputOTP maxLength={3}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-9 h-9 rounded-md border bg-background" />
              <InputOTPSlot index={1} className="w-9 h-9 border bg-background" />
              <InputOTPSlot index={2} className="w-9 h-9 rounded-md border bg-background" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <Minus className="text-foreground" />
        
        <div className="flex items-center shadow-sm">
          <InputOTP maxLength={3}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-9 h-9 rounded-md border bg-background" />
              <InputOTPSlot index={1} className="w-9 h-9 border bg-background" />
              <InputOTPSlot index={2} className="w-9 h-9 rounded-md border bg-background" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  )
}
