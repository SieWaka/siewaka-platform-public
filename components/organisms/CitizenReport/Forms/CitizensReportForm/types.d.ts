import { CRQuestion } from '@prisma/client';

export interface CitizenReportFormProps {
  handleSubmit: function;
  questions: Array<CRQuestion>;
}
