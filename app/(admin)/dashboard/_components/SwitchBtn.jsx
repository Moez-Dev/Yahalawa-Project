import { Switch } from "@/components/ui/switch"



const SwitchBtn = ({ setValue, value, label, id }) => {
    return (
        <div className="flex items-center space-x-2 my-3">
            <Switch id={id}
                className="data-[state=checked]:bg-green data-[state=unchecked]:bg-gray border-none pl-0.5"
                checked={value}
                onCheckedChange={() => setValue(!value)}
            />
            <label htmlFor={id} className="cursor-pointer">{label}</label>
        </div>
    )
}

export default SwitchBtn
