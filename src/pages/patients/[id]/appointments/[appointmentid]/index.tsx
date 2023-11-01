import { Topbar } from "@/components/layout/topbar";

export default function Page() {
  return (
    <>
      <Topbar.Wrapper className='pb-4'>
        <div className='flex items-center justify-between'>
          <Topbar.Logo />
          <Topbar.Actions />
        </div>
      </Topbar.Wrapper>
    </>
  )
}
