export interface LaunchData {
  id: string;
  name: string;
  launchDate: string;
  rocket: string;
  upcoming: boolean;
  favourited: boolean;
  success?: boolean;
  patchImage?: string;
}
