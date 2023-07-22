import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Screen({ user }: { user: any }) {
  const { push, isFallback } = useRouter();

  if (!isFallback && user.login == undefined) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">Not found</CardTitle>
            <Separator />
          </CardHeader>
          <CardFooter>
            <Button onClick={() => push("/")}>Back</Button>
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

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader
          className="cursor-pointer"
          onClick={() => window.open(user.html_url)}
        >
          <div className="flex gap-4">
            <div>
              {isFallback ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : (
                <Avatar className="h-12 w-12">
                  <AvatarFallback>Avatar</AvatarFallback>
                  <AvatarImage src={user.avatar_url} />
                </Avatar>
              )}
            </div>
            <div>
              <CardTitle className="text-xl">
                {isFallback ? <Skeleton className="h-8 w-40" /> : user.login}
              </CardTitle>
              <CardDescription>
                {isFallback ? (
                  <Skeleton className="h-5 w-40" />
                ) : (
                  <span>{user.bio || user.name}</span>
                )}
              </CardDescription>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          {isFallback ? (
            <Skeleton className="h-8 w-40" />
          ) : (
            user.location && (
              <Label className="flex gap-4 items-center">
                <LocationIcon />
                Location: {` `}
                {user.location}
              </Label>
            )
          )}
          {isFallback ? (
            <Skeleton className="h-8 w-40" />
          ) : (
            user.location && (
              <Label className="flex gap-4 items-center">
                <ReposIcon />
                Public repos:{` `}
                {user.public_repos}
              </Label>
            )
          )}
          {isFallback ? (
            <Skeleton className="h-8 w-40" />
          ) : (
            user.location && (
              <Label className="flex gap-4 items-center">
                <PersonIcon />
                Following:{` `}
                {user.following}
              </Label>
            )
          )}
          {isFallback ? (
            <Skeleton className="h-8 w-40" />
          ) : (
            user.location && (
              <Label className="flex gap-4 items-center">
                <PersonIcon />
                Followers:{` `}
                {user.followers}
              </Label>
            )
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => push("/")}>Back</Button>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { user } = context.params as { user: any };
  const response = await fetch(`https://api.github.com/users/${user}`);
  const data = await response.json();
  return {
    props: {
      user: data,
    },
    revalidate: 60,
  };
};

const PersonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
};

const ReposIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  );
};

const LocationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
};
