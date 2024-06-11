"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hook/auth";
import { getUser } from "@/services/user";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

function Profile() {
  const { logout } = useAuth();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  console.log(user);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Account</CardTitle>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Name: {user.data.name}</h3>
            <p className="text-sm">Phone: +{user.data.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;
