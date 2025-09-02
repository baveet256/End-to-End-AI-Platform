"use client";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const HomeView = () => {

  const {data : session} = authClient.useSession()
  const router = useRouter();
  if(!session){
    return(
      <p>Loading ...</p>
    )
  }
  return(
    <div className="flex flex-col p-4 gap-4">
      <p>Logged in as {session.user.name}</p>

      <Button onClick={ () => authClient.signOut({
        fetchOptions: { onSuccess: () => router.push("/sign-in")
        }
        })}> Sign out</Button>
    </div>
  )
}
 
