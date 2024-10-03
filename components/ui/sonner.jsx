import { CheckCircle, Info,  XCircle } from "lucide-react"
import { Toaster as Sonner } from "sonner"


const Toaster = ({ ...props }) => {

    return (
        <Sonner
        dir="rtl"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
            icons={{
                success: <CheckCircle className="size-5 text-green" />,
                info: <Info className="size-5 text-blue" />,
                error: <XCircle className="size-5 text-red" />,
            }}
            {...props}
        />
    )
}

export { Toaster }
