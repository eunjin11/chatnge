import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
}: FormInputProps) {
  const { register } = useFormContext();

  return (
    <div className="mb-2">
      {label && (
        <Label htmlFor={name} className="capitalize">
          {label}
        </Label>
      )}
      <Input
        id={name}
        {...register(name)}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="text-sm h-[50px] border-[#D9D9D9] border-[1px] rounded-[14px] focus:border-primary focus-visible:ring-0"
      />
    </div>
  );
}

export default FormInput;
