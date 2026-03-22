export interface Review {
  id: string | number;
  name: string;
  date: string;
  rating: number;
  text: string;
  platform?: "google" | "trustpilot";
}
