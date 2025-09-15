import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The id of the element this label is for',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Patient Name',
    htmlFor: 'patient-name',
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email Address</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </Label>
        <p className="text-xs text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
}

export const WithRadioGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <Label className="text-base font-medium">Care Priority Level</Label>
      <RadioGroup defaultValue="medium" className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low" />
          <Label htmlFor="low" className="font-normal">Low Priority</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium" className="font-normal">Medium Priority</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high" />
          <Label htmlFor="high" className="font-normal">High Priority</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="urgent" id="urgent" />
          <Label htmlFor="urgent" className="font-normal">Urgent</Label>
        </div>
      </RadioGroup>
    </div>
  ),
}

export const FormLabels: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-1.5">
        <Label htmlFor="patient-id">Patient ID *</Label>
        <Input id="patient-id" placeholder="Enter patient ID" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="first-name">First Name *</Label>
        <Input id="first-name" placeholder="Enter first name" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="last-name">Last Name *</Label>
        <Input id="last-name" placeholder="Enter last name" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="emergency-contact">Emergency Contact</Label>
        <Input id="emergency-contact" placeholder="Contact name and number" />
      </div>
    </div>
  ),
}

export const MedicalFormLabels: Story = {
  render: () => (
    <div className="space-y-6 max-w-lg">
      <div className="space-y-3">
        <Label className="text-base font-medium">Medical Information</Label>
        
        <div className="space-y-1.5">
          <Label htmlFor="diagnosis">Primary Diagnosis</Label>
          <Input id="diagnosis" placeholder="Enter primary diagnosis" />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="allergies">Known Allergies</Label>
          <Input id="allergies" placeholder="List any known allergies" />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="medications">Current Medications</Label>
          <Input id="medications" placeholder="List current medications" />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-medium">Treatment Preferences</Label>
        
        <div className="items-top flex space-x-2">
          <Checkbox id="telehealth" />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="telehealth"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Telehealth appointments preferred
            </Label>
            <p className="text-xs text-muted-foreground">
              Receive remote consultations when possible
            </p>
          </div>
        </div>
        
        <div className="items-top flex space-x-2">
          <Checkbox id="reminders" />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="reminders"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              SMS medication reminders
            </Label>
            <p className="text-xs text-muted-foreground">
              Get text reminders for medications and appointments
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const DifferentStyles: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div className="space-y-1.5">
        <Label htmlFor="normal" className="text-sm font-normal">Normal Label</Label>
        <Input id="normal" placeholder="Normal styling" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="medium" className="text-sm font-medium">Medium Label</Label>
        <Input id="medium" placeholder="Medium weight" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="bold" className="text-sm font-bold">Bold Label</Label>
        <Input id="bold" placeholder="Bold styling" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="muted" className="text-sm text-muted-foreground">Muted Label</Label>
        <Input id="muted" placeholder="Muted color" />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="destructive" className="text-sm text-destructive font-medium">
          Error Label *
        </Label>
        <Input id="destructive" placeholder="Error state" className="border-destructive" />
      </div>
    </div>
  ),
}