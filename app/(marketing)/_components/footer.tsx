import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="ghost">
                        <a href="https://some-earth.vercel.app" target="_blank">
                            Made by Samarth
                        </a>
                    </Button>
                    <Button size="sm" variant="ghost">
                        <a
                            href="https://github.com/shrivastavasamarth22/taskify"
                            target="_blank"
                        >
                            Github
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};
