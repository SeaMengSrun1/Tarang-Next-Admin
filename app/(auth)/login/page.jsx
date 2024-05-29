"use client";

import Image from "next/image";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/hook/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import InputGroup from "@/components/ui/input-group";

function LoginPage() {
  const { login } = useAuth();
  const csrf = () => axios.get("/sanctum/csrf-cookie");
  useEffect(() => {
    const fetchToken = () => {
      csrf();
    };
    fetchToken();
  }, []);
  const [inputData, setInputData] = useState({
    phone: "",
    password: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.startsWith("+")) {
      inputData.phone = phoneNumber.slice(1);
    } else {
      inputData.phone = phoneNumber;
    }
    await login({ ...inputData });
  };
  return (
    <section className="h-screen flex flex-col justify-center items-center p-4 xl:p-0">
      <Card className="w-full md:max-w-[500px]">
        <CardHeader>
          <div className="space-y-6">
            <Image
              src="/tarang_logo.png"
              className="mx-auto"
              alt="logo"
              width={150}
              height={50}
            />
            <CardTitle className="text-2xl md:text-4xl text-center">
              Sign In
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Label>Phone Number</Label>
              <PhoneInput
                id="phone"
                onChange={setPhoneNumber}
                className="rounded-lg"
                international
                defaultCountry="KH"
              />
            </div>
            <InputGroup
              title="Password"
              id="password"
              type="password"
              onChange={onChange}
              placeholder="********"
              isRequired={true}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col justify-center gap-4">
          <Button
            onClick={onSubmit}
            type="submit"
            variant="outline"
            className="w-full bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
          >
            Sign In
          </Button>
          <p>Or Sign In With </p>
          <div className="flex w-full justify-center gap-10">
            <a href="#">
              <Image
                src="/facebook.png"
                alt="facebook_logo"
                width={30}
                height={30}
              />
            </a>
            <a href="https://api.tarang.site/auth/google/redirect">
              <Image
                src="/google.png"
                alt="google_logo"
                width={30}
                height={30}
              />
            </a>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LoginPage;
