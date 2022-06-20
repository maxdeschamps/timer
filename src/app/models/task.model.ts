export interface Task {
  id: number|null;
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  user_id?: number;
  project_id?: number;
}