import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Label } from "./label";
import { useState } from "react";

function SwitchPanel() {
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityEmails, setSecurityEmails] = useState(true);

  const handleMarketingClick = () => {
    setMarketingEmails(!marketingEmails);
  };

  const handleSecurityClick = () => {
    if (!securityEmails) return; // Don't allow changing if disabled
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <div 
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm cursor-pointer"
            onClick={handleMarketingClick}
          >
            <div className="space-y-0.5">
              <Label htmlFor="marketing-switch" className="text-sm font-medium cursor-pointer">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products, features, and more.
              </p>
            </div>
            <Switch
              id="marketing-switch"
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
          <div 
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm cursor-not-allowed opacity-50"
            onClick={handleSecurityClick}
          >
            <div className="space-y-0.5">
              <Label htmlFor="security-switch" className="text-sm font-medium cursor-not-allowed">Security emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account security.
              </p>
            </div>
            <Switch
              id="security-switch"
              checked={securityEmails}
              onCheckedChange={setSecurityEmails}
              disabled
              aria-readonly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof SwitchPanel> = {
  title: "Molecules/Switch Panel",
  component: SwitchPanel,
};
export default meta;
type Story = StoryObj<typeof SwitchPanel>;

export const Default: Story = {
  render: () => <SwitchPanel />,
};