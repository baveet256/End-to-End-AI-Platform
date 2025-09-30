
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert,AlertTitle } from "@/components/ui/alert";
import {FaGithub, FaGoogle} from "react-icons/fa";

import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

const formSchema = z.object(
    {
        email: z.string().email(),
        password: z.string().min(1,{message: "Password is required" }),

    }
);
export const SignInView  = () => {
    
    const logoRef = useRef<HTMLImageElement>(null);
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const catLogo = logoRef.current;
  const container = containerRef.current;
  if (!catLogo || !container) return;

  const handleMouseMove = (e: MouseEvent) => {
    const containerRect = container.getBoundingClientRect();
    const logoRect = catLogo.getBoundingClientRect();

    // cursor relative to container center
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    const threshold = 200; // how close before it reacts

    if (distance < threshold) {
      // movement magnitude increases when cursor is closer
      const factor = Math.min((threshold - distance) / threshold, 1); 
      const maxMove = 80; // max px movement
      const moveX = -offsetX * factor * (maxMove / threshold);
      const moveY = -offsetY * factor * (maxMove / threshold);

      catLogo.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX / 15}deg)`;
    } else {
      catLogo.style.transform = `translate(0px, 0px) rotate(0deg)`;
    }
  };

  document.addEventListener("mousemove", handleMouseMove);
  return () => document.removeEventListener("mousemove", handleMouseMove);
}, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
        },
    });

    const router = useRouter();
    const [error,setError] = useState <string | null> (null);
    const [pending, setPending] = useState(false);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,

            },
            {
                onSuccess : () => {
                    setPending(false);
                    router.push('/')
                },
                onError : ({error}) =>{
                    setPending(false);
                    setError(error.message)
                }
            }
        );
        
    };
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className=" grid p-0 md:grid-cols-2"> 
                <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-6 md:p-8 flex flex-col gap-6"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-3xl font-extrabold text-gray-600 tracking-tight">
                        Welcome Back 🐾
                    </h1>
                    <p className="text-sm text-gray-400 text-center">
                        Sign in to continue your Meow.AI journey
                    </p>
                    </div>

                    {/* Email */}
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-gray-400">Email</FormLabel>
                        <FormControl>
                            <Input
                            type="email"
                            placeholder="m@baveet.com"
                            {...field}
                            className="bg-zinc-900/70 border border-zinc-700 rounded-xl 
                                        focus:ring-2 focus:ring-amber-400 text-white placeholder:text-gray-100"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Password */}
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-gray-400">Password</FormLabel>
                        <FormControl>
                            <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                            className="bg-zinc-900/70 border border-zinc-700 rounded-xl 
                                        focus:ring-2 focus:ring-amber-400 text-white placeholder:text-gray-100"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Error */}
                    {!!error && (
                    <Alert className="bg-red-900/30 border border-red-700/50 rounded-xl">
                        <OctagonAlertIcon className="h-4 w-4 text-red-500" />
                        <AlertTitle className="text-red-400">{error}</AlertTitle>
                    </Alert>
                    )}

                    {/* Submit */}
                    <Button
                    disabled={pending}
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 
                                text-black font-semibold rounded-xl shadow-lg 
                                hover:shadow-amber-500/40 hover:scale-[1.02] 
                                transition-all duration-200"
                    >
                    Sign In
                    </Button>

                    {/* Divider */}
                    <div className="relative text-center text-sm my-2">
                    <span className="px-3 bg-zinc-900 rounded-xl text-gray-100 relative z-10">
                        Or continue with
                    </span>
                    <div className="absolute inset-0 top-1/2 border-t border-zinc-700" />
                    </div>

                    {/* Social logins */}
                    <div className="grid grid-cols-2 gap-4">
                    <Button
                        disabled={pending}
                        onClick={() => authClient.signIn.social({ provider: "google" })}
                        type="button"
                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl 
                                hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20 
                                transition-all"
                    >
                        <FaGoogle className="mr-2 text-gray-300" /> Google
                    </Button>

                    <Button
                        disabled={pending}
                        onClick={() => authClient.signIn.social({ provider: "github" })}
                        type="button"
                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl 
                                hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20 
                                transition-all"
                    >
                        <FaGithub className="mr-2 text-gray-300" /> GitHub
                    </Button>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-amber-400 hover:text-amber-500 underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                    </div>
                </form>
                </Form>


                    <div ref = {containerRef} className="bg-gradient-to-b from-pink-200 via-orange-300 to-amber-600 relative hidden md:flex flex-col gap-y-4 items-center justify-center rounded-2xl shadow-lg p-8">
                    <img ref = {logoRef} src="/logo.svg" alt="Logo" className="h-[120px] w-[120px] drop-shadow-lg" />

                    <p className="font-bold text-3xl tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-amber-800 via-orange-500 to-pink-700 animate-gradient-shimmer hover:drop-shadow-[0_0_12px_oklch(0.75_0.2_85)] transition-all duration-200">
                        Meow.AI
                    </p>
                    <span className="text-sm text-gray-700 italic">Smart like a cat 🐾</span>
                    </div>
                                


                </CardContent> 
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"> By clicking you agree our terms of service <a href="#"> Terms of Service </a>
            and <a href="#"> Privacy policy </a>
            </div>
    </div>
        
    );
}
 
