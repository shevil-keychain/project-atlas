"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@/components/ui/card"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function CardPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Card</h1>
          <p className="mt-1 text-sm text-foreground">
            Flexible card container with header, body, and footer.
          </p>
        </div>

        <Section title="Basic">
          <Card>
            <CardHeader>
              <CardTitle>Project overview</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </CardBody>
          </Card>
        </Section>

        <Section title="With Header Actions">
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <div className="flex flex-col gap-1.5">
                <CardTitle>Project overview</CardTitle>
                <CardDescription>View and manage your project details.</CardDescription>
              </div>
              <Button variant="secondary">Edit</Button>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </CardBody>
          </Card>
        </Section>

        <Section title="With Image">
          <Card>
            <div className="p-2">
              <div className="bg-stone-200 h-40 rounded-md" />
            </div>
            <CardHeader>
              <CardTitle>Featured project</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-foreground">
                A short description of the project with an image at the top.
              </p>
            </CardBody>
          </Card>
        </Section>

        <Section title="Stats Card">
          <Card>
            <CardBody>
              <p className="text-2xl font-bold text-foreground">2,847</p>
              <p className="text-sm text-foreground">Total conversations</p>
            </CardBody>
          </Card>
        </Section>

        <Section title="Metric Card">
          <Card>
            <CardHeader>
              <CardTitle>QA Score</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-2xl font-bold text-foreground">94%</p>
              <p className="text-sm text-foreground">Up 2% from last week</p>
            </CardBody>
          </Card>
        </Section>

        <Section title="With Footer Actions">
          <Card>
            <CardHeader>
              <CardTitle>Save changes</CardTitle>
              <CardDescription>Review and confirm your updates before saving.</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="secondary">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </Section>
      </div>
    </div>
  )
}
