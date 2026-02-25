"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import FormField from "./formField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router=useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

async  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const {name,email,password}=data;
        const userCredentials=await  createUserWithEmailAndPassword(auth,email,password);
        const result=await signUp({
          uid:userCredentials.user.uid,
          name:name!,
          email,
          password
        })
      
        if(!result?.success){
          toast.error(result?.message);
          return;
        }

       toast.success('Account Created successfully.Please sign in.');
       router.push('/sign-in')

      } else {
        
        const {email,password}=data;

        const userCreadential=await signInWithEmailAndPassword(auth,email,password);

        const idToken=await userCreadential.user.getIdToken();
        if(!idToken){
          toast.error('sign in failed')
          return;
        }

        await signIn({
          email,idToken
        })

         toast.success('Signed In successfully');
       router.push('/')
        
      }
     
    } catch (err) {
      console.log(err);
      toast.error(`There is an error ${err}`);
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border `lg:min-w-[566px]`">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice Job Interview With AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name "
              />
            )}
             <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email id  "
                type="email"
              />
               <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password "
                type="password"
              />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet ? " : "Have an account already ? "}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="underline font-bold  text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
