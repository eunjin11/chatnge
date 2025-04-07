import { Button } from "../ui/button";

type FormButtonProps = {
  isValid: boolean;
  type?: "submit" | "button";
  text: string;
  onClick?: () => void;
};

function FormButton({
  isValid,
  type = "submit",
  text,
  onClick,
}: FormButtonProps) {
  return (
    <Button
      type={type}
      className={`w-full h-[50px] text-white font-bold py-4 rounded-xl ${
        isValid ? "bg-primary" : "bg-[#D7F8F8] cursor-not-allowed"
      }`}
      disabled={!isValid}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default FormButton;
