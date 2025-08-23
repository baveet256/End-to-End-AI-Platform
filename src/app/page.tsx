import Image from "next/image";
import {Button} from "@/components/ui/button"

export default function Home() {
  return (
    <>
    <div className="text-4xl font-extrabold text-red-400">Hello World!</div>
    <Button variant="outline"> Click me </Button>
    </>
  )
}
