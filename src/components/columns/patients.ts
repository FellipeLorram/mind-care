import { type Patient } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

type patients = Pick<Patient, 'name' | 'appointment_time' | 'appointment_duration'>

export const patientDataColumns: ColumnDef<patients>[] = [
	{
	  accessorKey: "name",
	  header: "Name",
	},
	{
	  accessorKey: "appointment_time",
	  header: "Appointment Time",
	},
	{
	  accessorKey: "appointment_duration",
	  header: "Appointment Duration",
	},
  ]
  