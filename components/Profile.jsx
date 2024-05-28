"use client";

import { useAuth } from "@/hook/auth";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

function Profile() {
  const { logout } = useAuth();
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
      <CardContent></CardContent>
    </Card>
  );
}

export default Profile;
