"use client"

import * as React from "react"
import { ChevronDown, X, Plus, Check, PanelRight, Palette, Circle, ArrowUpDown, Settings2 } from "lucide-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DeletableBadge } from "@/components/ui/deletable-badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Contact = {
  id: string
  name: string
  careTeam: string[]
  sharedWith: string[]
  journeys: string[]
  tags: string[]
}

const initialContactsData: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    careTeam: ["Dr. Johnson", "Nurse Wilson"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Cardiac Care", "Recovery Plan"],
    tags: ["High Priority", "Active", "Follow-up"]
  },
  {
    id: "2", 
    name: "Sarah Davis",
    careTeam: ["Dr. Chen", "Therapist Brown"],
    sharedWith: ["Specialist", "Insurance"],
    journeys: ["Physical Therapy", "Pain Management"],
    tags: ["In Progress", "Weekly Check"]
  },
  {
    id: "3",
    name: "Michael Johnson",
    careTeam: ["Dr. Martinez", "Case Manager"],
    sharedWith: ["Family", "Social Worker"],
    journeys: ["Mental Health", "Medication Management"],
    tags: ["Stable", "Monthly Review", "Compliant"]
  },
  {
    id: "4",
    name: "Emily Wilson",
    careTeam: ["Dr. Taylor", "Nutritionist"],
    sharedWith: ["Dietitian", "Family"],
    journeys: ["Diabetes Management", "Lifestyle Changes"],
    tags: ["New Patient", "Education Needed"]
  },
  {
    id: "5",
    name: "Robert Anderson",
    careTeam: ["Dr. White", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Post-Surgery Recovery", "Mobility Training"],
    tags: ["Critical", "Daily Monitoring", "Progress"]
  },
  {
    id: "6",
    name: "Jennifer Lopez",
    careTeam: ["Dr. Garcia", "Nurse Martinez"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Preventive Care", "Wellness Program"],
    tags: ["Routine", "Annual Check", "Healthy"]
  },
  {
    id: "7",
    name: "David Brown",
    careTeam: ["Dr. Kim", "Therapist Jones"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Rehabilitation", "Chronic Pain Management"],
    tags: ["Long-term", "Weekly Sessions", "Improving"]
  },
  {
    id: "8",
    name: "Maria Rodriguez",
    careTeam: ["Dr. Patel", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Maternity Care", "Prenatal Program"],
    tags: ["Expecting", "First Trimester", "Support Needed"]
  },
  {
    id: "9",
    name: "James Wilson",
    careTeam: ["Dr. Thompson", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Weight Management", "Lifestyle Coaching"],
    tags: ["Active Program", "Monthly Goals", "Motivated"]
  },
  {
    id: "10",
    name: "Lisa Zhang",
    careTeam: ["Dr. Adams", "Physical Therapist"],
    sharedWith: ["Specialist", "Insurance"],
    journeys: ["Sports Injury Recovery", "Performance Optimization"],
    tags: ["Athlete", "Recovery Phase", "Urgent"]
  },
  {
    id: "11",
    name: "Kevin O'Connor",
    careTeam: ["Dr. Lee", "Nurse Johnson"],
    sharedWith: ["Family", "Emergency Contact"],
    journeys: ["Senior Care", "Memory Support"],
    tags: ["Elder Care", "Weekly Visits", "Family Support"]
  },
  {
    id: "12",
    name: "Amanda Foster",
    careTeam: ["Dr. Miller", "Therapist Davis"],
    sharedWith: ["Insurance", "Primary Care"],
    journeys: ["Mental Health", "Anxiety Management"],
    tags: ["Therapy", "Bi-weekly", "Progress Tracking"]
  },
  {
    id: "13",
    name: "Thomas Clark",
    careTeam: ["Dr. Singh", "Case Manager"],
    sharedWith: ["Social Worker", "Specialist"],
    journeys: ["Substance Recovery", "Support Program"],
    tags: ["Recovery", "Group Sessions", "6 Month Program"]
  },
  {
    id: "14",
    name: "Rachel Green",
    careTeam: ["Dr. Murphy", "Nutritionist"],
    sharedWith: ["Family", "Dietitian"],
    journeys: ["Diabetes Type 2", "Diet Management"],
    tags: ["Dietary Changes", "Blood Sugar Monitoring", "Education"]
  },
  {
    id: "15",
    name: "Christopher Lee",
    careTeam: ["Dr. Washington", "Physical Therapist"],
    sharedWith: ["Insurance", "Workers Comp"],
    journeys: ["Work Injury", "Return to Work Program"],
    tags: ["Work Related", "Physical Therapy", "Legal Case"]
  },
  {
    id: "16",
    name: "Ashley Martinez",
    careTeam: ["Dr. Rodriguez", "Nurse Taylor"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Preventive Care", "Annual Checkup"],
    tags: ["Routine", "Healthy", "Scheduled"]
  },
  {
    id: "17",
    name: "Daniel Thompson",
    careTeam: ["Dr. Lewis", "Therapist Clark"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Mental Health", "Stress Management"],
    tags: ["Therapy", "Weekly Sessions", "Progress"]
  },
  {
    id: "18",
    name: "Michelle Davis",
    careTeam: ["Dr. Walker", "Nutritionist"],
    sharedWith: ["Dietitian", "Family"],
    journeys: ["Weight Management", "Nutrition Counseling"],
    tags: ["Diet Plan", "Monthly Check", "Motivated"]
  },
  {
    id: "19",
    name: "Ryan Mitchell",
    careTeam: ["Dr. Hall", "Physical Therapist"],
    sharedWith: ["Insurance", "Workers Comp"],
    journeys: ["Sports Injury", "Recovery Program"],
    tags: ["Athlete", "Physical Therapy", "Improving"]
  },
  {
    id: "20",
    name: "Jessica Wilson",
    careTeam: ["Dr. Young", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Chronic Pain", "Support Program"],
    tags: ["Long-term", "Pain Management", "Support Needed"]
  },
  {
    id: "21",
    name: "Matthew Garcia",
    careTeam: ["Dr. Anderson", "Nurse Johnson"],
    sharedWith: ["Primary Care", "Insurance"],
    journeys: ["Diabetes Management", "Medication Monitoring"],
    tags: ["Diabetes", "Daily Monitoring", "Compliant"]
  },
  {
    id: "22",
    name: "Lauren Smith",
    careTeam: ["Dr. Brown", "Therapist Davis"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Anxiety Management", "Therapy Program"],
    tags: ["Mental Health", "Bi-weekly", "Progress Tracking"]
  },
  {
    id: "23",
    name: "Nicholas Johnson",
    careTeam: ["Dr. Miller", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Rehabilitation", "Mobility Training"],
    tags: ["Recovery", "Physical Therapy", "Motivated"]
  },
  {
    id: "24",
    name: "Stephanie Wilson",
    careTeam: ["Dr. Moore", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["Cholesterol Management", "Diet Changes"],
    tags: ["Diet Plan", "Lab Work", "Prevention"]
  },
  {
    id: "25",
    name: "Brandon Taylor",
    careTeam: ["Dr. Thomas", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["Substance Recovery", "Counseling Program"],
    tags: ["Recovery", "Group Sessions", "6 Month Program"]
  },
  {
    id: "26",
    name: "Samantha Lee",
    careTeam: ["Dr. White", "Nurse Martinez"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Prenatal Care", "First Pregnancy"],
    tags: ["Expecting", "Second Trimester", "Healthy"]
  },
  {
    id: "27",
    name: "Joshua Davis",
    careTeam: ["Dr. Jackson", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Back Surgery Recovery", "Pain Management"],
    tags: ["Post-Surgery", "Physical Therapy", "Progress"]
  },
  {
    id: "28",
    name: "Amanda Rodriguez",
    careTeam: ["Dr. Martin", "Therapist Wilson"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Depression Management", "Medication Adjustment"],
    tags: ["Mental Health", "Weekly Check", "Medication"]
  },
  {
    id: "29",
    name: "Kevin Thompson",
    careTeam: ["Dr. Garcia", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Heart Health", "Lifestyle Changes"],
    tags: ["Cardiac Care", "Diet Changes", "Exercise Plan"]
  },
  {
    id: "30",
    name: "Nicole Martinez",
    careTeam: ["Dr. Robinson", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Elder Care", "Memory Assessment"],
    tags: ["Senior Care", "Memory Issues", "Family Support"]
  },
  {
    id: "31",
    name: "Tyler Anderson",
    careTeam: ["Dr. Clark", "Physical Therapist"],
    sharedWith: ["Insurance", "Workers Comp"],
    journeys: ["Work Injury", "Occupational Therapy"],
    tags: ["Work Related", "OT", "Return to Work"]
  },
  {
    id: "32",
    name: "Megan Johnson",
    careTeam: ["Dr. Lewis", "Nurse Brown"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Asthma Management", "Allergy Testing"],
    tags: ["Asthma", "Allergies", "Inhaler Training"]
  },
  {
    id: "33",
    name: "Jacob Wilson",
    careTeam: ["Dr. Walker", "Therapist Martinez"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["ADHD Management", "Behavioral Therapy"],
    tags: ["ADHD", "Medication", "Behavioral Support"]
  },
  {
    id: "34",
    name: "Kayla Davis",
    careTeam: ["Dr. Hall", "Nutritionist"],
    sharedWith: ["Dietitian", "Family"],
    journeys: ["Eating Disorder Recovery", "Nutrition Therapy"],
    tags: ["Recovery", "Nutrition", "Support Group"]
  },
  {
    id: "35",
    name: "Austin Miller",
    careTeam: ["Dr. Young", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Knee Replacement", "Post-Op Care"],
    tags: ["Surgery", "Physical Therapy", "Recovery"]
  },
  {
    id: "36",
    name: "Brittany Garcia",
    careTeam: ["Dr. Anderson", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["Bipolar Management", "Medication Monitoring"],
    tags: ["Mental Health", "Mood Stabilizers", "Monthly Check"]
  },
  {
    id: "37",
    name: "Jordan Smith",
    careTeam: ["Dr. Brown", "Nurse Wilson"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Hypertension Management", "Lifestyle Coaching"],
    tags: ["High Blood Pressure", "Medication", "Diet Changes"]
  },
  {
    id: "38",
    name: "Taylor Thompson",
    careTeam: ["Dr. Moore", "Therapist Johnson"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Trauma Therapy", "EMDR Treatment"],
    tags: ["Trauma", "EMDR", "Weekly Sessions"]
  },
  {
    id: "39",
    name: "Morgan Wilson",
    careTeam: ["Dr. Thomas", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Stroke Recovery", "Speech Therapy"],
    tags: ["Stroke", "Speech Therapy", "Progress"]
  },
  {
    id: "40",
    name: "Cameron Lee",
    careTeam: ["Dr. White", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["IBS Management", "Dietary Modifications"],
    tags: ["IBS", "Diet Plan", "Symptom Tracking"]
  },
  {
    id: "41",
    name: "Alexis Martinez",
    careTeam: ["Dr. Jackson", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["Autism Support", "Behavioral Intervention"],
    tags: ["Autism", "ABA Therapy", "Family Training"]
  },
  {
    id: "42",
    name: "Hunter Davis",
    careTeam: ["Dr. Martin", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Spinal Injury", "Adaptive Equipment"],
    tags: ["Spinal Cord", "Wheelchair Training", "Independence"]
  },
  {
    id: "43",
    name: "Sydney Rodriguez",
    careTeam: ["Dr. Garcia", "Nurse Thompson"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Migraine Management", "Preventive Treatment"],
    tags: ["Migraines", "Prevention", "Trigger Tracking"]
  },
  {
    id: "44",
    name: "Blake Anderson",
    careTeam: ["Dr. Robinson", "Therapist Clark"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["OCD Treatment", "Exposure Therapy"],
    tags: ["OCD", "CBT", "Exposure Therapy"]
  },
  {
    id: "45",
    name: "Paige Johnson",
    careTeam: ["Dr. Lewis", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Fibromyalgia", "Pain Management"],
    tags: ["Fibromyalgia", "Chronic Pain", "Activity Pacing"]
  },
  {
    id: "46",
    name: "Logan Wilson",
    careTeam: ["Dr. Walker", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Kidney Disease", "Renal Diet"],
    tags: ["CKD", "Renal Diet", "Lab Monitoring"]
  },
  {
    id: "47",
    name: "Hailey Miller",
    careTeam: ["Dr. Hall", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Down Syndrome", "Life Skills Training"],
    tags: ["Down Syndrome", "Life Skills", "Community Integration"]
  },
  {
    id: "48",
    name: "Carson Garcia",
    careTeam: ["Dr. Young", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Cerebral Palsy", "Mobility Support"],
    tags: ["CP", "Mobility", "Equipment Training"]
  },
  {
    id: "49",
    name: "Destiny Smith",
    careTeam: ["Dr. Anderson", "Nurse Martinez"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Teenage Pregnancy", "Prenatal Support"],
    tags: ["Teen Pregnancy", "Prenatal", "Support Services"]
  },
  {
    id: "50",
    name: "Colton Thompson",
    careTeam: ["Dr. Brown", "Therapist Davis"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Schizophrenia", "Medication Management"],
    tags: ["Schizophrenia", "Antipsychotics", "Case Management"]
  },
  {
    id: "51",
    name: "Savannah Wilson",
    careTeam: ["Dr. Moore", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Muscular Dystrophy", "Adaptive Care"],
    tags: ["MD", "Progressive", "Equipment Needs"]
  },
  {
    id: "52",
    name: "Garrett Lee",
    careTeam: ["Dr. Thomas", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["Crohn's Disease", "Inflammatory Management"],
    tags: ["IBD", "Flare Management", "Nutrition Support"]
  },
  {
    id: "53",
    name: "Jasmine Martinez",
    careTeam: ["Dr. White", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["PTSD Treatment", "Trauma Recovery"],
    tags: ["PTSD", "Trauma Therapy", "Support Group"]
  },
  {
    id: "54",
    name: "Cody Davis",
    careTeam: ["Dr. Jackson", "Physical Therapist"],
    sharedWith: ["Insurance", "Workers Comp"],
    journeys: ["Burn Recovery", "Scar Management"],
    tags: ["Burns", "Scar Treatment", "Physical Therapy"]
  },
  {
    id: "55",
    name: "Mackenzie Rodriguez",
    careTeam: ["Dr. Martin", "Nurse Johnson"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Type 1 Diabetes", "Insulin Management"],
    tags: ["T1D", "Insulin Pump", "CGM"]
  },
  {
    id: "56",
    name: "Ethan Anderson",
    careTeam: ["Dr. Garcia", "Therapist Wilson"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Tourette Syndrome", "Tic Management"],
    tags: ["Tourettes", "Tic Control", "Behavioral Support"]
  },
  {
    id: "57",
    name: "Chloe Johnson",
    careTeam: ["Dr. Robinson", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Scoliosis Treatment", "Brace Compliance"],
    tags: ["Scoliosis", "Bracing", "Posture Training"]
  },
  {
    id: "58",
    name: "Mason Wilson",
    careTeam: ["Dr. Clark", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Celiac Disease", "Gluten-Free Diet"],
    tags: ["Celiac", "GF Diet", "Nutrition Education"]
  },
  {
    id: "59",
    name: "Zoe Miller",
    careTeam: ["Dr. Lewis", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Fetal Alcohol Syndrome", "Developmental Support"],
    tags: ["FAS", "Development", "Special Education"]
  },
  {
    id: "60",
    name: "Caleb Garcia",
    careTeam: ["Dr. Walker", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Hemophilia", "Bleeding Disorder Management"],
    tags: ["Hemophilia", "Factor Replacement", "Emergency Plan"]
  },
  {
    id: "61",
    name: "Isabella Smith",
    careTeam: ["Dr. Hall", "Nurse Thompson"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Epilepsy Management", "Seizure Control"],
    tags: ["Epilepsy", "Anticonvulsants", "Seizure Diary"]
  },
  {
    id: "62",
    name: "Lucas Thompson",
    careTeam: ["Dr. Young", "Therapist Martinez"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Selective Mutism", "Communication Therapy"],
    tags: ["Selective Mutism", "Speech Therapy", "Anxiety"]
  },
  {
    id: "63",
    name: "Aria Wilson",
    careTeam: ["Dr. Anderson", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Juvenile Arthritis", "Joint Protection"],
    tags: ["JRA", "Anti-inflammatories", "Activity Modification"]
  },
  {
    id: "64",
    name: "Owen Lee",
    careTeam: ["Dr. Brown", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["Phenylketonuria", "PKU Diet Management"],
    tags: ["PKU", "Low Protein Diet", "Phe Levels"]
  },
  {
    id: "65",
    name: "Maya Martinez",
    careTeam: ["Dr. Moore", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["Intellectual Disability", "Life Skills Program"],
    tags: ["ID", "Life Skills", "Vocational Training"]
  },
  {
    id: "66",
    name: "Liam Davis",
    careTeam: ["Dr. Thomas", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Duchenne MD", "Respiratory Care"],
    tags: ["DMD", "Ventilator", "Wheelchair"]
  },
  {
    id: "67",
    name: "Sophia Rodriguez",
    careTeam: ["Dr. White", "Nurse Clark"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Cystic Fibrosis", "Airway Clearance"],
    tags: ["CF", "Chest PT", "Enzymes"]
  },
  {
    id: "68",
    name: "Noah Anderson",
    careTeam: ["Dr. Jackson", "Therapist Johnson"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Reactive Attachment Disorder", "Attachment Therapy"],
    tags: ["RAD", "Attachment", "Trauma-Informed"]
  },
  {
    id: "69",
    name: "Emma Johnson",
    careTeam: ["Dr. Martin", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Spina Bifida", "Mobility Training"],
    tags: ["Spina Bifida", "Catheter Care", "Mobility"]
  },
  {
    id: "70",
    name: "William Wilson",
    careTeam: ["Dr. Garcia", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Prader-Willi Syndrome", "Weight Management"],
    tags: ["PWS", "Calorie Restriction", "Behavior Plan"]
  },
  {
    id: "71",
    name: "Olivia Miller",
    careTeam: ["Dr. Robinson", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Rett Syndrome", "Communication Support"],
    tags: ["Rett", "AAC", "Regression Management"]
  },
  {
    id: "72",
    name: "James Garcia",
    careTeam: ["Dr. Clark", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Leukemia Treatment", "Chemotherapy Support"],
    tags: ["ALL", "Chemo", "Immune Suppression"]
  },
  {
    id: "73",
    name: "Ava Smith",
    careTeam: ["Dr. Lewis", "Nurse Davis"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Congenital Heart Disease", "Cardiac Monitoring"],
    tags: ["CHD", "Cardiology", "Activity Restrictions"]
  },
  {
    id: "74",
    name: "Benjamin Thompson",
    careTeam: ["Dr. Walker", "Therapist Wilson"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Oppositional Defiant Disorder", "Behavior Modification"],
    tags: ["ODD", "Behavior Plan", "Parent Training"]
  },
  {
    id: "75",
    name: "Charlotte Wilson",
    careTeam: ["Dr. Hall", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Osteogenesis Imperfecta", "Fracture Prevention"],
    tags: ["OI", "Bisphosphonates", "Safety Plan"]
  },
  {
    id: "76",
    name: "Henry Lee",
    careTeam: ["Dr. Young", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["Short Bowel Syndrome", "TPN Management"],
    tags: ["SBS", "TPN", "Gut Rehabilitation"]
  },
  {
    id: "77",
    name: "Amelia Martinez",
    careTeam: ["Dr. Anderson", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["Fragile X Syndrome", "Developmental Support"],
    tags: ["Fragile X", "Sensory Issues", "Special Education"]
  },
  {
    id: "78",
    name: "Alexander Davis",
    careTeam: ["Dr. Brown", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Brain Tumor", "Post-Surgery Rehab"],
    tags: ["Brain Tumor", "Radiation", "Cognitive Rehab"]
  },
  {
    id: "79",
    name: "Mia Rodriguez",
    careTeam: ["Dr. Moore", "Nurse Martinez"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Sickle Cell Disease", "Pain Crisis Management"],
    tags: ["SCD", "Pain Management", "Hydroxyurea"]
  },
  {
    id: "80",
    name: "Elijah Anderson",
    careTeam: ["Dr. Thomas", "Therapist Thompson"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Conduct Disorder", "Intensive Therapy"],
    tags: ["CD", "DBT", "Residential Treatment"]
  },
  {
    id: "81",
    name: "Harper Johnson",
    careTeam: ["Dr. White", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Hydrocephalus", "Shunt Management"],
    tags: ["Hydrocephalus", "VP Shunt", "Neuro Monitoring"]
  },
  {
    id: "82",
    name: "Sebastian Wilson",
    careTeam: ["Dr. Jackson", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Mitochondrial Disease", "Energy Conservation"],
    tags: ["Mito", "CoQ10", "Activity Pacing"]
  },
  {
    id: "83",
    name: "Evelyn Miller",
    careTeam: ["Dr. Martin", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Williams Syndrome", "Cardiac Care"],
    tags: ["Williams", "Supravalvar AS", "Hypercalcemia"]
  },
  {
    id: "84",
    name: "Carter Garcia",
    careTeam: ["Dr. Garcia", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Nemaline Myopathy", "Respiratory Support"],
    tags: ["Nemaline", "BiPAP", "Weakness"]
  },
  {
    id: "85",
    name: "Abigail Smith",
    careTeam: ["Dr. Robinson", "Nurse Johnson"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Neurofibromatosis", "Tumor Monitoring"],
    tags: ["NF1", "MRI Surveillance", "Learning Disabilities"]
  },
  {
    id: "86",
    name: "Jackson Thompson",
    careTeam: ["Dr. Clark", "Therapist Clark"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Disruptive Mood Dysregulation", "Mood Stabilization"],
    tags: ["DMDD", "Mood Stabilizers", "DBT Skills"]
  },
  {
    id: "87",
    name: "Emily Wilson",
    careTeam: ["Dr. Lewis", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Charcot-Marie-Tooth", "Mobility Aids"],
    tags: ["CMT", "AFOs", "Weakness"]
  },
  {
    id: "88",
    name: "Aiden Lee",
    careTeam: ["Dr. Walker", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["Galactosemia", "Galactose-Free Diet"],
    tags: ["Galactosemia", "Soy Formula", "Cataracts"]
  },
  {
    id: "89",
    name: "Elizabeth Martinez",
    careTeam: ["Dr. Hall", "Case Manager"],
    sharedWith: ["Social Worker", "Insurance"],
    journeys: ["22q11.2 Deletion", "Multi-System Care"],
    tags: ["22q11", "Heart Defect", "Immune Deficiency"]
  },
  {
    id: "90",
    name: "Matthew Davis",
    careTeam: ["Dr. Young", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Arthrogryposis", "Joint Mobility"],
    tags: ["AMC", "Serial Casting", "ROM"]
  },
  {
    id: "91",
    name: "Sofia Rodriguez",
    careTeam: ["Dr. Anderson", "Nurse Wilson"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Treacher Collins", "Airway Management"],
    tags: ["TC", "Tracheostomy", "Hearing Loss"]
  },
  {
    id: "92",
    name: "Samuel Anderson",
    careTeam: ["Dr. Brown", "Therapist Martinez"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Childhood Disintegrative Disorder", "Regression Support"],
    tags: ["CDD", "Skill Loss", "Intensive Support"]
  },
  {
    id: "93",
    name: "Camila Johnson",
    careTeam: ["Dr. Moore", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Pompe Disease", "Enzyme Replacement"],
    tags: ["Pompe", "ERT", "Respiratory Care"]
  },
  {
    id: "94",
    name: "David Wilson",
    careTeam: ["Dr. Thomas", "Nutritionist"],
    sharedWith: ["Dietitian", "Insurance"],
    journeys: ["Maple Syrup Urine Disease", "Protein Restriction"],
    tags: ["MSUD", "BCAA Restriction", "Metabolic Crisis"]
  },
  {
    id: "95",
    name: "Victoria Miller",
    careTeam: ["Dr. White", "Case Manager"],
    sharedWith: ["Social Worker", "Family"],
    journeys: ["Angelman Syndrome", "Communication Support"],
    tags: ["Angelman", "Happy Puppet", "Seizures"]
  },
  {
    id: "96",
    name: "Joseph Garcia",
    careTeam: ["Dr. Jackson", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Friedreich Ataxia", "Progressive Care"],
    tags: ["FA", "Ataxia", "Cardiomyopathy"]
  },
  {
    id: "97",
    name: "Grace Smith",
    careTeam: ["Dr. Martin", "Nurse Thompson"],
    sharedWith: ["Primary Care", "Family"],
    journeys: ["Turner Syndrome", "Growth Hormone"],
    tags: ["Turner", "Growth Hormone", "Cardiac Monitoring"]
  },
  {
    id: "98",
    name: "Anthony Thompson",
    careTeam: ["Dr. Garcia", "Therapist Davis"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Childhood Schizophrenia", "Early Intervention"],
    tags: ["Early Onset", "Antipsychotics", "Special Education"]
  },
  {
    id: "99",
    name: "Natalie Wilson",
    careTeam: ["Dr. Robinson", "Physical Therapist"],
    sharedWith: ["Insurance", "Family"],
    journeys: ["Congenital Myasthenia", "Fatigue Management"],
    tags: ["CMS", "Pyridostigmine", "Activity Modification"]
  },
  {
    id: "100",
    name: "Christopher Lee",
    careTeam: ["Dr. Clark", "Nutritionist"],
    sharedWith: ["Dietitian", "Primary Care"],
    journeys: ["Glycogen Storage Disease", "Dietary Management"],
    tags: ["GSD", "Cornstarch", "Hypoglycemia Prevention"]
  }
]

const availableTagOptions = {
  careTeam: ["Dr. Johnson", "Dr. Chen", "Dr. Martinez", "Dr. Taylor", "Dr. White", "Nurse Wilson", "Therapist Brown", "Case Manager", "Nutritionist", "Physical Therapist"],
  sharedWith: ["Family", "Primary Care", "Specialist", "Insurance", "Dietitian", "Social Worker"],
  journeys: ["Cardiac Care", "Recovery Plan", "Physical Therapy", "Pain Management", "Mental Health", "Medication Management", "Diabetes Management", "Lifestyle Changes", "Post-Surgery Recovery", "Mobility Training"],
  tags: ["High Priority", "Active", "Follow-up", "In Progress", "Weekly Check", "Stable", "Monthly Review", "Compliant", "New Patient", "Education Needed", "Critical", "Daily Monitoring", "Progress", "Urgent", "Scheduled", "Pending"]
}

type ColumnKey = "name" | "careTeam" | "sharedWith" | "journeys" | "tags"

const staticColumns = [
  { key: "name" as ColumnKey, label: "Name" },
  { key: "careTeam" as ColumnKey, label: "Care Team" },
  { key: "sharedWith" as ColumnKey, label: "Shared With" },
  { key: "journeys" as ColumnKey, label: "Journeys" },
  { key: "tags" as ColumnKey, label: "Tags" }
]

interface TagListProps {
  items: string[]
  variant?: "default" | "secondary" | "destructive" | "outline" | "chart-primary" | "chart-secondary" | "chart-tertiary" | "chart-accent"
  onRemoveTag?: (tag: string) => void
  onAddTag?: (tag: string) => void
  availableOptions?: string[]
  columnKey?: string
  allowColorSelection?: boolean
  globalTagColors?: Record<string, TagColor>
  onSetGlobalTagColor?: (tag: string, color: TagColor) => void
}

type TagColor = {
  name: string
  variant: "default" | "secondary" | "destructive" | "outline"
  bgColor: string
  textColor: string
}

const availableTagColors: TagColor[] = [
  { name: "Default", variant: "default", bgColor: "bg-slate-900", textColor: "text-white" },
  { name: "Secondary", variant: "secondary", bgColor: "bg-slate-100", textColor: "text-slate-900" },
  { name: "Success", variant: "outline", bgColor: "bg-green-500", textColor: "text-white" },
  { name: "Warning", variant: "outline", bgColor: "bg-yellow-500", textColor: "text-black" },
  { name: "Info", variant: "outline", bgColor: "bg-blue-500", textColor: "text-white" },
  { name: "Destructive", variant: "destructive", bgColor: "bg-red-500", textColor: "text-white" },
]

const getColorValue = (tailwindClass: string): string => {
  const colorMap: Record<string, string> = {
    'bg-slate-900': '#0f172a',
    'bg-slate-100': '#f1f5f9',
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308',
    'bg-blue-500': '#3b82f6',
    'bg-red-500': '#ef4444',
  }
  return colorMap[tailwindClass] || '#6b7280'
}

const getTagStyles = (variant: TagListProps['variant']) => {
  switch (variant) {
    case "chart-primary":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    case "chart-secondary": 
      return "bg-[#1564BF] text-white border-[#1564BF] hover:bg-[#1564BF]/90"
    case "chart-tertiary":
      return "bg-[#405F90] text-white border-[#405F90] hover:bg-[#405F90]/90"
    case "chart-accent":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    default:
      return ""
  }
}

function TagList({ 
  items, 
  variant = "secondary", 
  onRemoveTag, 
  onAddTag, 
  availableOptions = [],
  columnKey,
  allowColorSelection = false,
  globalTagColors = {},
  onSetGlobalTagColor
}: TagListProps) {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)
  const [isColorDialogOpen, setIsColorDialogOpen] = React.useState(false)
  const [selectedTagForColor, setSelectedTagForColor] = React.useState<string>("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // No longer need to filter since we show all options with checks
  
  const handleToggleTag = (tag: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (items.includes(tag)) {
      onRemoveTag?.(tag)
    } else {
      onAddTag?.(tag)
      // Scroll to the right to show the newly added tag and keep the plus visible
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth
        }
      }, 0)
    }
  }

  const handleColorClick = (tag: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedTagForColor(tag)
    setIsColorDialogOpen(true)
    setIsSelectOpen(false)
  }

  const handleColorSelection = (color: TagColor) => {
    if (selectedTagForColor && onSetGlobalTagColor) {
      onSetGlobalTagColor(selectedTagForColor, color)
    }
    setIsColorDialogOpen(false)
    setSelectedTagForColor("")
  }

  return (
    <div className="flex gap-1 items-center">
      {onAddTag && (
        <DropdownMenu open={isSelectOpen} onOpenChange={setIsSelectOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-5 w-5 p-0 flex-shrink-0 border-none bg-transparent hover:bg-muted/50 flex items-center justify-center shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Plus className="h-2.5 w-2.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="p-0 w-48">
            <Command className="rounded-md border-none shadow-none">
              <CommandGroup className="p-1">
                {availableOptions.map((option) => {
                  const tagColor = globalTagColors[option]
                  return (
                    <CommandItem
                      key={option}
                      onSelect={(event) => event.preventDefault()}
                      className="flex items-center justify-between rounded-xs py-1.5 px-2"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="cursor-pointer"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            if (allowColorSelection) {
                              handleColorClick(option, event)
                            }
                          }}
                        >
                          <Circle 
                            className="h-4 w-4"
                            style={tagColor ? { 
                              backgroundColor: getColorValue(tagColor.bgColor),
                              color: getColorValue(tagColor.bgColor),
                              border: `1px solid ${getColorValue(tagColor.bgColor)}`,
                              borderRadius: '50%',
                              fill: getColorValue(tagColor.bgColor),
                              stroke: 'none'
                            } : {
                              backgroundColor: 'transparent',
                              border: 'none',
                              borderRadius: '50%',
                              color: '#e5e7eb',
                              fill: '#e5e7eb',
                              stroke: 'none'
                            }}
                          />
                        </div>
                        <span 
                          className="text-popover-foreground text-sm cursor-pointer"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleToggleTag(option, event)
                          }}
                        >
                          {option}
                        </span>
                      </div>
                      <div className="h-4 w-4 flex items-center justify-center">
                        {items.includes(option) && (
                          <Check className="h-4 w-4 text-popover-foreground" />
                        )}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <div ref={containerRef} className="flex gap-1 overflow-x-auto max-w-[250px] w-fit items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {items.map((item, index) => {
          const itemColor = globalTagColors[item]
          const badgeVariant = itemColor ? itemColor.variant : 'secondary'
          const customColorClass = itemColor ? `${itemColor.bgColor} ${itemColor.textColor} border-transparent` : 'bg-gray-200 text-gray-700 border-transparent'
          return (
            <DeletableBadge
              key={index}
              variant={badgeVariant}
              className={`whitespace-nowrap flex-shrink-0 h-5 ${customColorClass}`}
              onDelete={onRemoveTag ? () => onRemoveTag(item) : undefined}
            >
              {item}
            </DeletableBadge>
          )
        })}
      </div>

      {/* Color Selection Dialog */}
      <Dialog open={isColorDialogOpen} onOpenChange={setIsColorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Color for "{selectedTagForColor}"</DialogTitle>
            <DialogDescription>
              Select a color for this tag
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {availableTagColors.map((color) => (
              <Button
                key={color.name}
                variant="ghost"
                className="h-auto p-3 flex items-center gap-2 justify-start hover:bg-muted"
                onClick={() => handleColorSelection(color)}
              >
                <div className={`w-4 h-4 rounded ${color.bgColor} flex-shrink-0`} />
                <span>{color.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function ContactsTable() {
  const [contactsData, setContactsData] = React.useState<Contact[]>(initialContactsData)
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [visibleColumns, setVisibleColumns] = React.useState<Record<ColumnKey, boolean>>({
    name: true,
    careTeam: true,
    sharedWith: true,
    journeys: true,
    tags: true
  })
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [globalTagColors, setGlobalTagColors] = React.useState<Record<string, TagColor>>({})

  // Define table columns
  const columns = React.useMemo<ColumnDef<Contact>[]>(() => [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div 
            className="flex items-center cursor-pointer select-none font-medium hover:text-accent-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
    },
    {
      accessorKey: "careTeam",
      header: "Care Team",
    },
    {
      accessorKey: "sharedWith", 
      header: "Shared With",
    },
    {
      accessorKey: "journeys",
      header: "Journeys",
    },
    {
      accessorKey: "tags",
      header: "Tags",
    },
  ], [])

  const table = useReactTable({
    data: contactsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleNameFilter = (value: string) => {
    setColumnFilters(prev => {
      const otherFilters = prev.filter(filter => filter.id !== 'name')
      if (value) {
        return [...otherFilters, { id: 'name', value }]
      }
      return otherFilters
    })
  }

  const toggleColumn = (columnKey: ColumnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }))
  }

  const handleRemoveTag = (contactId: string, columnKey: ColumnKey, tag: string) => {
    setContactsData(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { 
              ...contact, 
              [columnKey]: contact[columnKey].filter((item: string) => item !== tag) 
            }
          : contact
      )
    )
  }

  const handleAddTag = (contactId: string, columnKey: ColumnKey, tag: string) => {
    setContactsData(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { 
              ...contact, 
              [columnKey]: [...contact[columnKey], tag] 
            }
          : contact
      )
    )
  }

  const handleSetGlobalTagColor = (tag: string, color: TagColor) => {
    setGlobalTagColors(prev => ({
      ...prev,
      [tag]: color
    }))
  }

  const handlePanelClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsSheetOpen(true)
  }

  const visibleColumnsList = staticColumns.filter(column => visibleColumns[column.key])

  const scrollableColumns = staticColumns.filter(column => column.key !== 'name')
  const visibleScrollableColumns = scrollableColumns.filter(column => visibleColumns[column.key])

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Find someone"
          value={columnFilters.find(filter => filter.id === 'name')?.value as string || ""}
          onChange={(event) =>
            handleNameFilter(event.target.value)
          }
          size="small"
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {staticColumns.map((column) => (
              <DropdownMenuItem
                key={column.key}
                onSelect={(e) => e.preventDefault()}
                onClick={() => toggleColumn(column.key)}
                className="px-2 py-1.5 flex items-center justify-between"
              >
                <span className="text-popover-foreground text-sm">{column.label}</span>
                <div className="h-4 w-4 flex items-center justify-center">
                  {visibleColumns[column.key] && (
                    <Check className="h-4 w-4 text-popover-foreground" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="border rounded-lg overflow-hidden flex">
        {/* Fixed first column */}
        {visibleColumns.name && (
          <div className="flex-shrink-0 border-r bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium whitespace-nowrap w-48">
                    <div 
                      className="flex items-center cursor-pointer select-none hover:text-accent-foreground"
                      onClick={() => table.getColumn('name')?.toggleSorting(table.getColumn('name')?.getIsSorted() === 'asc')}
                    >
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  const contact = row.original
                  return (
                    <TableRow 
                      key={contact.id}
                      className={hoveredRowId === contact.id ? "bg-muted/50" : ""}
                      onMouseEnter={(e) => {
                        if (!e.relatedTarget?.closest('[role="menu"]')) {
                          setHoveredRowId(contact.id)
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.relatedTarget?.closest('[role="menu"]')) {
                          setHoveredRowId(null)
                        }
                      }}
                    >
                      <TableCell className="font-medium py-1 relative whitespace-nowrap w-48">
                        {contact.name}
                        {hoveredRowId === contact.id && (
                          <button
                            onClick={() => handlePanelClick(contact)}
                            className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-sm rounded p-0.5 hover:bg-gray-50 transition-colors"
                            style={{ left: '8px' }}
                          >
                            <PanelRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Scrollable columns */}
        {visibleScrollableColumns.length > 0 && (
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {visibleScrollableColumns.map((column) => (
                    <TableHead key={column.key} className="font-medium whitespace-nowrap">
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  const contact = row.original
                  return (
                    <TableRow 
                      key={contact.id}
                      className={hoveredRowId === contact.id ? "bg-muted/50" : ""}
                      onMouseEnter={(e) => {
                        if (!e.relatedTarget?.closest('[role="menu"]')) {
                          setHoveredRowId(contact.id)
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.relatedTarget?.closest('[role="menu"]')) {
                          setHoveredRowId(null)
                        }
                      }}
                    >
                      {visibleColumns.careTeam && (
                        <TableCell className="py-1 shadow-none whitespace-nowrap">
                          <TagList 
                            items={contact.careTeam} 
                            variant="chart-primary"
                            onRemoveTag={(tag) => handleRemoveTag(contact.id, "careTeam", tag)}
                            onAddTag={(tag) => handleAddTag(contact.id, "careTeam", tag)}
                            availableOptions={availableTagOptions.careTeam}
                            columnKey="care team member"
                            allowColorSelection={true}
                            globalTagColors={globalTagColors}
                            onSetGlobalTagColor={handleSetGlobalTagColor}
                          />
                        </TableCell>
                      )}
                      {visibleColumns.sharedWith && (
                        <TableCell className="py-1 shadow-none whitespace-nowrap">
                          <TagList 
                            items={contact.sharedWith} 
                            variant="chart-secondary"
                            onRemoveTag={(tag) => handleRemoveTag(contact.id, "sharedWith", tag)}
                            onAddTag={(tag) => handleAddTag(contact.id, "sharedWith", tag)}
                            availableOptions={availableTagOptions.sharedWith}
                            columnKey="share option"
                            allowColorSelection={true}
                            globalTagColors={globalTagColors}
                            onSetGlobalTagColor={handleSetGlobalTagColor}
                          />
                        </TableCell>
                      )}
                      {visibleColumns.journeys && (
                        <TableCell className="py-1 shadow-none whitespace-nowrap">
                          <TagList 
                            items={contact.journeys} 
                            variant="chart-tertiary"
                            onRemoveTag={(tag) => handleRemoveTag(contact.id, "journeys", tag)}
                            onAddTag={(tag) => handleAddTag(contact.id, "journeys", tag)}
                            availableOptions={availableTagOptions.journeys}
                            columnKey="journey"
                            allowColorSelection={true}
                            globalTagColors={globalTagColors}
                            onSetGlobalTagColor={handleSetGlobalTagColor}
                          />
                        </TableCell>
                      )}
                      {visibleColumns.tags && (
                        <TableCell className="py-1 shadow-none whitespace-nowrap">
                          <TagList 
                            items={contact.tags} 
                            variant="chart-accent"
                            onRemoveTag={(tag) => handleRemoveTag(contact.id, "tags", tag)}
                            onAddTag={(tag) => handleAddTag(contact.id, "tags", tag)}
                            availableOptions={availableTagOptions.tags}
                            columnKey="tag"
                            allowColorSelection={true}
                            globalTagColors={globalTagColors}
                            onSetGlobalTagColor={handleSetGlobalTagColor}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length} contacts)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Contact Details</SheetTitle>
            <SheetDescription>
              View and edit contact information for {selectedContact?.name}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}