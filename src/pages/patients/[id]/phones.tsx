import { Layout } from "@/components/layout/layout";
import { Navigation } from "@/components/layout/single-patient-page/navigation";

export default function Page() {
  return (
    <Layout>
      <div className='w-11/12 max-w-6xl mx-auto flex flex-col items-center md:flex-row md:items-start justify-start gap-4 md:gap-0'>
        <Navigation />
      </div>
    </Layout>
  )
}
