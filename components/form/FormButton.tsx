import { Button } from "../ui/button";

type FormButtonProps = {
  isValid: boolean;
  type?: "submit" | "button";
  text: string;
};

function FormButton({ isValid, type = "submit", text }: FormButtonProps) {
  return (
    <Button
      type={type}
      className={`w-full h-[50px] text-white font-bold py-4 rounded-xl ${
        isValid ? "bg-primary" : "bg-[#D7F8F8] cursor-not-allowed"
      }`}
      disabled={!isValid}
    >
      {text}
    </Button>
  );
}

export default FormButton;
