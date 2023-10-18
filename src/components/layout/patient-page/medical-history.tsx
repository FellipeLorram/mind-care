import { usePatientContext } from '@/context/patient-context';
import { MedicalHistoryDialog } from './medical-history-dialog';

export function MedicalHistory() {
	const { medicalInfo } = usePatientContext();

	const {
		allergies,
		chronicDiseases,
		medicalHistory,
		medications,
	} = medicalInfo;

	const hasMedicalHistory =
		allergies ??
		chronicDiseases ??
		medicalHistory ??
		medications;

	return (
		<div className='w-full flex flex-row items-center justify-between border-b border rounded-lg p-6 mt-10'>
			{hasMedicalHistory ? (
				<div className='flex flex-col items-start justify-start w-full'>
					<div className='w-full flex flex-row items-start justify-between'>
						<div>
							<h1 className='text-sm font-medium text-gray-500'>
								Allergies
							</h1>
							<p className='text-sm'>
								{allergies === '' ? '...' : allergies}
							</p>
						</div>
						<MedicalHistoryDialog />
					</div>
					<h1 className='text-sm font-medium text-gray-500 mt-4'>
						Chronic Diseases
					</h1>
					<p className='text-sm'>
						{chronicDiseases === '' ? '...' : chronicDiseases}
					</p>
					<h1 className='text-sm font-medium text-gray-500 mt-4'>
						Medical History
					</h1>
					<p className='text-sm'>
						{medicalHistory === '' ? '...' : medicalHistory}
					</p>
					<h1 className='text-sm font-medium text-gray-500 mt-4'>
						Medications
					</h1>
					<p className='text-sm'>
						{medications === '' ? '...' : medications}
					</p>
				</div>
			) :
				<div className='flex items-center justify-between flex-row w-full'>
					<p>No patient medical history</p>
					<MedicalHistoryDialog />
				</div>
			}


		</div>
	)
}
