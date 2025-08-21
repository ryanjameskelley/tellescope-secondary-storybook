import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchWithLabel() {
  return (
    <div className="flex gap-3 items-start">
      <Switch id="switch-component" />
      <div className="flex flex-col gap-2">
        <div className="h-17 flex items-center pt-3">
          <Label htmlFor="switch-component" className="text-sm font-medium text-foreground">
            Switch Text
          </Label>
        </div>
        <p className="text-sm text-muted-foreground leading-5">
          This is a switch description.
        </p>
      </div>
    </div>
  )
}
