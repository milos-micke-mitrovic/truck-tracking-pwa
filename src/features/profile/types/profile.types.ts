export interface DriverProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiry: string;
  status: string;
  hireDate: string;
  companyId: string;
  companyName: string;
}

export interface VehicleDetail {
  id: string;
  unitNumber: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  color: string;
  fuelType: string;
  status: string;
  currentMileage: number;
  lastServiceDate: string;
}

export interface TrailerDetail {
  id: string;
  unitNumber: string;
  type: string;
  make: string;
  year: number;
  licensePlate: string;
  length: number;
  maxWeight: number;
  status: string;
}
