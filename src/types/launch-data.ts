export interface LaunchData {
  id: string;
  name: string;
  launchDate: string;
  rocket: string;
  upcoming: boolean;
  success?: boolean;
  iconColor?: string;
  patchImage?: string;
}
