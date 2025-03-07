import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button, buttonVariants } from './ui/button';
import Logo from './Logo';
import Link from 'next/link';

const routes = [
  {
    href: "", 
    label: "Home", 
    icon: HomeIcon,
  },
  {
    href: "workflows", 
    label: "Workflows", 
    icon: Layers2Icon,
  },
  {
    href: "credentials", 
    label: "Credentials", 
    icon: ShieldCheckIcon,
  },
  {
    href: "billing", 
    label: "Billing", 
    icon: CoinsIcon,
  },
]

function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const activeRoute = routes.find(
    (route) => route.href.length > 0 && pathname.includes(route.href)
  ) || routes[0];


  return (
    <div className='block border-separate bg-background md:hidden'>
      <div className="container flex items-center justify-between px-12">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className='w-[400px] sm:w-[540px] space-y-4 p-2' side={"left"}>
              <Logo />
              <div className='flex flex-col gap-1 '>
                {routes.map((route) => (
                  <Link 
                    key={route.href} 
                    href={route.href} 
                    className={buttonVariants({
                        variant: activeRoute.href === route.href 
                        ? "sidebarActiveItem" 
                        : "sidebarItem",
                      })}
                      onClick={() => setOpen((prev) => !prev)}
                    >
                    <route.icon size={20} />
                    {route.label}
                  </Link>
                ))}
              </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileSidebar