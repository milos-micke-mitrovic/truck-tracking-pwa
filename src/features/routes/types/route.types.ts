// --- Enums ---

export enum RouteStatus {
  BOOKED = 'BOOKED',
  DISPATCHED = 'DISPATCHED',
  IN_TRANSIT = 'IN_TRANSIT',
  AT_PICKUP = 'AT_PICKUP',
  LOADED = 'LOADED',
  AT_DELIVERY = 'AT_DELIVERY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  INVOICED = 'INVOICED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum RouteType {
  SHORTEST_FASTEST = 'SHORTEST_FASTEST',
  CHEAPEST = 'CHEAPEST',
  ALTERNATE = 'ALTERNATE',
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
  UNLOADING = 'UNLOADING',
  DEPARTED = 'DEPARTED',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export enum ArrivalSlotType {
  WINDOW = 'WINDOW',
  FCFS = 'FCFS',
  BY_APPOINTMENT = 'BY_APPOINTMENT',
  EXACT_TIME = 'EXACT_TIME',
}

export enum PodStatus {
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum AccessoryType {
  SAFETY_VEST = 'SAFETY_VEST',
  HARD_HAT = 'HARD_HAT',
  SAFETY_GLASSES = 'SAFETY_GLASSES',
  STEEL_TOED_BOOTS = 'STEEL_TOED_BOOTS',
  WORK_GLOVES = 'WORK_GLOVES',
  FACE_MASK_RESPIRATOR = 'FACE_MASK_RESPIRATOR',
  FLAME_RESISTANT_CLOTHING = 'FLAME_RESISTANT_CLOTHING',
  HAIR_NET_BEARD_NET = 'HAIR_NET_BEARD_NET',
  LOAD_LOCKS_LOAD_BARS = 'LOAD_LOCKS_LOAD_BARS',
  TIE_DOWN_STRAPS = 'TIE_DOWN_STRAPS',
  PALLET_JACK = 'PALLET_JACK',
  HAND_TRUCK_DOLLY = 'HAND_TRUCK_DOLLY',
  LIFTGATE = 'LIFTGATE',
  TARPS = 'TARPS',
  HOSES_AND_FITTINGS = 'HOSES_AND_FITTINGS',
  BULKHEADS = 'BULKHEADS',
  TRAILER_SEAL = 'TRAILER_SEAL',
  OVERSIZE_LOAD_BANNER_FLAGS = 'OVERSIZE_LOAD_BANNER_FLAGS',
}

export enum RequiredDocumentType {
  BOL_PHOTO = 'BOL_PHOTO',
  POD_PHOTO = 'POD_PHOTO',
  TIRES_PHOTO = 'TIRES_PHOTO',
  TRAILER_PHOTO = 'TRAILER_PHOTO',
  SECURED_FREIGHT_PHOTO = 'SECURED_FREIGHT_PHOTO',
  SEAL_PHOTO = 'SEAL_PHOTO',
  EMPTY_SCALE_PHOTO = 'EMPTY_SCALE_PHOTO',
  LOADED_SCALE_PHOTO = 'LOADED_SCALE_PHOTO',
  ESCORT_PHOTO = 'ESCORT_PHOTO',
  LUMPER_RECEIPT_PHOTO = 'LUMPER_RECEIPT_PHOTO',
}

export enum WeightUnit {
  LBS = 'LBS',
  KG = 'KG',
}

export enum Capacity {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
}

export enum UnitType {
  PALLETS = 'PALLETS',
  BAGS = 'BAGS',
  BALES = 'BALES',
  BINS = 'BINS',
  BOXES = 'BOXES',
  BUNCHES = 'BUNCHES',
  BUNDLES = 'BUNDLES',
}

export enum FacilityType {
  SHIPPER = 'SHIPPER',
  RECEIVER = 'RECEIVER',
  BOTH = 'BOTH',
}

export enum ReferenceNumberType {
  APPT_CONF = 'APPT_CONF',
  BOL = 'BOL',
  CUSTOMER = 'CUSTOMER',
  DEL_CONSIGNEE = 'DEL_CONSIGNEE',
  DELIVERY = 'DELIVERY',
  GATE_CHECK_IN = 'GATE_CHECK_IN',
  ITEM = 'ITEM',
  PRO = 'PRO',
}

// --- Short DTOs ---

export interface CompanyShort {
  id: number;
  displayName: string;
  dotNumber: string | null;
  mcNumber: string | null;
}

export interface DriverShort {
  id: number;
  name: string;
  phoneNumber: string | null;
  status: string | null;
}

export interface VehicleShort {
  id: number;
  unitId: string;
  make: string | null;
  model: string | null;
  status: string | null;
}

export interface BrokerShort {
  id: number;
  mcNumber: string;
  legalName: string | null;
  dbaName: string | null;
}

export interface UserShort {
  id: number;
  name: string;
  email: string | null;
  role: string | null;
}

export interface FacilityShort {
  id: number;
  name: string;
  facilityType: FacilityType;
  city: string | null;
  state: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

// --- Route List DTO ---

export interface RouteShortResponse {
  id: number;
  companyName: string;
  brokerIdentifier: string | null;
  internalIdentifier: string | null;
  brokerRate: number;
  ratePerMile: number | null;
  totalMiles: number | null;
  totalStops: number;
  originCity: string | null;
  originDate: string | null;
  destinationCity: string | null;
  destinationDate: string | null;
  unitNumber: string | null;
  driverName: string | null;
  dispatcherName: string | null;
  status: RouteStatus;
  bookedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

// --- Reference Numbers ---

export interface ReferenceNumber {
  id: number;
  type: ReferenceNumberType;
  value: string;
}

// --- Load Details ---

export interface LoadDetailsResponse {
  id: number;
  weight: string | null;
  weightUnit: WeightUnit | null;
  lengthFeet: string | null;
  commodity: string | null;
  capacity: Capacity | null;
  temperature: string | null;
  unitCount: number | null;
  unitType: UnitType | null;
}

// --- Route Stop ---

export interface RouteStopResponse {
  id: number;
  type: StopType;
  facility: FacilityShort | null;
  stopOrder: number;
  arrivalSlotType: ArrivalSlotType | null;
  arrivalStartDate: string | null;
  arrivalEndDate: string | null;
  actualArrivalDate: string | null;
  actualDepartureDate: string | null;
  status: StopStatus;
  referenceNumbers: ReferenceNumber[];
  accessories: AccessoryType[];
  requiredDocuments: RequiredDocumentType[];
  createdAt: string;
  updatedAt: string;
}

// --- Route Detail DTO ---

export interface RouteResponse {
  id: number;
  tenantId: number;
  company: CompanyShort;
  dispatcher: UserShort | null;
  vehicle: VehicleShort | null;
  driver: DriverShort | null;
  coDriver: DriverShort | null;
  broker: BrokerShort | null;
  brokerRepresentative: string | null;
  brokerIdentifier: string | null;
  internalIdentifier: string | null;
  brokerRate: number;
  driverRate: number;
  ratePerMile: number | null;
  totalMiles: number | null;
  totalStops: number;
  estimatedDuration: string | null;
  routeHighway: string | null;
  tolls: number | null;
  fuelCost: number | null;
  routeType: RouteType | null;
  status: RouteStatus;
  autoDispatched: boolean;
  dispatchedAt: string | null;
  bookedAt: string | null;
  completedAt: string | null;
  stops: RouteStopResponse[];
  loadDetails: LoadDetailsResponse | null;
  createdAt: string;
  updatedAt: string;
}

// --- Temp Upload ---

export interface TempFileResult {
  tempFileName: string;
  originalFileName: string;
  fileSize: number;
}

export interface PodDocumentRequest {
  tempFileName: string;
  originalFileName: string;
}

export interface PodSubmissionRequest {
  notes?: string;
  documents: PodDocumentRequest[];
}

// --- POD ---

export interface PodDocumentResponse {
  id: number;
  fileName: string;
  originalFileName: string;
  fileSize: number;
  contentType: string;
  sortOrder: number;
}

export interface PodSubmissionResponse {
  id: number;
  stopId: number;
  routeId: number;
  driverId: number;
  driverName: string;
  status: PodStatus;
  notes: string | null;
  documents: PodDocumentResponse[];
  submittedAt: string;
  createdAt: string;
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

// --- SSE Event Payload ---

export interface SseEventPayload<T = unknown> {
  type: string;
  title: string;
  body: string;
  data: T;
  referenceId: number | null;
  timestamp: string;
}

// --- Mapper: RouteResponse → RouteShortResponse ---

export function mapRouteResponseToShort(route: RouteResponse): RouteShortResponse {
  const sortedStops = [...(route.stops || [])].sort((a, b) => a.stopOrder - b.stopOrder);
  const firstStop = sortedStops[0] ?? null;
  const lastStop = sortedStops.length > 1 ? sortedStops[sortedStops.length - 1] : firstStop;

  return {
    id: route.id,
    companyName: route.company?.displayName ?? '',
    brokerIdentifier: route.brokerIdentifier ?? null,
    internalIdentifier: route.internalIdentifier ?? null,
    brokerRate: route.brokerRate,
    ratePerMile: route.ratePerMile ?? null,
    totalMiles: route.totalMiles ?? null,
    totalStops: route.totalStops,
    originCity: firstStop?.facility?.city ?? null,
    originDate: firstStop?.arrivalStartDate ?? null,
    destinationCity: lastStop?.facility?.city ?? null,
    destinationDate: lastStop?.arrivalStartDate ?? null,
    unitNumber: route.vehicle?.unitId ?? null,
    driverName: route.driver?.name ?? null,
    dispatcherName: route.dispatcher?.name ?? null,
    status: route.status,
    bookedAt: route.bookedAt ?? null,
    completedAt: route.completedAt ?? null,
    createdAt: route.createdAt,
  };
}
