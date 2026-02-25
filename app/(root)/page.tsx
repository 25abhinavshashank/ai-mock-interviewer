import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

function page() {
  return (
   <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
            <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
            <p className='text-lg'>Practice on real interview questions & get instant feedback </p>
            <Button asChild className='btn-primary max max-sm:w-fUll'>
                <Link href='/interview' >Start an Interview</Link>
            </Button>
        </div>
        <Image src="/robot.png" alt="robot-dude" width={400} height={400} className="max-sm:hidden" ></Image>
      </section>  
        <section className='flex flex-col gap-6 mt-8'>
             <h2>Your Interviews</h2>
             <div className='interviews-section'>
             {dummyInterviews.map((interview)=>(
             <InterviewCard {...interview} key={interview.id}/>
             ))}

             {/* <p>You havn't taken any interview yet</p> */}
             </div>
        </section>

        <section className='flex flex-col gap-6 mt-8 '>
             <h2>Take an interview</h2>
             <div className='interviews-section'>
                 {dummyInterviews.map((interview)=>(
             <InterviewCard {...interview} key={interview.id}/>
             ))}
                 {/* <p>There are no interview available</p> */}
             </div>
        </section>
      {/* </section> */}
   </>
  )
}

export default page