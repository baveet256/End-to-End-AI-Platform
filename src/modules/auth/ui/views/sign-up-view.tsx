
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

import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z.object(
    {
        name : z.string().min(1,{message: "Name is required (Naam Jaroori hai)"}),
        email: z.string().email(),
        password: z.string().min(1,{message: "Password is required" }),
        confirmPassword: z.string().min(1,{message: "Password is required" })
    }
).refine((data) => data.password === data.confirmPassword,{
    message:"Password's dont match",
    path : ["confirmPassword"],
});

const TypewriterText = () => {
    const roles = [
        "Software Developer", 
        "AI Engineer",
        "Data Scientist",
    ];
    
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    
    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = isDeleting ? 500 : 2000;
        
        if (!isDeleting && displayText === currentRole) {
            setTimeout(() => setIsDeleting(true), pauseTime);
            return;
        }
        
        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }
        
        const timeout = setTimeout(() => {
            setDisplayText(
                isDeleting
                    ? currentRole.substring(0, displayText.length - 1)
                    : currentRole.substring(0, displayText.length + 1)
            );
        }, typingSpeed);
        
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRoleIndex]);
    
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);
    
    return (
        <>
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
        </>
    );
};

export const SignUpView  = () => {

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
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        },
    });

    const router = useRouter();
    const [error,setError] = useState <string | null> (null);
    const [pending, setPending] = useState(false);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signUp.email(
            {
                name: data.name,
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
            <Card className="overflow-hidden p-0 min-h-[650px] md:min-h-[700px]">
                <CardContent className=" grid p-0 md:grid-cols-2 h-full"> 
                <Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="p-6 md:p-8 flex flex-col gap-8"
  >
    {/* Header */}
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-extrabold text-gray-600 tracking-tight">
        Let&apos;s get started 🐾
      </h1>
      <p className="text-sm text-gray-400 text-center">
        Create your account and join the Meow.AI journey
      </p>
    </div>

    {/* Name */}
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-400">Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="baveet"
              {...field}
              className="bg-zinc-900/70 border border-zinc-700 rounded-xl 
                         focus:ring-2 focus:ring-amber-400 text-white placeholder:text-gray-100"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

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

    {/* Confirm Password */}
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-400">Confirm Password</FormLabel>
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
      Sign Up
    </Button>

    {/* Divider */}
    <div className="relative text-center text-sm my-2">
      <span className="px-3 bg-zinc-900 rounded-xl  text-gray-100 relative z-10">
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
        <FaGoogle className="mr-2 text-gray-100" /> Google
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
    <div className="text-center text-sm text-gray-400 mt-4">
      Already have an account?{" "}
      <Link
        href="/sign-in"
        className="text-amber-400 hover:text-amber-500 underline underline-offset-4"
      >
        Sign in
      </Link>
    </div>
  </form>
</Form>


<div ref = {containerRef} className="bg-gradient-to-b from-pink-200 via-orange-300 to-amber-600 relative hidden md:flex flex-col gap-y-2 items-start justify-start rounded-2xl shadow-lg p-5 overflow-y-auto h-full">
                    <div className="w-full flex flex-col items-center gap-1 mb-2">
                        <img ref = {logoRef} src="/logo.svg" alt="Logo" className="h-[70px] w-[70px] drop-shadow-lg transition-transform duration-200" />
                        <p className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-amber-800 via-orange-500 to-pink-700">
                            Meow.AI
                        </p>
                        <span className="text-xs text-gray-700 italic">AI-powered meeting assistant 🎯</span>
                    </div>
                    
                    <div className="w-full bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/40 space-y-2">
                        <h2 className="font-bold text-base text-amber-900">👋 Baveet Singh Hora</h2>
                        <div className="h-5 flex items-center text-xs">
                            <span className="font-medium text-gray-800">I'm a </span>
                            <span className="font-bold text-amber-900 ml-1">
                                <TypewriterText />
                            </span>
                        </div>
                        <p className="text-xs font-semibold text-orange-700">
                            Full-time jobs, here I am coming! 🚀
                        </p>
                    </div>

                    <div className="w-full bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/40 space-y-2">
                        <h3 className="font-bold text-sm text-purple-900 flex items-center gap-1">
                            🤖 What is Meow.AI?
                        </h3>
                        <p className="text-xs text-gray-800 leading-relaxed">
                            Full-stack SaaS where <span className="font-semibold text-purple-900">AI meets video meetings</span>. Create custom AI agents that join your calls, participate in real-time, and provide multilingual support with live translation.
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                            <span className="text-[10px] bg-purple-900/20 text-purple-900 px-2 py-0.5 rounded-full font-medium">Real-time AI</span>
                            <span className="text-[10px] bg-pink-900/20 text-pink-900 px-2 py-0.5 rounded-full font-medium">Mock Interviews</span>
                            <span className="text-[10px] bg-orange-900/20 text-orange-900 px-2 py-0.5 rounded-full font-medium">Transcripts</span>
                        </div>
                    </div>

                    <div className="w-full bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/40 space-y-2">
                        <h3 className="font-bold text-sm text-blue-900 flex items-center gap-1">
                            ⚡ Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">Next.js 15</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">React 19</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">TypeScript</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">Tailwind v4</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">tRPC</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">Drizzle ORM</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">Stream SDK</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">OpenAI</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">BetterAuth</span>
                            <span className="text-[10px] bg-blue-900/20 text-blue-900 px-2 py-0.5 rounded font-medium">Inngest</span>
                        </div>
                    </div>

                    <div className="w-full bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/40 space-y-2">
                        <h3 className="font-bold text-sm text-green-900 flex items-center gap-1">
                            🎯 Key Achievements
                        </h3>
                        <ul className="text-xs text-gray-800 space-y-1.5 leading-relaxed">
                            <li className="flex items-start gap-1">
                                <span className="text-green-700 font-bold">•</span>
                                <span><span className="font-semibold text-green-900">42% faster</span> page loads with optimized client-server architecture</span>
                            </li>
                            <li className="flex items-start gap-1">
                                <span className="text-green-700 font-bold">•</span>
                                <span><span className="font-semibold text-green-900">100+ concurrent</span> AI agent sessions with Stream Video SDK</span>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full flex gap-2 justify-center pt-1">
                        <a 
                            href="https://github.com/baveet256" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg transition-all hover:scale-110 shadow-lg"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/baveet-singh-961303220/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all hover:scale-110 shadow-lg"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                    
                </CardContent> 
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"> By clicking you agree our terms of service <a href="#"> Terms of Service </a>
            and <a href="#"> Privacy policy </a>
            </div>
    </div>
        
    );
}
 
