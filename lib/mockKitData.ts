
// Hardware Items
export interface HardwareItem {
  id: string;
  name: string;
  type: "laptop" | "smartphone" | "printer" | "server" | "storage" | "monitor" | "peripheral";
  model: string;
  manufacturer: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyEndDate: string;
  assignedTo?: string;
  location?: string;
  status: "active" | "inactive" | "maintenance" | "retired" | "lost";
  notes?: string;
  specifications?: Record<string, string>;
}

// Software Licenses
export interface SoftwareLicense {
  id: string;
  name: string;
  vendor: string;
  version: string;
  licenseType: "perpetual" | "subscription" | "open source" | "freeware" | "user-based" | "device-based";
  licenseKey: string;
  purchaseDate: string;
  licenseExpiryDate: string;
  licensedSeats: number;
  availableSeats: number;
  assignedTo?: string[];
  installationCount?: number;
  status: "active" | "inactive" | "expired" | "renewal pending";
  notes?: string;
  supportContact?: string;
}

// Cloud Services
export interface CloudService {
  id: string;
  name: string;
  provider: string;
  type: "saas" | "paas" | "iaas" | "security" | "storage" | "communication";
  tier: string;
  accountId: string;
  adminContact: string;
  maxUsers: number;
  activeUsers: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  billingCycle: "monthly" | "quarterly" | "annual";
  monthlyCost: number;
  autoRenew: boolean;
  status: "active" | "inactive" | "trial" | "pending cancellation";
  notes?: string;
}

// Mock Data
export const mockHardware: HardwareItem[] = [
  {
    id: "hw-1",
    name: "Dell XPS 15",
    type: "laptop",
    model: "XPS 15 9510",
    manufacturer: "Dell",
    serialNumber: "SN12345678",
    purchaseDate: "2024-02-15",
    warrantyEndDate: "2027-02-15",
    assignedTo: "Sarah Johnson",
    location: "Cape Town Office",
    status: "active",
    specifications: {
      processor: "Intel Core i7-11800H",
      ram: "32GB DDR4",
      storage: "1TB SSD",
      display: "15.6 inch 4K OLED"
    }
  },
  {
    id: "hw-2",
    name: "HP EliteBook",
    type: "laptop",
    model: "EliteBook 840 G8",
    manufacturer: "HP",
    serialNumber: "HP87654321",
    purchaseDate: "2023-11-20",
    warrantyEndDate: "2026-11-20",
    assignedTo: "David Kim",
    location: "Johannesburg Office",
    status: "active",
    specifications: {
      processor: "Intel Core i5-1135G7",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "14 inch FHD"
    }
  },
  {
    id: "hw-3",
    name: "iPhone 14 Pro",
    type: "smartphone",
    model: "iPhone 14 Pro",
    manufacturer: "Apple",
    serialNumber: "IMEI123456789",
    purchaseDate: "2023-09-25",
    warrantyEndDate: "2025-09-25",
    assignedTo: "Emily Rodriguez",
    location: "Cape Town Office",
    status: "active",
    specifications: {
      storage: "256GB",
      color: "Graphite",
      carrier: "Vodacom"
    }
  },
  {
    id: "hw-4",
    name: "Dell PowerEdge Server",
    type: "server",
    model: "PowerEdge R740",
    manufacturer: "Dell",
    serialNumber: "SVRS987654321",
    purchaseDate: "2022-06-10",
    warrantyEndDate: "2027-06-10",
    location: "Cape Town Data Center",
    status: "active",
    specifications: {
      processor: "2x Intel Xeon Gold 6248R",
      ram: "384GB DDR4",
      storage: "8x 1.8TB 10K SAS",
      rackUnits: "2U"
    }
  },
  {
    id: "hw-5",
    name: "HP LaserJet Enterprise",
    type: "printer",
    model: "LaserJet Enterprise M507dn",
    manufacturer: "HP",
    serialNumber: "PRNT456789123",
    purchaseDate: "2023-03-15",
    warrantyEndDate: "2025-03-15",
    location: "Johannesburg Office - 2nd Floor",
    status: "active",
    specifications: {
      type: "Laser Monochrome",
      ppm: "45",
      duplexing: "Automatic",
      networkConnectivity: "Ethernet, USB"
    }
  },
  {
    id: "hw-6",
    name: "Synology NAS",
    type: "storage",
    model: "DS1821+",
    manufacturer: "Synology",
    serialNumber: "SYNAS123987456",
    purchaseDate: "2023-05-20",
    warrantyEndDate: "2025-05-20",
    location: "Cape Town Office - Server Room",
    status: "active",
    specifications: {
      bays: "8",
      capacity: "48TB (8x 6TB WD Red Pro)",
      connectivity: "2x 1GbE, 2x 10GbE",
      raid: "RAID 6"
    }
  },
  {
    id: "hw-7",
    name: "Samsung Galaxy S23",
    type: "smartphone",
    model: "Galaxy S23 Ultra",
    manufacturer: "Samsung",
    serialNumber: "IMEI987654321",
    purchaseDate: "2023-08-12",
    warrantyEndDate: "2025-08-12",
    assignedTo: "Robert Ndlovu",
    location: "Johannesburg Office",
    status: "active",
    specifications: {
      storage: "512GB",
      color: "Black",
      carrier: "MTN"
    }
  },
  {
    id: "hw-8",
    name: "MacBook Pro",
    type: "laptop",
    model: "MacBook Pro 16 2023",
    manufacturer: "Apple",
    serialNumber: "MB123456789",
    purchaseDate: "2024-01-05",
    warrantyEndDate: "2026-01-05",
    assignedTo: "Michael Chen",
    location: "Durban Office",
    status: "active",
    specifications: {
      processor: "Apple M2 Pro",
      ram: "32GB",
      storage: "1TB SSD",
      display: "16 inch Liquid Retina XDR"
    }
  },
  {
    id: "hw-9",
    name: "Lenovo ThinkPad",
    type: "laptop",
    model: "ThinkPad X1 Carbon Gen 10",
    manufacturer: "Lenovo",
    serialNumber: "LNV456123789",
    purchaseDate: "2023-07-15",
    warrantyEndDate: "2023-01-15",
    assignedTo: "Amanda Khumalo",
    location: "Cape Town Office",
    status: "maintenance",
    notes: "Being repaired for keyboard issues",
    specifications: {
      processor: "Intel Core i7-1270P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "14 inch WUXGA"
    }
  },
  {
    id: "hw-10",
    name: "Dell UltraSharp Monitor",
    type: "monitor",
    model: "UltraSharp U2720Q",
    manufacturer: "Dell",
    serialNumber: "MON123456789",
    purchaseDate: "2023-04-10",
    warrantyEndDate: "2025-04-10",
    assignedTo: "Jessica Peters",
    location: "Pretoria Office",
    status: "active",
    specifications: {
      size: "27 inch",
      resolution: "4K (3840 x 2160)",
      connectivity: "HDMI, DisplayPort, USB-C",
      refreshRate: "60Hz"
    }
  }
];

