export interface TaskModel {
  id?: number;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  user_id?: number;
  project_id?: number;
}
