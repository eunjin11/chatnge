import { Button } from "@/components/ui/button";
import React from "react";

type BirthdateStepProps = {
  onNext: () => void;
};

const BirthDateStep = ({ onNext }: BirthdateStepProps) => {
  return <Button onClick={onNext}>BirthDateStep</Button>;
};

export default BirthDateStep;
