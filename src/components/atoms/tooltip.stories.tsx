import type { Meta, StoryObj } from '@storybook/react'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Badge } from '../ui/badge'
import { 
  Info, 
  HelpCircle,
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Get help with this feature</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Warning: This action cannot be undone</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Task completed successfully</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const PatientInformation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 cursor-help">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">Patient ID: PT-12345</div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">John Doe</p>
              <p className="text-sm">Age: 42 • Male</p>
              <p className="text-sm">Last visit: Dec 15, 2024</p>
              <p className="text-sm">Primary condition: Hypertension</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}

export const MedicalStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span>Patient Status:</span>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="cursor-help">
              Active Treatment
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Active Treatment</p>
              <p className="text-sm">Patient is currently receiving care</p>
              <p className="text-sm">Next appointment: Jan 8, 2025</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="cursor-help">
              High Priority
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">High Priority Patient</p>
              <p className="text-sm">Requires frequent monitoring</p>
              <p className="text-sm">Recent complications noted</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="default" className="cursor-help bg-green-100 text-green-800">
              Stable
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Condition Stable</p>
              <p className="text-sm">Vital signs within normal range</p>
              <p className="text-sm">Treatment plan on track</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}

export const ContactInformation: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <h3 className="font-medium">Contact Details</h3>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Primary phone: (555) 123-4567</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm">(555) 123-4567</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email: john.doe@email.com</p>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm">john.doe@email.com</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <User className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Emergency Contact</p>
                <p className="text-sm">Jane Doe (spouse)</p>
                <p className="text-sm">(555) 987-6543</p>
              </div>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm">Emergency: Jane Doe</span>
        </div>
      </div>
    </div>
  ),
}

export const AppointmentSchedule: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="font-medium">Upcoming Appointments</h3>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-3 p-2 border rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 cursor-help">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Jan 8, 2025 - 2:00 PM</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Follow-up Appointment</p>
                <p className="text-sm">Dr. Johnson - Cardiology</p>
                <p className="text-sm">Duration: 30 minutes</p>
                <p className="text-sm">Room: 204B</p>
              </div>
            </TooltipContent>
          </Tooltip>
          <Badge variant="outline">Cardiology</Badge>
        </div>
        
        <div className="flex items-center space-x-3 p-2 border rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 cursor-help">
                <Calendar className="h-4 w-4 text-green-500" />
                <span className="text-sm">Jan 15, 2025 - 10:30 AM</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">Lab Work</p>
                <p className="text-sm">Blood work and analysis</p>
                <p className="text-sm">Fasting required (12 hours)</p>
                <p className="text-sm">Lab: Ground Floor</p>
              </div>
            </TooltipContent>
          </Tooltip>
          <Badge variant="outline">Laboratory</Badge>
        </div>
      </div>
    </div>
  ),
}

export const MedicationTooltips: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="font-medium">Current Medications</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <div className="font-medium">Lisinopril 10mg</div>
                <div className="text-sm text-muted-foreground">Once daily</div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Lisinopril 10mg</p>
                <p className="text-sm">ACE inhibitor for blood pressure</p>
                <p className="text-sm">Take in the morning with water</p>
                <p className="text-sm">Started: Nov 15, 2024</p>
              </div>
            </TooltipContent>
          </Tooltip>
          <Badge variant="secondary">Active</Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <div className="font-medium">Metformin 500mg</div>
                <div className="text-sm text-muted-foreground">Twice daily</div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Metformin 500mg</p>
                <p className="text-sm">Diabetes medication</p>
                <p className="text-sm">Take with meals to reduce stomach upset</p>
                <p className="text-sm">Monitor blood sugar levels</p>
              </div>
            </TooltipContent>
          </Tooltip>
          <Badge variant="secondary">Active</Badge>
        </div>
      </div>
    </div>
  ),
}

export const DataVisualization: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="font-medium">Health Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-4 border rounded-lg cursor-help">
              <div className="text-2xl font-bold text-red-600">140/90</div>
              <div className="text-sm text-muted-foreground">Blood Pressure</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Blood Pressure: 140/90 mmHg</p>
              <p className="text-sm text-yellow-600">⚠️ Slightly elevated</p>
              <p className="text-sm">Last reading: 2 hours ago</p>
              <p className="text-sm">Target: &lt;130/80 mmHg</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-4 border rounded-lg cursor-help">
              <div className="text-2xl font-bold text-green-600">7.2%</div>
              <div className="text-sm text-muted-foreground">HbA1c</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">HbA1c: 7.2%</p>
              <p className="text-sm text-green-600">✓ Good control</p>
              <p className="text-sm">Test date: Dec 10, 2024</p>
              <p className="text-sm">Target: &lt;7.0%</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-4 border rounded-lg cursor-help">
              <div className="text-2xl font-bold text-blue-600">72</div>
              <div className="text-sm text-muted-foreground">Heart Rate</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Resting Heart Rate: 72 bpm</p>
              <p className="text-sm text-green-600">✓ Normal range</p>
              <p className="text-sm">Last reading: 1 hour ago</p>
              <p className="text-sm">Normal: 60-100 bpm</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-4 border rounded-lg cursor-help">
              <div className="text-2xl font-bold text-purple-600">185</div>
              <div className="text-sm text-muted-foreground">Weight (lbs)</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Weight: 185 lbs</p>
              <p className="text-sm">BMI: 26.8 (overweight)</p>
              <p className="text-sm">Goal: 175 lbs</p>
              <p className="text-sm">Progress: -3 lbs this month</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}