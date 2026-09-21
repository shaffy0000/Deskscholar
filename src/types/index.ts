export type DeliveryStatus = 'SENT' | 'DISABLED';

export interface ApiSuccessResponse {
  success: true;
  deliveryStatus: DeliveryStatus;
  message: string;
  referenceId: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
  timestamp: string;
}

export interface HealthResponse {
  success: true;
  status: 'UP';
  service: string;
  emailDeliveryConfigured: boolean;
  timestamp: string;
}

export type AccessRole =
  | 'STUDENT'
  | 'PARENT'
  | 'TEACHER'
  | 'SCHOOL'
  | 'RESEARCHER'
  | 'INVESTOR_PARTNER'
  | 'OTHER';

export type FormSubmitState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };
