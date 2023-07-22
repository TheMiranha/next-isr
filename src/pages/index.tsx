import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");

  const { push } = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    push(`user/${value}`);
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Github</CardTitle>
          <CardDescription>Search for an user</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="username"
              className="w-[200px]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={() => push("/user/" + value)}>Search</Button>
        </CardFooter>
      </Card>
      <Label
        className="absolute bottom-5 cursor-pointer"
        onClick={() => window.open("https://github.com/themiranha")}
      >
        Made with ❤️ by Lucas Miranda.
      </Label>
    </div>
  );
}
