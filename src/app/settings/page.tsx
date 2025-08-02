import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@radix-ui/react-checkbox'
import { AtSignIcon, BellIcon, EyeOffIcon, FrameIcon, MonitorIcon, MoonIcon, SunIcon, TextIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Settings() {
  return (
    <>
    
    
    <div className="flex flex-col w-full min-h-screen">

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 ">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Settings</h1>
        </div>
        <div className="grid  lg:grid-cols-[250px_1fr] items-start gap-6  w-full mx-auto">
          
          <div className="grid gap-6 ">

            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information and settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                    <div className="text-sm text-muted-foreground">
                      This is the name that will be displayed on your profile.
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                    <div className="text-sm text-muted-foreground">
                      This is the email address associated with your account.
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      This is the image that will be displayed on your profile.
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>




            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates.
                      </p>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications for real-time updates.</p>
                    </div>
                    <Switch id="push-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">In-App Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications within the application.</p>
                    </div>
                    <Switch id="in-app-notifications" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>




            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Choose your preferred theme and font size.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark mode.</p>
                  </div>
                  <ModeToggle/>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Font Size</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Adjust the font size to your preference.</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <TextIcon className="h-4 w-4 mr-2" />
                        Medium
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuRadioGroup value="medium">
                        <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Manage your privacy settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">
                        Allow others to view your public profile information.
                      </p>
                    </div>
                    <Switch id="public-profile" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Activity Tracking</p>
                      <p className="text-sm text-muted-foreground">
                        Allow the platform to track your activity for personalized recommendations.
                      </p>
                    </div>
                    <Switch id="activity-tracking" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Data Sharing</p>
                      <p className="text-sm text-muted-foreground">
                        Allow the platform to share your data with third-party services.
                      </p>
                    </div>
                    <Switch id="data-sharing" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Your password" />
                    <div className="text-sm text-muted-foreground">Change your account password.</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="delete-account">Delete Account</Label>
                    <Button variant="secondary" size="sm">
                      Delete Account
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

          </div>
        </div>
      </main>
    </div>
  

    
    
    </>
  )
}
