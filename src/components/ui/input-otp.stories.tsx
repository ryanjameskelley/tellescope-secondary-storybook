import type { Meta, StoryObj } from "@storybook/react";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot,
  InputOTPSeparator
} from "./input-otp";

function SimpleOTP() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

const meta: Meta<typeof SimpleOTP> = {
  title: "Atoms/Input OTP",
  component: SimpleOTP,
};
export default meta;
type Story = StoryObj<typeof SimpleOTP>;

export const Default: Story = {
  render: () => <SimpleOTP />,
};