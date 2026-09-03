import type {
  Crop,
  CropActivity,
  CropActivityPayload,
  CropGrowthUpdatePayload,
  CropPayload,
  CropSummary,
} from "@/types/crop";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const cropApi = {
  getSummary: async (): Promise<CropSummary> => request<CropSummary>(`/crops/summary`),
  getCrops: async (): Promise<Crop[]> => request<Crop[]>(`/crops`),
  createCrop: async (payload: CropPayload): Promise<Crop> =>
    request<Crop>(`/crops`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateCrop: async (id: number, payload: CropPayload): Promise<Crop> =>
    request<Crop>(`/crops/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteCrop: async (id: number): Promise<void> =>
    request<void>(`/crops/${id}`, {
      method: "DELETE",
    }),
  getCropById: async (id: number): Promise<Crop> => request<Crop>(`/crops/${id}`),
  updateGrowth: async (id: number, payload: CropGrowthUpdatePayload): Promise<Crop> =>
    request<Crop>(`/crops/${id}/growth`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  getActivities: async (id: number): Promise<CropActivity[]> => request<CropActivity[]>(`/crops/${id}/activities`),
  createActivity: async (id: number, payload: CropActivityPayload): Promise<CropActivity> =>
    request<CropActivity>(`/crops/${id}/activities`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export default cropApi;
