import { Button } from "@/components/ui/button";
import React from "react";

type MotivationStepProps = {
  onNext: () => void;
};

const MotivationStep = ({ onNext }: MotivationStepProps) => {
  return <Button onClick={onNext}>MotivationStep</Button>;
};

export default MotivationStep;
