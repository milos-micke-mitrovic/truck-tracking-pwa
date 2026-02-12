// --- Enums ---

export enum RouteStatus {
  CREATED = 'CREATED',
  DISPATCHED = 'DISPATCHED',
  IN_TRANSIT = 'IN_TRANSIT',
  AT_PICKUP = 'AT_PICKUP',
  LOADED = 'LOADED',
  AT_DELIVERY = 'AT_DELIVERY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum StopType {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

export enum StopStatus {
  PENDING = 'PENDING',
  EN_ROUTE = 'EN_ROUTE',
  ARRIVED = 'ARRIVED',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  UNLOADING = 'UNLOADING',
  UNLOADED = 'UNLOADED',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export enum ArrivalSlotType {
  FCFS = 'FCFS',
  APPOINTMENT = 'APPOINTMENT',
  OPEN = 'OPEN',
}

export enum PodStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum AccessoryType {
  PALLET_JACK = 'PALLET_JACK',
  LIFT_GATE = 'LIFT_GATE',
  STRAPS = 'STRAPS',
  BLANKETS = 'BLANKETS',
  TARPS = 'TARPS',
  CHAINS = 'CHAINS',
  LOAD_BARS = 'LOAD_BARS',
  DOCK_LOCK = 'DOCK_LOCK',
  PPE = 'PPE',
  HARD_HAT = 'HARD_HAT',
  STEEL_TOES = 'STEEL_TOES',
  HI_VIS = 'HI_VIS',
}

export enum RequiredDocumentType {
  BOL = 'BOL',
  POD = 'POD',
  LUMPER_RECEIPT = 'LUMPER_RECEIPT',
  SCALE_TICKET = 'SCALE_TICKET',
  CUSTOMS = 'CUSTOMS',
  TEMPERATURE_LOG = 'TEMPERATURE_LOG',
}

// --- Short DTOs ---

export interface CompanyShort {
  id: string;
  name: string;
}

export interface DriverShort {
  id: string;
  firstName: string;
  lastName: string;
}

export interface VehicleShort {
  id: string;
  unitNumber: string;
}

export interface BrokerShort {
  id: string;
  name: string;
  identifier: string;
}

export interface UserShort {
  id: string;
  firstName: string;
  lastName: string;
}

export interface FacilityShort {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
}

// --- Route List DTO ---

export interface RouteShortResponse {
  id: string;
  companyName: string;
  brokerIdentifier: string;
  internalIdentifier: string;
  brokerRate: number;
  ratePerMile: number;
  totalMiles: number;
  totalStops: number;
  originCity: string;
  originState: string;
  originDate: string;
  destinationCity: string;
  destinationState: string;
  destinationDate: string;
  unitNumber: string;
  driverName: string;
  dispatcherName: string;
  status: RouteStatus;
  bookedAt: string;
  createdAt: string;
}

// --- Reference Numbers ---

export interface ReferenceNumber {
  id: string;
  type: string;
  value: string;
}

// --- Load Details ---

export interface LoadDetailsResponse {
  id: string;
  commodity: string;
  weight: number;
  weightUnit: string;
  pieces: number;
  pallets: number;
  temperature: number | null;
  temperatureUnit: string | null;
  length: number | null;
  width: number | null;
  height: number | null;
  hazmat: boolean;
  notes: string | null;
}

// --- Route Stop ---

export interface RouteStopResponse {
  id: string;
  routeId: string;
  stopNumber: number;
  type: StopType;
  status: StopStatus;
  facility: FacilityShort;
  arrivalSlotType: ArrivalSlotType;
  appointmentStartDate: string | null;
  appointmentEndDate: string | null;
  actualArrivalDate: string | null;
  actualDepartureDate: string | null;
  referenceNumbers: ReferenceNumber[];
  accessories: AccessoryType[];
  requiredDocuments: RequiredDocumentType[];
  notes: string | null;
  podStatus: PodStatus;
}

// --- Route Detail DTO ---

export interface RouteResponse {
  id: string;
  company: CompanyShort;
  broker: BrokerShort;
  driver: DriverShort;
  dispatcher: UserShort;
  vehicle: VehicleShort;
  internalIdentifier: string;
  brokerRate: number;
  driverRate: number;
  ratePerMile: number;
  totalMiles: number;
  status: RouteStatus;
  stops: RouteStopResponse[];
  loadDetails: LoadDetailsResponse;
  notes: string | null;
  bookedAt: string;
  createdAt: string;
  updatedAt: string;
}

// --- POD ---

export interface PodDocumentResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
}

export interface PodSubmissionResponse {
  id: string;
  stopId: string;
  status: PodStatus;
  notes: string | null;
  documents: PodDocumentResponse[];
  submittedAt: string;
  reviewedAt: string | null;
}

// --- Request Types ---

export interface UpdateRouteStatusRequest {
  status: RouteStatus;
}

export interface UpdateStopRequest {
  status?: StopStatus;
  actualArrivalDate?: string;
  actualDepartureDate?: string;
}
