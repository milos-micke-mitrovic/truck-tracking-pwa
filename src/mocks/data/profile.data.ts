import type {
  DriverProfile,
  VehicleDetail,
  TrailerDetail,
} from '@/features/profile/types/profile.types';

export const mockDriverProfile: DriverProfile = {
  id: 'drv-1001',
  firstName: 'John',
  lastName: 'Driver',
  email: 'driver@example.com',
  phoneNumber: '+1-555-0123',
  licenseNumber: 'CDL-A-123456',
  licenseClass: 'CDL Class A',
  licenseExpiry: '2027-03-15',
  status: 'ACTIVE',
  hireDate: '2020-06-01',
  companyId: 'comp-001',
  companyName: 'Swift Logistics',
};

export const mockVehicle: VehicleDetail = {
  id: 'veh-001',
  unitNumber: 'T-4521',
  make: 'Freightliner',
  model: 'Cascadia',
  year: 2023,
  vin: '1FUJHHDR5NLKX7890',
  licensePlate: 'ABC-1234',
  color: 'White',
  fuelType: 'Diesel',
  status: 'ACTIVE',
  currentMileage: 45230,
  lastServiceDate: '2025-05-20',
};

export const mockTrailer: TrailerDetail = {
  id: 'trl-001',
  unitNumber: 'TR-8810',
  type: 'Dry Van',
  make: 'Great Dane',
  year: 2022,
  licensePlate: 'TRL-5678',
  length: 53,
  maxWeight: 45000,
  status: 'ACTIVE',
};
