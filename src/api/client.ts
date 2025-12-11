// Base API client with error handling
import { ApiResponse, ApiError } from '../types/api';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_MOCK = false // update this to mock data

export class ApiClient {
  private baseUrl: string;
  private useMock: boolean;

  constructor(baseUrl: string = API_BASE_URL, useMock: boolean = USE_MOCK) {
    this.baseUrl = baseUrl;
    this.useMock = useMock;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error: ApiError = {
          code: `HTTP_${response.status}`,
          message: response.statusText,
        };
        return { success: false, error };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      const apiError: ApiError = {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return { success: false, error: apiError };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  isUsingMock(): boolean {
    return this.useMock;
  }
}

// Default client instance
export const apiClient = new ApiClient();