export const mockSoftware: SoftwareLicense[] = [
  {
    id: "sw-1",
    name: "Microsoft 365",
    vendor: "Microsoft",
    version: "E3",
    licenseType: "subscription",
    licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    purchaseDate: "2023-10-15",
    licenseExpiryDate: "2025-10-15",
    licensedSeats: 50,
    availableSeats: 8,
    installationCount: 42,
    status: "active",
    supportContact: "microsoft-support@company.co.za"
  },
  {
    id: "sw-2",
    name: "Adobe Creative Cloud",
    vendor: "Adobe",
    version: "2023",
    licenseType: "subscription",
    licenseKey: "AAAAA-BBBBB-CCCCC-DDDDD-EEEEE",
    purchaseDate: "2023-11-20",
    licenseExpiryDate: "2025-06-01",
    licensedSeats: 10,
    availableSeats: 2,
    installationCount: 8,
    status: "active",
    supportContact: "adobe-support@company.co.za"
  },
  {
    id: "sw-3",
    name: "AutoCAD",
    vendor: "Autodesk",
    version: "2023",
    licenseType: "subscription",
    licenseKey: "AUTODESK-12345-67890-ABCDE",
    purchaseDate: "2023-08-10",
    licenseExpiryDate: "2025-08-10",
    licensedSeats: 5,
    availableSeats: 1,
    installationCount: 4,
    status: "active",
    supportContact: "autodesk-support@company.co.za"
  },
  {
    id: "sw-4",
    name: "ESET Endpoint Security",
    vendor: "ESET",
    version: "9.1",
    licenseType: "subscription",
    licenseKey: "ESET-54321-ABCDE-98765",
    purchaseDate: "2023-09-01",
    licenseExpiryDate: "2025-09-01",
    licensedSeats: 75,
    availableSeats: 15,
    installationCount: 60,
    status: "active",
    supportContact: "security@company.co.za"
  },
  {
    id: "sw-5",
    name: "Windows Server",
    vendor: "Microsoft",
    version: "2022 Standard",
    licenseType: "perpetual",
    licenseKey: "WINSRV-12345-67890-ABCDE",
    purchaseDate: "2023-06-15",
    licenseExpiryDate: "2033-06-15",
    licensedSeats: 10,
    availableSeats: 4,
    installationCount: 6,
    status: "active",
    supportContact: "microsoft-support@company.co.za"
  },
  {
    id: "sw-6",
    name: "SQL Server",
    vendor: "Microsoft",
    version: "2022 Enterprise",
    licenseType: "perpetual",
    licenseKey: "SQLSRV-67890-12345-FGHIJ",
    purchaseDate: "2023-05-20",
    licenseExpiryDate: "2033-05-20",
    licensedSeats: 2,
    availableSeats: 0,
    installationCount: 2,
    status: "active",
    supportContact: "microsoft-support@company.co.za"
  },
  {
    id: "sw-7",
    name: "Zoom Business",
    vendor: "Zoom",
    version: "Business",
    licenseType: "subscription",
    licenseKey: "ZOOM-12345-67890-ABCDE",
    purchaseDate: "2024-01-15",
    licenseExpiryDate: "2025-06-05",
    licensedSeats: 15,
    availableSeats: 3,
    installationCount: 12,
    status: "active",
    supportContact: "zoom-admin@company.co.za"
  },
  {
    id: "sw-8",
    name: "QuickBooks",
    vendor: "Intuit",
    version: "Enterprise 23.0",
    licenseType: "subscription",
    licenseKey: "QB-54321-ABCDE-98765",
    purchaseDate: "2023-07-01",
    licenseExpiryDate: "2025-07-01",
    licensedSeats: 3,
    availableSeats: 0,
    installationCount: 3,
    status: "active",
    supportContact: "finance@company.co.za"
  }
];

export const mockCloudServices: CloudService[] = [
  {
    id: "cloud-1",
    name: "Microsoft Azure",
    provider: "Microsoft",
    type: "iaas",
    tier: "Enterprise",
    accountId: "MS-AZURE-12345",
    adminContact: "cloud-admin@company.co.za",
    maxUsers: 10,
    activeUsers: 8,
    subscriptionStartDate: "2023-05-15",
    subscriptionEndDate: "2025-05-15",
    billingCycle: "monthly",
    monthlyCost: 15000,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-2",
    name: "AWS",
    provider: "Amazon Web Services",
    type: "iaas",
    tier: "Business",
    accountId: "AWS-98765-ABCDE",
    adminContact: "cloud-admin@company.co.za",
    maxUsers: 5,
    activeUsers: 4,
    subscriptionStartDate: "2023-08-01",
    subscriptionEndDate: "2025-08-01",
    billingCycle: "monthly",
    monthlyCost: 22000,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-3",
    name: "Salesforce",
    provider: "Salesforce",
    type: "saas",
    tier: "Enterprise",
    accountId: "SF-12345-67890",
    adminContact: "crm-admin@company.co.za",
    maxUsers: 15,
    activeUsers: 12,
    subscriptionStartDate: "2023-10-01",
    subscriptionEndDate: "2025-10-01",
    billingCycle: "annual",
    monthlyCost: 9000,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-4",
    name: "Dropbox Business",
    provider: "Dropbox",
    type: "storage",
    tier: "Advanced",
    accountId: "DB-54321-ABCDE",
    adminContact: "storage-admin@company.co.za",
    maxUsers: 25,
    activeUsers: 22,
    subscriptionStartDate: "2023-11-15",
    subscriptionEndDate: "2025-11-15",
    billingCycle: "annual",
    monthlyCost: 3500,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-5",
    name: "Google Workspace",
    provider: "Google",
    type: "saas",
    tier: "Business Plus",
    accountId: "GW-12345-ABCDE",
    adminContact: "google-admin@company.co.za",
    maxUsers: 20,
    activeUsers: 18,
    subscriptionStartDate: "2023-09-01",
    subscriptionEndDate: "2025-06-01",
    billingCycle: "monthly",
    monthlyCost: 4500,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-6",
    name: "Slack",
    provider: "Slack",
    type: "communication",
    tier: "Business+",
    accountId: "SLACK-54321-67890",
    adminContact: "comms-admin@company.co.za",
    maxUsers: 40,
    activeUsers: 35,
    subscriptionStartDate: "2023-07-15",
    subscriptionEndDate: "2025-07-15",
    billingCycle: "annual",
    monthlyCost: 2800,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-7",
    name: "Zoom",
    provider: "Zoom",
    type: "communication",
    tier: "Business",
    accountId: "ZOOM-12345-67890",
    adminContact: "comms-admin@company.co.za",
    maxUsers: 15,
    activeUsers: 15,
    subscriptionStartDate: "2024-01-01",
    subscriptionEndDate: "2025-01-01",
    billingCycle: "annual",
    monthlyCost: 3200,
    autoRenew: true,
    status: "active"
  },
  {
    id: "cloud-8",
    name: "ZenDesk",
    provider: "ZenDesk",
    type: "saas",
    tier: "Enterprise",
    accountId: "ZD-12345-ABCDE",
    adminContact: "support-admin@company.co.za",
    maxUsers: 10,
    activeUsers: 8,
    subscriptionStartDate: "2023-06-01",
    subscriptionEndDate: "2025-06-01",
    billingCycle: "annual",
    monthlyCost: 4500,
    autoRenew: true,
    status: "active"
  }
];
