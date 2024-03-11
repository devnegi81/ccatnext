"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import Skills from "@/components/Skills"
 
const notifications = [
  {
    title: "React Js",
    // description: "1 hour ago",
  },
  {
    title: "Angular Js",
    // description: "1 hour ago",
  },
  {
    title: "Node Js",
    // description: "2 hours ago",
  },
]
 
type CardProps = React.ComponentProps<typeof Card>

const Candidates = ({ className, ...props }: CardProps) => {

    const [candidates, setCandidates] = useState([]);
    const [skills, setSkills] = useState([]);

    const getAllCandidatesBasedOnFilter = (filterValue: string[]) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/candidates`)
        .then(res => res.json())
        .then((result) => {
            console.log(`candidates received: `, result);
            setCandidates(result);
        })
        .catch((err) => {
            console.log(`Error while fetching candidates`, err);
        })
    }
    const getAllSkills = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/skills`)
        .then(res => res.json())
        .then((result) => {
            console.log(`skills received: `, result);
            const updatedResults = result.map((item: any) => {
                item['label'] = item.name;
                return item;
            })
            setSkills(updatedResults);
        })
        .catch((err) => {
            console.log(`Error while fetching skills`, err);
        })
    }

    const onFilterBySkills = (val: string[]) => {
        console.log(`onFilter Change called`, val)
    }

    useEffect(() => {
        getAllCandidatesBasedOnFilter([]);
        getAllSkills();
    }, []);
      
    return (
        <div className="flex justify-center">
            <Skills skills={skills} onFilterBySkills={onFilterBySkills} />
            <div className="grid grid-cols-3 grid-rows-5 gap-6">
            {
                candidates.map((candidate, index) => {
                    return (
                        <Card key={index} className={cn("w-[380px]", className)} {...props}>
                            <CardHeader>
                                <CardTitle>{candidate.name}</CardTitle>
                                <CardDescription>{candidate.email}</CardDescription>
                                <CardDescription>{candidate.phone}</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className=" flex items-center space-x-4 rounded-md p-4">
                                <div className="flex-1 space-y-1">
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Current CTC</p>
                                        <p className="text-sm font-small leading-none m-2">
                                            {candidate.current_ctc}
                                        </p>
                                    </div>
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Expected CTC</p>
                                        <p className="text-sm font-small leading-none m-2">
                                            {candidate.expected_ctc}
                                        </p>
                                    </div>
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Skills</p>
                                        <p className="text-sm font-small leading-none">
                                            {/* ReactJs, Node js, ReactJs, Node js, ReactJs, Node js */}
                                            <CandidateSkill id={candidate.id} />
                                        </p>
                                    </div>
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Score</p>
                                        <p className="text-sm font-small leading-none m-2">
                                            {candidate.score}
                                        </p>
                                    </div>
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Qualification</p>
                                        <p className="text-sm font-small leading-none m-2">
                                            {candidate.qualification}
                                        </p>
                                    </div>
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Experience</p>
                                        <p className="text-sm font-small leading-none m-2">
                                            {candidate.experience} years
                                        </p>
                                    </div>
                                    <div className="flex flex-direction-col">
                                        <p className="text-md font-medium leading-none">Current Status</p>
                                        <p className="text-sm font-small leading-none m-2">
                                            {candidate.current_status}
                                        </p>
                                    </div>
                                    {/* <p className="text-sm font-medium leading-none">
                                        Skills: ReactJs, Node js, ReactJs, Node js, ReactJs, Node js
                                    </p>
                                    <p className="text-sm font-medium leading-none">
                                        Score: ReactJs, Node js, ReactJs, Node js, ReactJs, Node js
                                    </p> */}
                                </div>
                                </div>
                                {/* <div>
                                {
                                    notifications.map((notification, index) => (
                                        <div
                                        key={index}
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                        >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                            {notification.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                            {notification.description}
                                            </p>
                                        </div>
                                        </div>
                                    ))
                                }
                                </div> */}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    Read More...
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })
            }
            </div>
        </div>
    )
}

const CandidateSkill = (props: { id: number }) => {
    console.log(`find for id: `, props.id);
    const [mySkills, setMySkills] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/candidate-skills/candidate/${props.id}`)
        .then(res => res.json())
        .then((result) => {
            const skills: any[] = [];
            result.map((item: any) => {
                skills.push(item.skills);
            })

            // @ts-expect-error 
            setMySkills(skills);
        })
        .catch((err) => {
            console.log(`Error while fetching candidate skills: `, err);
        })

    }, [props.id])

    console.log(`mySkills:  `, mySkills)
    return (
        <>
            {
                mySkills.map(skill => skill?.name).join()
            }
        </>
    )
}

export default Candidates;