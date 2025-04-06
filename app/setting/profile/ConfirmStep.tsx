import { Button } from "@/components/ui/button";
import React from "react";

type ConfirmStepProps = {
  onNext: () => void;
};

const ConfirmStep = ({ onNext }: ConfirmStepProps) => {
  return <Button onClick={onNext}>ConfirmStep</Button>;
};

export default ConfirmStep;
